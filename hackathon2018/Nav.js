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
    case 5:
      window.open('EmailMDetailPage.html','_self');
      break;
  }
}

function backToDashboard() {
  window.open('dashboard.html', '_self');
}

function returnToAdvanced() {
  contentList = ['advEspweb', 'advWebsites', 'advCrm', 'advOrders', 'advEmail', 'tasks'];
  var containerList = ['content1', 'content2', 'content3', 'content4', 'content5', 'content6'];
  for (var i = 0; i <= Math.min(contentList.length, containerList.length); i++) {
    if ($('#' + containerList[i]).children('div').length == 0 || $('#' + containerList[i]).children('div')[0].id != contentList[i]) {
        $('#' + containerList[i]).html($('#' + contentList[i] + '-container').html());
    }
  }
  renderEspWebChart();
}

function switchMode() {
  var isAdvanced = false;
  if(contentList[0] === 'espweb'){
    contentList = ['advEspweb', 'advWebsites', 'advCrm', 'advOrders', 'advEmail', 'tasks'];
    isAdvanced = true;
  } else {
    contentList = ['espweb', 'websites', 'crm', 'orders', 'email', 'tasks'];
  }
  
  var containerList = ['content1', 'content2', 'content3', 'content4', 'content5', 'content6'];
  for (var i = 0; i <= Math.min(contentList.length, containerList.length); i++) {
    if ($('#' + containerList[i]).children('div').length == 0 || $('#' + containerList[i]).children('div')[0].id != contentList[i]) {
        $('#' + containerList[i]).html($('#' + contentList[i] + '-container').html());
    }
  }
  renderEspWebChart();
  renderBarChart(isAdvanced);
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

function renderBarChart(isAdvanced) {
  if(isAdvanced){
    var chart = AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "theme": "dark",
      "categoryField": "year",
      "rotate": true,
      "startDuration": 1,
      "categoryAxis": {
          "gridPosition": "start",
          "position": "left"
      },
      "legend":{
        "horizontalGap": 6,
        "verticalGap": 2,
        "useGraphSettings": true,
        "markerSize": 10
      },
      "trendLines": [],
      "graphs": [
          {
              "balloonText": "Profit:[[value]]",
              "fillAlphas": 0.8,
              "id": "AmGraph-1",
              "lineAlpha": 0.2,
              "title": "Profit",
              "type": "column",
              "fillColors": "#ADD981",
              "valueField": "profit"
          },
          {
              "balloonText": "Net Cost:[[value]]",
              "fillAlphas": 0.8,
              "id": "AmGraph-2",
              "lineAlpha": 0.2,
              "title": "Net Cost",
              "type": "column",
              "fillColors": "#81acd9",
              "valueField": "cost"
          }
      ],
      "guides": [],
      "valueAxes": [
          {
              "id": "ValueAxis-1",
              "position": "top",
              "axisAlpha": 0,
              "title": "Orders from this site ( 125724-fli.espwebsite.com ) in the past five years."
          }
      ],
      "allLabels": [],
      "balloon": {},
      "titles": [],
      "dataProvider": [
          {
              "year": 2014,
              "profit": 230.5,
              "cost": 180.1
          },
          {
              "year": 2015,
              "profit": 260.2,
              "cost": 220.8
          },
          {
              "year": 2016,
              "profit": 300.1,
              "cost": 230.9
          },
          {
              "year": 2017,
              "profit": 290.5,
              "cost": 250.1
          },
          {
              "year": 2018,
              "profit": 240.6,
              "cost": 200
          }
      ]
  });
  }
}