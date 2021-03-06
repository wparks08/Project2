function displayMap() {
    return new Promise((resolve, reject) => {
        let Geolocation = window.navigator.geolocation;
        Geolocation.getCurrentPosition(function(position) {
            map = tt.map({
                key: "i9SnrejXhmJUaG7iAQiT4yQAn6vtd8ML",
                container: "map",
                style: "tomtom://vector/1/basic-main",
                center: new tt.LngLat(
                    position.coords.longitude,
                    position.coords.latitude
                ),
                zoom: 15
            });
            map.addControl(new tt.FullscreenControl());
            map.addControl(new tt.NavigationControl());

            console.log(map);

            resolve(map);
        });
    })
    
}
