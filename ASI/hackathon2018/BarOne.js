var ctx = createCanvas("graphDiv1");

var graph = new BarGraph(ctx);
graph.maxValue = 30;
graph.margin = 2;
graph.colors = ["#49a0d8", "#d353a0", "#ffc527", "#df4c27"];
graph.xAxisLabelArr = ["North", "East", "West", "South"];
setInterval(function () {
  graph.update([Math.random() * 30, Math.random() * 30, Math.random() * 30, Math.random() * 30]);
}, 1000);