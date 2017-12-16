$(document).ready(function() {

  //--------------------Blockchain API GET request-------------
  // Chain all ajax request inside of $.when()
  // Manipulate all responses inside of .then(function(){});
  //API URL links
  var bitQueryURL = 'https://api.blockchain.info/stats?cors=true';
  var priceGraphURL = 'https://api.blockchain.info/charts/market-price?$timespan=30days&format=json&cors=true';
  var hashURL = 'https://api.blockchain.info/pools?timespan=10days&cors=true';
  var transactionURL = 'https://api.blockchain.info/charts/n-transactions?timespan=30days&cors=true';
  var outputURL = 'https://api.blockchain.info/charts/output-volume?timespan=30days&cors=true';
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
      method: 'GET',
    }).done(function(json1) {
      gStats = json1;
    }),
    //Price graph
    $.ajax({
      url: priceGraphURL,
      method: 'GET',
    }).done(function(json2) {
      priceGraph = json2;
    }),
    //Hash pools vs hashrate
    $.ajax({
      url: hashURL,
      method: 'GET',
    }).done(function(json3) {
      hashPool = json3;
    }),
    //Transactions count linegraph
    $.ajax({
      url: transactionURL,
      method: 'GET',
    }).done(function(json4) {
      transactionCount = json4;
    }),
    // Output value linegraph
    $.ajax({
      url: outputURL,
      method: 'GET',
    }).done(function(json5) {
      outputValue = json5;
    })
    //Function converts JSON date outputs into a usable format
  ).then(function() {
    // how to convert unix time to any format for chart axis
    // var time = moment.unix(1513140162).format("MMM Do");
    var dateRange = [];
    var convert;
    for (var i = 0; i < transactionCount.values.length; i++) {
      convert = moment.unix(transactionCount.values[i].x).format('MMM Do');
      dateRange.push(convert);
    }

    // chartJS work goes here
  });
  // Carousel options.
  $(".carousel").carousel({
    interval: false
  })
  // Function containing all of the carousel charts.
  function generateChart() {
    // Global Chartjs values
    Chart.defaults.scale.ticks.beginAtZero = true;
    Chart.defaults.global.tooltips.enabled = true;
    Chart.defaults.global.animation.duration = 2000;
    Chart.defaults.global.animation.easing = 'easeInOutQuart';
    console.log(Chart.defaults);
    // Global plugin for text inside of dought chart
    // copied from chartjs github issues https://github.com/chartjs/Chart.js/issues/78
    Chart.pluginService.register({
      afterUpdate: function(chart) {
        if (chart.config.options.elements.center) {
          var helpers = Chart.helpers;
          var centerConfig = chart.config.options.elements.center;
          var globalConfig = Chart.defaults.global;
          var ctx = chart.chart.ctx;

          var fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
          var fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);

          if (centerConfig.fontSize)
            var fontSize = centerConfig.fontSize;
          // figure out the best font size, if one is not specified
          else {
            ctx.save();
            var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
            var maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 256);
            var maxText = helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);

            do {
              ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
              var textWidth = ctx.measureText(maxText).width;

              // check if it fits, is within configured limits and that we are not simply toggling back and forth
              if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
                fontSize += 1;
              else {
                // reverse last step
                fontSize -= 1;
                break;
              }
            } while (true)
            ctx.restore();
          }

          // save properties
          chart.center = {
            font: helpers.fontString(fontSize, fontStyle, fontFamily),
            fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
          };
        }
      },
      afterDraw: function(chart) {
        if (chart.center) {
          var centerConfig = chart.config.options.elements.center;
          var ctx = chart.chart.ctx;

          ctx.save();
          ctx.font = chart.center.font;
          ctx.fillStyle = chart.center.fillStyle;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
          ctx.fillText(centerConfig.text, centerX, centerY);
          ctx.restore();
        }
      },
    });
    // end of plugin

    // Active doughtnut chart on page load.
    var mainChart = $('#mainChart');
    var myChart = new Chart(mainChart, {
      type: 'pie',
      data: {
        labels: ['OK', 'WARNING', 'CRITICAL'],
        datasets: [{
          text: "1 BTC",
          label: '# of Tomatoes',
          data: [12, 19, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        cutoutPercentage: 80,
        responsive: true,
        maintainAspectRatio: true,
        elements: {
          center: {
            text: "1 BTC = 14000 USD"
          }
        },
        animation: {
          onComplete: function(animation) {

          }
        }
      },
    });
    // Line chart displaying BTC market data.
    var chart1 = $('#lineChart');
    var lineChart = new Chart(chart1, {
      type: 'line',
      data: {
        labels: ['First', 'Second', 'Third', 'Fourth'],
        datasets: [{
          // label: "Numbers Per Month",
          backgroundColor: 'rgba(0, 255, 0, 0.3)',
          borderColor: 'rgba(0, 255, 0, 1)',
          data: [2, 10, 4, 15],
        }, ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        title: {
          display: true,
          text: 'Market Data',
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'USD',
            },
          }, ],
        },
      },
    });
    // Chart displaying different hashpools and hashrate.
    var chart2 = $('#barChart');
    var bar = new Chart(chart2, {
      type: 'bar',
      data: {
        labels: ['Thing1', 'Thing2', 'Thing3'],
        datasets: [{
          label: 'Things to Scale',
          data: [34, 23, 67],
        }, ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        title: {
          display: true,
          text: "Hash Rates of Popular Mining Pools (Higher is better)"
        }
      }
    });

    //Bubble showing transactions per day with bubble size relative to transaction size
    var chart3 = $("#bubbleChart");
    var bubbleChar = new Chart(chart3, {
      type: 'bubble',
      data: {
        labels: ['Time1', 'Time2', 'Time3', 'Time4'],
        datasets: [{
          label: "Relative Transaction Size",
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
        maintainAspectRatio: true,
        title: {
          display: true,
          text: "Amount of Transactions per Day"
        },
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
  }
  generateChart();
  // reset function to show each chart animation on slide
  function resetChart() {
    //Reset chart data
    $('canvas').remove();
    $('.item4').prepend('<canvas id="bubbleChart"></canvas>');
    $('.item3').prepend('<canvas id="barChart"></canvas>');
    $('.item2').prepend('<canvas id="lineChart"></canvas>');
    $('.item1').prepend('<canvas id="mainChart"></canvas>');

    generateChart();
  }
  $('#carouselExampleControls').on('slid.bs.carousel', function() {
    resetChart();
  });

}); // end doc ready function
