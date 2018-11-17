
var seriesMovies = ["The Sopranos", "The Simpsons", "Boardwalk Empire", "GoodFellas", "Scott Pilgrim vs The World", "Holy Motors", "Lords of Salem", "Deadpool", "Fargo", "Reservoir Dogs", "Machete","Batman","Kill Bill", "Where the buffalo roams", "Fantastic Mr Fox", "Alien","Mid90s"];

console.log(seriesMovies);

function renderButtons() {

  $("#buttonsDump").empty();

  for (var i = 0; i < seriesMovies.length; i++) {

    var a = $("<button>");
    a.addClass("movie");
    a.attr("data-movie", seriesMovies[i]);
    a.text(seriesMovies[i]);
    $("#buttonsDump").append(a);
  }
}

$("#add-movie").on("click", function (event) {
  event.preventDefault();

  var movie = $("#movie-input").val().trim();
  seriesMovies.push(movie);

  renderButtons();

});

renderButtons();

// $(document).on("click", ".checkbox", function() {
$(document).on("click", "button", function () {
  var content = $(this).attr("data-movie");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    content + "&api_key=sFqZx6pCjXAhOImiA2RkFhS85Oa8sk1O&limit=9";

  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function (response) {

    console.log(response);

    $(".gif-display").empty();

    var results = response.data;

    for (var i = 0; i < results.length; i++) {

      var contentDiv = $(".gif-display");
      var p = $("<p>");
      p.text("Rating: " + results[i].rating);

      var contentImage = $("<img>")
      contentImage.attr("src", results[i].images.fixed_height_still.url);
      contentImage.attr("data-still", results[i].images.fixed_height_still.url);
      contentImage.attr("data-animate", results[i].images.fixed_height.url);
      contentImage.attr("data-state", "still");
      contentImage.addClass("gif");

      contentDiv.append(p);
      contentDiv.append(contentImage);
      $(".gif-display").prepend(contentDiv);

    };

  })

});


$(document).on("click", ".gif", function () {

  var state = $(this).attr("data-state");

  if (state == "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  if (state == "animate") {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

});










