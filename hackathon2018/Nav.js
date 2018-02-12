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
  renderOrderBarChart(isAdvanced);
  //renderOrdersSumPieChart(isAdvanced);
  renderFunnelSumChart(isAdvanced);
}

function renderEspWebChart(){
  var chartDiv = "espWebContentPieChart";
  var chart = new CanvasJS.Chart(chartDiv,
  {
      height: 260,
      width:300,
      animationEnabled: true,
      animationDuration: 500,
      theme: "theme2",
      title:{
          text: "Top Searches",
          fontSize:14
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
      "categoryField": "month",
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
              "balloonText": "This Year (2018):[[value]]",
              "fillAlphas": 0.8,
              "id": "AmGraph-1",
              "lineAlpha": 0.2,
              "title": "This Year (2018)",
              "type": "column",
              "fillColors": "#ADD981",
              "valueField": "thisyear"
          },
          {
              "balloonText": "Last Year (2017):[[value]]",
              "fillAlphas": 0.8,
              "id": "AmGraph-2",
              "lineAlpha": 0.2,
              "title": "Last Year (2017)",
              "type": "column",
              "fillColors": "#81acd9",
              "valueField": "lastyear"
          }
      ],
      "guides": [],
      "valueAxes": [
          {
              "id": "ValueAxis-1",
              "position": "top",
              "axisAlpha": 0,
              "title": "Orders from this site ( 125724-fli.espwebsite.com ) in the past five months."
          }
      ],
      "allLabels": [],
      "balloon": {},
      "titles": [],
      "dataProvider": [
        {
          "month": "Jan",
          "thisyear": 230.5,
          "lastyear": 180.1
        },
        {
          "month": "Feb",
          "thisyear": 260.2,
          "lastyear": 220.8
        },
        {
          "month": "Mar",
          "thisyear": 300.1,
          "lastyear": 289.90
        },
        {
          "month": "Apr",
          "thisyear": 290.5,
          "lastyear": 270.1
        },
        {
          "month": "May",
          "thisyear": 335.33,
          "lastyear": 234.78
        }
      ]
  });
  }
}

function renderOrderBarChart(isAdvanced) {
  if(isAdvanced){
    var chart = AmCharts.makeChart("orderChartdiv", {
      "type": "serial",
      "theme": "light",
      "categoryField": "month",
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
              "balloonText": "This Year (2018):[[value]]",
              "fillAlphas": 0.8,
              "id": "AmGraph-1",
              "lineAlpha": 0.2,
              "title": "This Year (2018)",
              "type": "column",
              "fillColors": "#00CC66",
              "valueField": "thisyear"
          },
          {
              "balloonText": "Last Year (2017):[[value]]",
              "fillAlphas": 0.8,
              "id": "AmGraph-2",
              "lineAlpha": 0.2,
              "title": "Last Year (2017)",
              "type": "column",
              "fillColors": "#0093D6",
              "valueField": "lastyear"
          }
      ],
      "guides": [],
      "valueAxes": [
          {
              "id": "ValueAxis-1",
              "position": "top",
              "axisAlpha": 0,
              "title": "Orders from the past five months."
          }
      ],
      "allLabels": [],
      "balloon": {},
      "titles": [],
      "dataProvider": [
        {
          "month": "Jan",
          "thisyear": 230.5,
          "lastyear": 180.1
        },
        {
          "month": "Feb",
          "thisyear": 260.2,
          "lastyear": 220.8
        },
        {
          "month": "Mar",
          "thisyear": 300.1,
          "lastyear": 230.9
        },
        {
          "month": "Apr",
          "thisyear": 290.5,
          "lastyear": 250.1
        },
        {
          "month": "May",
          "thisyear": 240.6,
          "lastyear": 200
        }
      ]
  });
  }
}

function renderOrdersSumPieChart(isAdvanced) {
  if(isAdvanced){
    var chart = AmCharts.makeChart( "orderPieChartSum", {
      "type": "pie",
      "theme": "light",
      "dataProvider": [ {
        "salesRep": "Joe Moyer",
        "profit": 20345
      }, {
        "salesRep": "Sara Parker",
        "profit": 10453
      }, {
        "salesRep": "Fergus MacNeall",
        "profit": 3987
      }, {
        "salesRep": "Steve Gever",
        "profit": 6789
      }, {
        "salesRep": "Cathy Anders",
        "profit": 10856
      }, {
        "salesRep": "Helen Meyers",
        "profit": 3876
      }, {
        "salesRep": "Carl Jones",
        "profit": 2098
      } ],
      "valueField": "profit",
      "titleField": "salesRep",
       "balloon":{
       "fixedPosition":true
      }
    } );
  }
}

function renderFunnelSumChart(isAdvanced)
{
  if(isAdvanced){
    var chart = AmCharts.makeChart( "orderPieChartSum", {
      "type": "funnel",
      "theme": "light",
      "dataProvider": [ {
        "title": "Joe Moyer",
        "value": 20345
      }, {
        "title": "Sara Parker",
        "value": 10856
      }, {
        "title": "Fergus MacNeall",
        "value": 10453
      }, {
        "title": "Steve Gever",
        "value": 6789
      }],
      "titleField": "title",
      "marginRight": 150,
      "marginLeft": 15,
      "labelPosition": "right",
      "funnelAlpha": 0.9,
      "valueField": "value",
      "startX": 0,
      "neckWidth": "40%",
      "startAlpha": 0,
      "outlineThickness": 1,
      "neckHeight": "35%",
      "balloonText": "[[title]]:<b>[[value]]</b>"
    } );
  }
}