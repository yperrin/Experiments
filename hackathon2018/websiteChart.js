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
			"balloonText": "List Price:[[value]]",
			"fillAlphas": 0.8,
			"id": "AmGraph-2",
			"lineAlpha": 0.2,
			"title": "List Price",
            "type": "column",
            "fillColors": "#81acd9",
			"valueField": "list price"
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
	"titles": [],
	"dataProvider": [
		{
			"year": 2014,
			"profit": 230.5,
			"list price": 180.1
		},
		{
			"year": 2015,
			"profit": 260.2,
			"list price": 220.8
		},
		{
			"year": 2016,
			"profit": 300.1,
			"list price": 230.9
		},
		{
			"year": 2017,
			"profit": 290.5,
			"list price": 250.1
		},
		{
			"year": 2018,
			"profit": 240.6,
			"list price": 200
		}
	]
});