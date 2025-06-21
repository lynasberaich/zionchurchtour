


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
    maxBounds: [[0, 0], [4488, 2904]], // Corrected bounds
    maxBoundsViscosity: 1.0
});

var bounds2 = [[0, 0], [4488, 2904]];
L.imageOverlay('verticalmap.jpg', bounds2).addTo(map2);
map2.fitBounds(bounds2);

//------------------- LOGIC TO SWITCH BETWEEN MAPS AND DEFAULT TO CORRECT MAP FOR MOBILE/DESKTOP --------------------
function showMap(view) {
    const map1El = document.getElementById('map');
    const map2El = document.getElementById('map2');
    const label = document.getElementById('toggle-label');

    if (view === 'horizontal') {
        map1El.classList.add('visible');
        map2El.classList.remove('visible');
        label.textContent = 'Horizontal View';

        setTimeout(() => {
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


//GET CURRENT TOGGLE
const label = document.getElementById('toggle-label');
const toggle = document.getElementById('mapToggle');
if (window.innerWidth <= 768) {
    toggle.checked = true;
    showMap('vertical');
} else {
    toggle.checked = false;
    showMap('horizontal');
}

// Toggle behavior
toggle.addEventListener('change', () => {
    if (toggle.checked) {
        showMap('vertical');
        label.textContent = 'Vertical View (Best on Mobile)';
    } else {
        showMap('horizontal');
        label.textContent = 'Horizontal View';
    }
});

// Swipe support
toggle.addEventListener('change', () => {
    showMap(toggle.checked ? 'vertical' : 'horizontal');
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    // Prevent toggle if swipe starts inside a map container
    const target = e.target.closest('#map, #map2');
    if (!target) {
        touchStartX = e.changedTouches[0].screenX;
    } else {
        touchStartX = null;
    }
});

document.addEventListener('touchend', e => {
    if (touchStartX === null) return; // Skip if swipe started on the map
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
var listeningIcon = L.icon({
    iconUrl: 'icon.PNG',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64]
});

const images = ['stop1.PNG', 'stop2.PNG', 'stop3.PNG', 'stop4.PNG', 'stop5.PNG', 'stop6.PNG', 'stop7.PNG', 'stop8.PNG', 'stop9.PNG', 'stop10.PNG', 'stop11.PNG', 'stop12.PNG']
const horizontalCoords = [[1635, 4000], [1500, 3700], [1800, 3700], [1640, 3525], [1500, 2750],[1800, 2750], [1500, 2200], [1800, 1000], [1000, 2000], [1000, 2350], [2075, 2050], [2075, 1700]]
const titles = [
    "Beginnings of Zion", "The Early Church in Colonial Times", "The Enlightenment", "The Renovations of the 1840s",
    "The Golden Age of Zion", "The Stained Glass Windows of the Sanctuary", "The Library", "The Adlersaal",
    "Zion's Garden", "Memorials at Zion", "The Quilt Room", "Acknowledgements"
  ];
  
const links = [
    "https://www.youtube.com/embed/VIDEO1", 
    "https://www.youtube.com/embed/VIDEO2", // ... etc
    "https://www.youtube.com/embed/VIDEO12", 
    "https://www.youtube.com/embed/VIDEO2",
    "https://www.youtube.com/embed/VIDEO2", 
    "https://www.youtube.com/embed/VIDEO2",
    "https://www.youtube.com/embed/VIDEO2", 
    "https://www.youtube.com/embed/VIDEO2",
    "https://www.youtube.com/embed/VIDEO2", 
    "https://www.youtube.com/embed/VIDEO2",
    "https://www.youtube.com/embed/VIDEO2", 
    "https://www.youtube.com/embed/VIDEO2",
  ];
  
const verticalCoords = [
    [650, 1630], [1000, 1850], [1000, 1450], [1250, 1630], [1900, 1850], [1900, 1450],
    [2400, 1400], [3600, 1650], [2550, 1000], [1900, 1100], [2650, 2000], [2650, 2200]
  ];


for (let i = 0; i < images.length; i++) {
    const icon = L.icon({
        iconUrl: images[i],
        iconSize: [64, 64],
        iconAnchor: [32, 64],
        popupAnchor: [0, -64]
    });

    const popupHTML = `
        <div style="width:250px">
            <strong>Stop ${i + 1}: ${titles[i]}</strong><br>
            <iframe width="100%" height="150" src="${links[i]}" frameborder="0" allowfullscreen></iframe>
        </div>
    `;

    // Marker on horizontal map
    L.marker(horizontalCoords[i], { icon: icon })
        .addTo(map)
        .bindPopup(popupHTML);

    // Marker on vertical map
    L.marker(verticalCoords[i], { icon: icon })
        .addTo(map2)
        .bindPopup(popupHTML);
}
