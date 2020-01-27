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

    console.log(map);

    return map
}
