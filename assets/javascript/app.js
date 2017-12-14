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
});