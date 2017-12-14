$(document).ready(function() {

	// your code goes within the doc ready
      // all of our code goes within the doc ready

//--------------------Blockchain API GET request-------------
// Chain all ajax request inside of $.when()
// Manipulate all responses inside of .then(function(){});
    // $.when(
      var bitQueryURL = "https://api.blockchain.info/stats?cors=true";
        
      $.ajax({
          url: bitQueryURL,
          method: "GET"
        }).done(function(json){
          console.log(json)
        });
    });

    //  Ajax request 2

    //  Ajax request 3

    // ).then(function() {
    //  Pass json response to variables
    //  use varibles in chart building
    // });

    // how to convert unix time to any format for chart axis
    // var time = moment.unix(1513140162).format("MMM Do");

});

