// A $( document ).ready() block.
$('document').ready(function () {


    var gifs = ['Chips', 'Hamburgers', 'Candy', 'Pizza', 'Fruit', 'Food', 'Spaghetti', 'Steak'];




    function searchGifs() {
        // setting variables for search term and the API key
        var query = $(this).attr("data-name")
        var APIKey = 'FWlYHZs18PZwmTAZm6vK0M658KuIJcnf';
        var url = "http://api.giphy.com/v1/gifs/search?q=" + query + '&api_key=' + APIKey + "&limit=10";

        // Creates AJAX call for gifs being called
        $.ajax({
            url: url,
            method: "GET"
        })
            .then(function (response) {
                console.log(response)

                var results = response.data;


                // Loops the gifs for limit 10
                for (var i = 0; i < results.length; i++) {

                    // Creates a div to hold the anime
                    var gifDiv = $("<div>");

                    // Make the class for style.css
                    gifDiv.addClass("returnedGifs");

                    // displays rating
                    var rating = results[i].rating;
                    var p = $("<h2>").text("Rating: " + rating);

                    // The Images can still or animate to call the class "gifImage" for click.
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass('gifImage');

                    // Displays the rating
                    gifDiv.prepend(p);

                    // Displays the gif
                    gifDiv.prepend(gifImage);
                    $(".displayResults").prepend(gifDiv);

                }
                
                $(".gifImage").on("click", function () {
                    var state = $(this).attr("data-state");
                    console.log(state);

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });
    }



// Function for displaying gif data
function renderButtons() {

    // Deleting the buttons prior to adding new movies
    $(".buttons").empty();
    // Looping through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("gif btn btn-primary");
        // Adding a data-attribute
        a.attr("data-name", gifs[i]);
        // Providing the initial button text
        a.text(gifs[i]);
        // Adding the button to the buttons div
        $(".buttons").append(a);
    }
};

$("#gifSearch").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var searchedGif = $("#gifTerm").val().trim();
    console.log(searchedGif)

    // The movie from the textbox is then added to our array
    gifs.push(searchedGif);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".gif", searchGifs);


// Calling the renderButtons function to display the intial buttons
renderButtons();

});

