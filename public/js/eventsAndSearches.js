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
        $.post(
            "/api/event/search",
            searchQuery
        ).done(
            function (res) {
                $.post(
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
