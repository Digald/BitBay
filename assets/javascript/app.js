// eBay API call

function jsonpcallback(data) {
        console.log(data.Item);

        // Item 1 data
        var urlOne = data.Item[0].ViewItemURLForNaturalSearch;
        var titleOne = data.Item[0].Title;
        var priceOne = data.Item[0].ConvertedCurrentPrice.Value;
          console.log(urlOne);
          console.log(titleOne);
          console.log(priceOne);

      // Item 2 data
        var urlTwo = data.Item[1].ViewItemURLForNaturalSearch;
        var titleTwo = data.Item[1].Title;
        var priceTwo = data.Item[1].ConvertedCurrentPrice.Value;
          console.log(urlTwo);
          console.log(titleTwo);
          console.log(priceTwo);

      // Item 3 data
        var urlThree = data.Item[2].ViewItemURLForNaturalSearch;
        var titleThree = data.Item[2].Title;
        var priceThree = data.Item[2].ConvertedCurrentPrice.Value;
          console.log(urlThree);
          console.log(titleThree);
          console.log(priceThree);
      }

$(document).ready(function() {


	$("#search-button").on("click", function() {

      var queryKeyword = $("#user-input").val().trim();

      var queryURL = "http://open.api.ebay.com/shopping?" +
        "callname=FindItems&" + 
        "appid=GordonBl-BitBay-PRD-85d7504c4-e49e3c45&" + 
        "version=1015&" + 
        "siteid=0&" + 
        "QueryKeywords=" + 
        queryKeyword + 
        "&ItemSort=BestMatch&" + 
        "responseencoding=JSON&" + 
        "MaxEntries=3&" +
        "callbackname=jsonpcallback";

      $.ajax({
          url: queryURL,
          method: "GET",
          dataType: "jsonp"
      });

  });

});
