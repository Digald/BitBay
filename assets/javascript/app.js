$(document).ready(function() {

	// your code goes within the doc ready
      // all of our code goes within the doc ready

//--------------------Blockchain API GET request-------------
// Chain all ajax request inside of $.when()
// Manipulate all responses inside of .then(function(){});
           //API URL links    
      var bitQueryURL = "https://api.blockchain.info/stats?cors=true";
      var priceGraphURL = "https://api.blockchain.info/charts/market-price?$timespan=30days&format=json&cors=true";
      var hashURL = "https://api.blockchain.info/pools?timespan=10days&cors=true";
      var transactionURL = "https://api.blockchain.info/charts/n-transactions?timespan=30days&cors=true";
      var outputURL = "https://api.blockchain.info/charts/output-volume?timespan=30days&cors=true";
      //API output variables
      var gStats;
      var priceGraph;
      var hashPool;
      var transactionCount;
      var outputValue;
      
      



     $.when(
      //General Stats
      $.ajax({
          url: bitQueryURL,
          method: "GET"
        }).done(function(json1){
          gStats = json1
        }),
      //Price graph
      $.ajax({
          url: priceGraphURL,
          method: "GET"
       }).done(function(json2){
          priceGraph = json2
        }),
      //Hash pools vs hashrate
      $.ajax({
          url: hashURL,
          method: "GET"
        }).done(function(json3){
          hashPool = json3
      }),
      //Transactions count linegraph
      $.ajax({
          url: transactionURL,
          method: "GET"
      }).done(function(json4){
          transactionCount = json4
      }),
      // Output value linegraph
      $.ajax({
          url: outputURL,
          method: "GET"
      }).done(function(json5){
          outputValue = json5
      })
      //Function converts JSON date outputs into a usable format
     ).then(function() {
       var dateRange = [];
       var convert;
       for (var i = 0; i < transactionCount.values.length; i++) {
        convert = moment.unix(transactionCount.values[i].x).format("MMM Do");
        dateRange.push(convert);
       }

     

             




    // how to convert unix time to any format for chart axis
    // var time = moment.unix(1513140162).format("MMM Do");

});
});
