var ctx2 = createCanvas("graphDiv2");

var graph2 = new BarGraph(ctx2);
graph2.margin = 2;
graph2.width = 450;
graph2.height = 150;
graph2.xAxisLabelArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
setInterval(function () {
  graph2.update([Math.random() * 20, Math.random() * 20, Math.random() * 20, Math.random() * 20, Math.random() * 20, Math.random() * 20, Math.random() * 20, Math.random() * 20, Math.random() * 20, Math.random() * 20, Math.random() * 20, Math.random() * 20, Math.random() * 20]);
}, 1500);