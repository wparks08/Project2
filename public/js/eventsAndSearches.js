$(document).ready(function () {
    var newEvent = function () {
        $(this).eventName = $("#event").val().trim();
        $(this).startTime = $("#startTime").val();
        $(this).endTime = $("#endTime").val();
    }
    var newVenue = function () {
        $(this).venueName = $("#location").val().trim();
        $(this).address = $("#searchAdd").val().trim();
        $(this).city = $("#locationCity").val().trim();
        $(this).state = $("#locationState").val().trim();
        $(this).zip = $("#zipCode").val().trim()
    }
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
    // createMarker(
    //     "accident.colors-white.svg",
    //     [longitude, latitude],
    //     "#5327c3",
    //     "Popup Text (you are here?)"
    // );
    $("#eventBtn").on("click", function () {
        var NewPinEvent = new newEvent();
        var NewPinLocation = new newVenue();
        $.post(
            "api/venue/create", NewPinLocation
        ).done(
            newVenue => {
                $.post(
                    "api/venue/" + newVenue.id + "/addEvent", NewPinEvent
                ).done(
                    response => {
                        if (response.status === 200) {
                            alert("Event Created!");
                        }
                    }
                )
            }
        );
        event.preventDefault();
        $("input").val("");
    });
    var newSearch = function () {
        $(this).name = $("#userSearch").val().trim();
    };

    $("#submitSearch").on("click", function () {
        var searchQuery = new newSearch();
        $.get(
            "/api/event/search",
            searchQuery
        ).done(
            function (res) {
                $.get(
                    "api/venue/search",
                    searchQuery
                ).done(
                    function (response) {
                        console.log(res, response)
                    }
                )
            }
        );
        $("input").val("");
    })
});
