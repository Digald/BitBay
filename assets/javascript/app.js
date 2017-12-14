$(document).ready(function() {
	// your code goes within the doc ready





// v bitcoin api
	$("#searchButton").on("click", function() {
      var bitQueryURL = "https://api.blockchain.info/stats?cors=true";
        

      $.ajax({
          url: bitQueryURL,
          method: "GET"
        }).done(function(json){
        	console.log(json)
        });
    });
// ^ bitcoin api

});











