$(document).ready(function () {
    var newEvent = function () {
        $(this).eventName = $("#event").val().trim();
        $(this).startTime = $("#startTime").val().trim();
        $(this).endTime = $("#endTime").val().trim();
    }
    var newVenue = function () {
        $(this).venueName = $("#location").val().trim();
        $(this).venueAddress = $("#searchAdd").val().trim();
        $(this).venueCity = $("#locationCity").val().trim();
        $(this).venueState = $("#locationState").val().trim();
        $(this).venueZip = $("#zipCode").val().trim()
    }
    $("#eventBtn").on("click", function () {
        event.preventDefault();
        var NewPinEvent = new newEvent();
        var NewPinLocation = new newVenue();
        $.ajax({
            method: "POST",
            url: "/api/venue/create",
            data: NewPinLocation
        }).then(newVenue => {
            console.log(newVenue);
        })
        // $.post(
        //     "api/venue/create", NewPinLocation
        // ).done(
        //     newVenue => {
        //         $.post(
        //             "api/" + newVenue.id + "/addEvent", NewPinEvent
        //         ).done(
        //             response => {
        //                 if (response.status === 200) {
        //                     alert("Event Created!");
        //                 }
        //             }
        //         )
        //     }
        // );
        $("input").val("");
    });
    var newSearch = function () {
        $(this).search = $("#userSearch").val().trim();
    };

    $("#submitSearch").on("click", function () {
        var searchQuery = new newSearch();
        $.post("/api/")
    })
});
