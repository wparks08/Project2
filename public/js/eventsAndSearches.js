$(document).ready(function() {
    var newEvent = function(eventName, startTime, endTime) {
        this.name = eventName;
        this.dateTimeStart = startTime;
        this.dateTimeEnd = endTime;
    };
    var newVenue = function(venueName, address, city, state, zip) {
        this.name = venueName;
        this.address1 = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        $(this).address = $("#searchAdd")
            .val()
            .trim();
        $(this).city = $("#locationCity")
            .val()
            .trim();
        $(this).state = $("#locationState")
            .val()
            .trim();
        $(this).zip = $("#zipCode")
            .val()
            .trim();
    };
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
        }).setHTML(popupText);
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
    // createMarker(
    //     "accident.colors-white.svg",
    //     [longitude, latitude],
    //     "#5327c3",
    //     "Popup Text (you are here?)"
    // );
    $("#eventBtn").on("click", function() {
        event.preventDefault();
        var NewPinEvent = new newEvent(
            $("#event")
                .val()
                .trim(),
            $("#startTime")
                .val()
                .trim(),
            $("#endTime")
                .val()
                .trim()
        );
        var NewPinLocation = new newVenue(
            $("#location")
                .val()
                .trim(),
            $("#searchAdd")
                .val()
                .trim(),
            $("#locationCity")
                .val()
                .trim(),
            $("#locationState")
                .val()
                .trim(),
            $("#zipCode")
                .val()
                .trim()
        );
        $.post("api/venue/create", NewPinLocation).done(newVenue => {
            $.post("api/venue/" + newVenue.id + "/addEvent", NewPinEvent).done(
                response => {
                    if (response.status === 200) {
                        alert("Event Created!");
                    }
                }
            );
        });
        event.preventDefault();
        $("input").val("");
    });
    var newSearch = function(name) {
        this.name = name;
    };

    $("#submitSearch").on("click", function() {
        var searchQuery = new newSearch(
            $("#userSearch")
                .val()
                .trim()
        );
        $.get("/api/event/search", searchQuery).done(function(res) {
            $.get("api/venue/search", searchQuery).done(function(response) {
                res.forEach(event => {
                    startDate = new Date(event.dateTimeEnd).toLocaleDateString();
                    startTime = new Date(event.dateTimeStart).toLocaleTimeString();
                    endDate = new Date(event.dateTimeEnd).toLocaleDateString();
                    endTime = new Date(
                        event.dateTimeEnd
                    ).toLocaleTimeString();
                    popupText = `
                    <p><strong>${event.name}</strong></p>
                    <p>${event.venue.name}</p>
                    <p>${startDate} ${startTime} - ${endDate} ${endTime}</p>
                    `;
                    createMarker(
                        "accident.colors-white.svg",
                        [event.venue.longitude, event.venue.latitude],
                        "#5327c3",
                        popupText
                    );
                });
                console.log(res, response);
            });
        });
        $("input").val("");
    });
});
