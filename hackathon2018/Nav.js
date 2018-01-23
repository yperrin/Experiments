var contentList = ['espweb', 'websites', 'crm', 'orders', 'email', 'tasks']

function openDetailPage(page) {
  switch(page){
    case 0:
      window.open('DetailPage.html','_self');
      break;
    case 1:
      window.open('ToDoDetailPage.html','_self');
      break;
    case 2: 
      window.open('OrdersDetailPage.html','_self');
      break;
    case 3:
      window.open('WebsitesDetailPage.html','_self');
      break;
    case 4:
      window.open('ESPDetailPage.html','_self');
      break;
  }
}

function backToDashboard() {
  window.open('dashboard.html', '_self');
}

function switchMode() {
  if(contentList[0] === 'espweb'){
    contentList = ['advEspweb', 'advWebsites', 'advCrm', 'advOrders', 'advEmail', 'advTasks'];
  } else {
    contentList = ['espweb', 'websites', 'crm', 'orders', 'email', 'tasks'];
  }
  
  var containerList = ['content1', 'content2', 'content3', 'content4', 'content5', 'content6'];
  for (var i = 0; i <= Math.min(contentList.length, containerList.length); i++) {
    $('#' + containerList[i]).html($('#' + contentList[i] + '-container').html());
  }
  renderEspWebChart();
}

function renderEspWebChart(){
  var chartDiv = "espWebContentPieChart";
  var chart = new CanvasJS.Chart(chartDiv,
  {
      height: 225,
      width:300,
      animationEnabled: true,
      animationDuration: 500,
      theme: "theme2",
      title:{
          text: "Top Searches",
          fontSize:18
      },		
      data: [
      {       
          type: "pie",
          showInLegend: false,
          toolTipContent: "{indexLabel} - #percent %",
          yValueFormatString: "#,##0,,.##",
          legendText: "{indexLabel}",
          dataPoints: [
              {  y: 30, indexLabel: "Apparel" },
              {  y: 26, indexLabel: "Pens" },
              {  y: 24, indexLabel: "Bags" },
              {  y: 21, indexLabel: "Lanyards"},
              {  y: 13, indexLabel: "Mugs" },
              {  y: 8, indexLabel: "Water Bottles"},
              {  y: 5, indexLabel: "Headwear"},
              {  y: 3, indexLabel: "Patches"},
              {  y: 2, indexLabel: "Banners"},
              {  y: 1, indexLabel: "Sunglasses"}
              
          ]
      }
      ]
  });
chart.render();
}