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
			"axisAlpha": 0
		}
	],
	"allLabels": [],
	"balloon": {},
	"titles": [
		{
			"size": 16,
			"text": "Orders from the past five months."
		}
	],
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