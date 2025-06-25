//---------------------CREATING BOTH  VERTICAL AND HORIZONTAL MAPS------------------------
//HORIZONTAL IS MAP
var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxBounds: [[0, 0], [3135, 4922.5]],
    maxBoundsViscosity: 1.0
});

var bounds = [[0, 0], [3135, 4922.5]];
L.imageOverlay('map3.JPG', bounds).addTo(map);
map.fitBounds(bounds);

//VERTICAL IS MAP2
var map2 = L.map('map2', {
    crs: L.CRS.Simple,
    minZoom: -3.5,
    maxBounds: [[0, 0], [4488, 2904]], 
    maxBoundsViscosity: 1.0
});

var bounds2 = [[0, 0], [4488, 2904]];
L.imageOverlay('verticalmap.jpg', bounds2).addTo(map2);
map2.fitBounds(bounds2);

//------------------- LOGIC TO SWITCH BETWEEN MAPS AND DEFAULT TO CORRECT MAP FOR MOBILE/DESKTOP --------------------
//vertical looks better on mobile
//horizontal looks better on laptop

//function to switch between maps
function showMap(view) {
    const map1El = document.getElementById('map');
    const map2El = document.getElementById('map2');
    const label = document.getElementById('toggle-label');

    if (view === 'horizontal') {
        map1El.classList.add('visible');
        map2El.classList.remove('visible');
        label.textContent = 'Horizontal View';

        setTimeout(() => {
            //in order to render the map correctly
            map.invalidateSize();
            map.fitBounds([[0, 0], [3135, 4922.5]]);
        }, 100);
    } else {
        map2El.classList.add('visible');
        map1El.classList.remove('visible');
        label.textContent = 'Vertical View (Best on Mobile)';

        setTimeout(() => {
            map2.invalidateSize();
            map2.fitBounds([[0, 0], [4488, 2904]]);
        }, 100);
    }
}


//GET CURRENT VIEW BASED ON SCREEN SIZE
const label = document.getElementById('toggle-label');
const toggle = document.getElementById('mapToggle');
if (window.innerWidth <= 768) {
    toggle.checked = true;
    //set it to the correct map
    showMap('vertical');
} else {
    toggle.checked = false;
    //set it to the correct map
    showMap('horizontal');
}

// mode toggle functionality
toggle.addEventListener('change', () => {
    if (toggle.checked) {
        showMap('vertical');
        label.textContent = 'Vertical View (Best on Mobile)';
    } else {
        showMap('horizontal');
        label.textContent = 'Horizontal View';
    }
});

// swipe support
toggle.addEventListener('change', () => {
    showMap(toggle.checked ? 'vertical' : 'horizontal');
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    // prevent toggle if swipe starts inside a map container
    const target = e.target.closest('#map, #map2');
    if (!target) {
        touchStartX = e.changedTouches[0].screenX;
    } else {
        touchStartX = null;
    }
});

document.addEventListener('touchend', e => {
    if (touchStartX === null) return; // skip if swipe started on the map
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});


function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
        toggle.checked = true;
        showMap('vertical');
    } else if (touchEndX > touchStartX + threshold) {
        toggle.checked = false;
        showMap('horizontal');
    }
}





//----------------- CREATING ALL ICONS AND LINKING THEM TO LISTS --------------------


function toEmbedURL(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
    return match ? 'https://www.youtube.com/embed/${match[1]}' : url;
  }
  
  const allMarkers = [];
  const allTags = new Set();
  const tagToStopsMap = new Map();
  const selectedTags = new Set();
  
  fetch('https://api.sheetbest.com/sheets/b81f61a8-6e85-4373-a14f-fbf42a25503c')
    .then(response => response.json())
    .then(data => {
      data.forEach(row => {
        const stopNumber = row.Stop.trim();
  
        const defaultIcon = L.icon({
          iconUrl: row.Image,
          iconSize: [64, 64],
          iconAnchor: [32, 64],
          popupAnchor: [0, -64]
        });
  
        const highlightIcon = L.icon({
          iconUrl: `highlightStop${stopNumber}.PNG`, // highlightStop1.png, highlightStop2.png, etc.
          iconSize: [64, 64],
          iconAnchor: [32, 64],
          popupAnchor: [0, -64]
        });
  
        const embedURL = toEmbedURL(row.YouTubeLink);
        const tags = row.Tags?.split(',').map(tag => tag.trim()) || ['Other'];
        tags.forEach(tag => allTags.add(tag));
  
        const tagHTML = tags.map(tag => '<span class="tag-label">${tag}</span>').join('');
        const popupHTML = `
          <div style="width:250px">
            <strong>Stop ${stopNumber}: ${row.Title}</strong><br>
            <iframe width="100%" height="150" src="${embedURL}" frameborder="0" allowfullscreen></iframe>
            <div style="margin-top:8px;">${tagHTML}</div>
          </div>
        `;
  
        const marker1 = L.marker([row.HorizontalX, row.HorizontalY], { icon: defaultIcon }).bindPopup(popupHTML).addTo(map);
        const marker2 = L.marker([row.VerticalX, row.VerticalY], { icon: defaultIcon }).bindPopup(popupHTML).addTo(map2);
  
        allMarkers.push({ marker1, marker2, tags, defaultIcon, highlightIcon });
  
        tags.forEach(tag => {
          if (!tagToStopsMap.has(tag)) tagToStopsMap.set(tag, []);
          tagToStopsMap.get(tag).push({ marker1, marker2 });
        });
      });
  
      initTagSearch();
    });
  
  function initTagSearch() {
    const searchInput = document.getElementById('tag-search');
    const suggestions = document.getElementById('tag-suggestions');
    const resetBtn = document.getElementById('reset-tags-btn');
  
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      suggestions.innerHTML = '';
      if (!query) return;
  
      const matchingTags = Array.from(allTags).filter(tag =>
        tag.toLowerCase().includes(query)
      );
  
      matchingTags.forEach(tag => {
        const btn = document.createElement('div');
        btn.className = 'suggestion-tag';
        btn.textContent = tag;
        btn.addEventListener('click', () => {
          if (!selectedTags.has(tag)) {
            selectedTags.add(tag);
            updateSelectedTagsUI();
            applyTagHighlights();
            searchInput.value = '';
            suggestions.innerHTML = '';
          }
        });
        suggestions.appendChild(btn);
      });
    });
  
    resetBtn.addEventListener('click', () => {
      selectedTags.clear();
      updateSelectedTagsUI();
      applyTagHighlights();
    });
  }
  
  function updateSelectedTagsUI() {
    const container = document.getElementById('selected-tags-container');
    container.innerHTML = '';
    selectedTags.forEach(tag => {
      const tagEl = document.createElement('div');
      tagEl.className = 'selected-tag';
      tagEl.textContent = tag;
      tagEl.addEventListener('click', () => {
        selectedTags.delete(tag);
        updateSelectedTagsUI();
        applyTagHighlights();
      });
      container.appendChild(tagEl);
    });
  }
  
  function applyTagHighlights() {
    allMarkers.forEach(marker => {
      const isMatch = [...selectedTags].some(tag => marker.tags.includes(tag));
      const icon = (selectedTags.size > 0 && isMatch) ? marker.highlightIcon : marker.defaultIcon;
      marker.marker1.setIcon(icon);
      marker.marker2.setIcon(icon);
    });
  }