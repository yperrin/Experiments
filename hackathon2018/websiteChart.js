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
			"axisAlpha": 0
		}
	],
	"allLabels": [],
	"balloon": {},
	"titles": [
		{
			"size": 16,
			"text": "Orders from this site ( 125724-fli.espwebsite.com ) in the past five years."
		}
	],
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