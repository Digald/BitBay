$(document).ready(function() {

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
    }).done(function(json1) {
      gStats = json1
    }),
    //Price graph
    $.ajax({
      url: priceGraphURL,
      method: "GET"
    }).done(function(json2) {
      priceGraph = json2
    }),
    //Hash pools vs hashrate
    $.ajax({
      url: hashURL,
      method: "GET"
    }).done(function(json3) {
      hashPool = json3
    }),
    //Transactions count linegraph
    $.ajax({
      url: transactionURL,
      method: "GET"
    }).done(function(json4) {
      transactionCount = json4
    }),
    // Output value linegraph
    $.ajax({
      url: outputURL,
      method: "GET"
    }).done(function(json5) {
      outputValue = json5
    })
    //Function converts JSON date outputs into a usable format
  ).then(function() {
    // how to convert unix time to any format for chart axis
    // var time = moment.unix(1513140162).format("MMM Do");
    var dateRange = [];
    var convert;
    for (var i = 0; i < transactionCount.values.length; i++) {
      convert = moment.unix(transactionCount.values[i].x).format("MMM Do");
      dateRange.push(convert);
    }

    // chartJS work goes here
  });

  // Chart.js work
  Chart.defaults.scale.ticks.beginAtZero = true;
  var chart1 = $("#lineChart");
  console.log(Chart.defaults);
  var lineChart = new Chart(chart1, {
    type: 'line',
    data: {
      labels: ['First', 'Second', 'Third', 'Fourth'],
      datasets: [{
        label: "Numbers Per Month",
        backgroundColor: "rgba(0, 255, 0, 0.3)",
        borderColor: "rgba(0, 255, 0, 1)",
        data: [2, 10, 4, 15]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRation: true,
      title: {
        display: true,
        text: "Market Data"
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'USD'
          }
        }],
      }
    }
  });

  var chart2 = $("#polarChart");
  var polarArea = new Chart(chart2, {
    type: 'polarArea',
    data: {
      labels: ['Thing1', 'Thing2', 'Thing3'],
      datasets: [{
        label: "Things to Scale",
        data: [34, 23, 67]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRation: true,
      title: {
        display: true,
        text: "Hash Rates of Popular Mining Pools (Higher is better)"
      }
    }
  });

  var chart3 = $("#bubbleChart");
  var bubbleChar = new Chart(chart3, {
    type: 'bubble',
    data: {
      labels: ['Time1', 'Time2', 'Time3', 'Time4'],
      datasets: [{
        labels: "Time vs Trans/day vs Trans Amt",
        data: [{
            x: 3,
            y: 4,
            r: 4
          },
          {
            x: 24,
            y: 15,
            r: 45
          },
          {
            x: 43,
            y: 34,
            r: 23
          }
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRation: true,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: '# of Transactions per Day'
          }
        }]
      }
    }
  });

}); // end doc ready function
