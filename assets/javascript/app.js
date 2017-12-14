$(document).ready(function() {

	$("#searchButton").on("click", function() {

		var queryKeyword = $("#userInput").val().trim();

      var queryURL = "http://open.api.ebay.com/shopping?" +
        "callname=FindItems" + "&appid=GordonBl-BitBay-PRD-85d7504c4-e49e3c45" + "&version=1015" + "&siteid=0" + "&QueryKeywords=" + queryKeyword + "&ItemSort=BestMatch" +"&responseencoding=JSON";
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
        	console.log(response);
          // var results = response.data;

      //     for (var i = 0; i < results.length; i++) {
      //       var gifDiv = $("<div class='item'>");

      //       var rating = results[i].rating;

      //       var p = $("<p>").text("Rating: " + rating);

      //       var bandImage = $("<img>");
      //       bandImage.attr("src", results[i].images.fixed_height.url);

      //       gifDiv.prepend(p);
      //       gifDiv.prepend(bandImage);

      //       $("#result1").prepend(gifDiv);
      //     }

      });

    });

//--------------------Blockchain API GET request-------------
// Chain all ajax request inside of $.when()
// Manipulate all responses inside of .then(function(){});
    // $.when(
    // 	Ajax request 1

    // 	Ajax request 2

    // 	Ajax request 3

    // ).then(function() {
    // 	Pass json response to variables
    // 	use varibles in chart building
    // });

    // how to convert unix time to any format for chart axis
    // var time = moment.unix(1513140162).format("MMM Do");
});