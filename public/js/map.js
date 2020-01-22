function displayMap(longitude, latitude) {
    var map = tt.map({
        key: "i9SnrejXhmJUaG7iAQiT4yQAn6vtd8ML",
        container: "map",
        style: "tomtom://vector/1/basic-main",
        center: new tt.LngLat(longitude, latitude),
        zoom: 15
    });
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());

    //Function to create a marker and attach it to the map
    //This is pretty much boilerplate, taken from:
    //      https://developer.tomtom.com/maps-sdk-web-js/functional-examples#examples,code,custom-markers.html
    //Styles to customize the look are in ./public/styles/map-marker.css
    function createMarker(icon, position, color, popupText) {
        var markerElement = document.createElement("div");
        markerElement.className = "marker";

        var markerContentElement = document.createElement("div");
        markerContentElement.className = "marker-content";
        markerContentElement.style.backgroundColor = color;
        markerElement.appendChild(markerContentElement);

        var iconElement = document.createElement("div");
        iconElement.className = "marker-icon";
        iconElement.style.backgroundImage =
            "url(https://api.tomtom.com/maps-sdk-for-web/5.x/assets/images/" +
            icon +
            ")";
        markerContentElement.appendChild(iconElement);

        var popup = new tt.Popup({
            offset: 30
        }).setText(popupText);
        // add marker to map
        new tt.Marker({
            element: markerElement,
            anchor: "bottom"
        })
            .setLngLat(position)
            .setPopup(popup)
            .addTo(map);
    }

    //call to actually create the marker
    //couldn't find different icons anywhere in the docs, so "accident.colors-white.svg" is just a placeholder for now.
    createMarker(
        "accident.colors-white.svg",
        [longitude, latitude],
        "#5327c3",
        "Popup Text (you are here?)"
    );
}
