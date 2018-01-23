var myCanvas = document.getElementById('myCanvas');
myCanvas.width = 300;
myCanvas.height = 300;

var ctx = myCanvas.getContext('2d');

var pieLegend = document.getElementById("pieLegend");

var myPieChart = new Piechart({
  canvas: myCanvas,
  data: myOrders,
  colors: ["#fde23e", "#f16e23", "#57d9ff"],
  legend: pieLegend
});

myPieChart.draw();