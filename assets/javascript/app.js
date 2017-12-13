$(document).ready(function() {
    // all of our code goes within the doc ready

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
    var chart1 = $("#lineChart");
    console.log(Chart.defaults);
    Chart.defaults.scale.ticks.beginAtZero = true;
    var lineChart = new Chart(chart1, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr'],
            datasets: [{
                label: "Numbers Per Month",
                data: [2, 10, 4, 50]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRation: true
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
        	maintainAspectRation: true
        }
    });

    // });

    // how to convert unix time to any format for chart axis
    // var time = moment.unix(1513140162).format("MMM Do");
});