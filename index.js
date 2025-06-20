var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxBounds: [[0, 0], [3135, 4922.5]],
    maxBoundsViscosity: 1.0
});

var bounds = [[0, 0], [3135, 4922.5]];
L.imageOverlay('map2.jpg', bounds).addTo(map);
map.fitBounds(bounds);

var listeningIcon = L.icon({
    iconUrl: 'icon.PNG',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64]
});

var stopOne = L.icon({
    iconUrl: 'stop1.PNG',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64]
});

var stopOneMarker = L.marker([1635, 4000], { icon: stopOne }).addTo(map);

stopOneMarker.bindPopup(`
<div style="width:250px">
    <strong>Stop 1: Beginnings of Zion</strong><br>
    <iframe width="100%" height="150" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
</div>
`);

var stopTwo = L.icon({
    iconUrl: 'stop2.PNG',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64]
});

var stopTwoMarker = L.marker([1800, 3700], { icon: stopTwo }).addTo(map);

stopTwoMarker.bindPopup(`
<div style="width:250px">
    <strong>Stop 2: The Early Church in Colonial Times</strong><br>
    <iframe width="100%" height="150" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
</div>
`);


var stopThree = L.icon({
    iconUrl: 'stop3.PNG',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64]
});

var stopThreeMarker = L.marker([1500, 3700], { icon: stopThree }).addTo(map);

stopThreeMarker.bindPopup(`
<div style="width:250px">
    <strong>Stop 3: The Enlightenment</strong><br>
    <iframe width="100%" height="150" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
</div>
`);

var stopFour = L.icon({
    iconUrl: 'stop4.PNG',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64]
});

var stopFourMarker = L.marker([1640, 3525], { icon: stopFour }).addTo(map);

stopFourMarker.bindPopup(`
<div style="width:250px">
    <strong>Stop 4: The Rennovations of the 1840s</strong><br>
    <iframe width="100%" height="150" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
</div>
`);


var stopFive = L.icon({
    iconUrl: 'stop5.PNG',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64]
});

var stopFiveMarker = L.marker([1500, 2750], { icon: stopFive }).addTo(map);

stopFiveMarker.bindPopup(`
<div style="width:250px">
    <strong>Stop 5: The Golden Age of Zion</strong><br>
    <iframe width="100%" height="150" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
</div>
`);

var stopSix = L.icon({
    iconUrl: 'stop6.PNG',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64]
});

var stopSixMarker = L.marker([1800, 2750], { icon: stopSix }).addTo(map);

stopFiveMarker.bindPopup(`
<div style="width:250px">
    <strong>Stop 6: The Stained Glass Windows of the Sanctuary</strong><br>
    <iframe width="100%" height="150" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
</div>
`);

var stopSeven = L.icon({
    iconUrl: 'stop7.PNG',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64]
});

var stopSevenMarker = L.marker([1500, 2200], { icon: stopSeven }).addTo(map);

stopSevenMarker.bindPopup(`
<div style="width:250px">
    <strong>Stop 7: The Library</strong><br>
    <iframe width="100%" height="150" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
</div>
`);
