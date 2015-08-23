define(function(require) {
	var Backbone = require('backbone');
	
	var ChartView = Backbone.View.extend({
		initialize: function(data) {
			this.data = data;
			
			this.render();
		},
		
		template: _.template($('#chartTemplate').html()),
		
		render: function() {
			this.setElement(this.template());
		},
		
		updateChart: function() {
			var self = this;
			
			// Create the canvas element
			var $canvas = $('<canvas id="' + this.cid + '"></canvas>')
				.css({
					height: 90,
					width:175
				});
			this.$('.canvasWrapper').append($canvas);
			var ctx = document.getElementById(self.cid).getContext('2d');
			
			// Create chart data
			var chartData = {
				labels: [],
				datasets: [{
					data: [],
					fillColor: 'transparent',
					strokeColor: '#000'
				}],
			};
			
			// Grab the dates from the passed in data object. Each key is a date
			var dates = Object.keys(self.data).sort();
			// Store a reference to the chartData dataset
			var dataArray = chartData.datasets[0].data;
			
			// We dont' know if there's a record for every day. In order to account for any missing days
			// find the upper and lower bound dates. Increment by 24 hours and check if there's an associated
			// key in the stored log data. If there is, plot it, if not, plot 0.
			
			// Get date bounds
			var lowerDate = new Date(parseInt(dates[0]));
			var upperDate = new Date(parseInt(dates[dates.length - 1]));
			
			// Add the upper and lower bounds to the chart text and append it
			var chartText = 'Conversions ' 
				+ lowerDate.getMonth() 
				+ '/' 
				+ lowerDate.getDay()
				+ ' - '
				+ upperDate.getMonth()
				+ '/'
				+ upperDate.getDay();
			this.$('.chartText').append(chartText);
			
			// The first value will be the first date recorded
			dataArray.push(self.data[dates[0]]);
			
			// Increment 24 hours for the duration of the time period and check if there's
			// a value. If so, plot it
			var timeCounter = lowerDate.valueOf();
			var numberOfDaysRecorded = (upperDate - lowerDate)/(1000*60*60*24) + 1;
			for (var i=1; i<numberOfDaysRecorded; i++) {
				chartData.labels.push("");
				timeCounter += 1000*60*60*24;
				if (parseInt(dates[i]) === timeCounter) {
					dataArray.push(self.data[dates[i]]);
				} else {
					dataArray.push(0);
				}
			}
			
			var options = {
				animation: false,
				bezierCurve: false,
				pointDot: false,
				scaleGridLineColor: 'rgba(0,0,0,0)',
				scaleLineColor: 'rgba(0,0,0,0)',
				scaleShowGridLines: false,
				scaleShowLabels: false
			}
			require(['../../Libraries/chart'], function(Chart) {
				new Chart(ctx).Line(chartData, options);
				var Chartjs = Chart.noConflict();
			});
			
		}
	});
	
	return ChartView;
});