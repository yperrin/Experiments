var myCanvas2 = document.getElementById('myCanvas2');
myCanvas2.width = 300;
myCanvas2.height = 300;

var ctx = myCanvas2.getContext('2d');

var dougnutLegend = document.getElementById("dougnutLegend");

var myDougnutChart = new Piechart(
    {
      canvas: myCanvas2,
      data: myOrders,
      colors: ["#fde23e", "#f16e23", "#57d9ff"],
      doughnutHoleSize: 0.5,
      legend: dougnutLegend
    }
);
myDougnutChart.draw();