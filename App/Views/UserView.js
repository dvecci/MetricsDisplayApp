define(function(require) {
	"use strict";
	var Backbone = require('backbone')
		,ChartView = require('Views/ChartView');
	var UserView = Backbone.View.extend({
		initialize: function(model) {
			if (!model) throw "User View expects a User Model";
			this.model = model;
			if (!this.model.get('avatar'))
				this.model.set('avatar', this.model.get('avatar'));
			if (!this.model.get('name')) throw "User View expects a name";
			if (!this.model.get('occupation')) throw "User View expects an occupation";
			
			// Render
			this.render();
			
			// Listen for when the metrics have been loaded and render the chart once the have
			this.listenTo(this.model, 'change:impressions', this.updateImpressions);
			this.listenTo(this.model, 'change:conversions', this.updateConversions);
			this.listenTo(this.model, 'change:revenue', this.updateRevenue);
			this.listenTo(this.model, 'change:conversionData', this.renderChart);
		},
		template: _.template($('#userTemplate').html()),
		
		render: function() {
			this.setElement(this.template({model: this.model}));
			if (this.model.get('conversionData')) {
				this.renderChart();
			}
		},
		
		updateImpressions: function() {
			this.$('.impressions').text(this.model.get('impressions'));
		},
		
		updateConversions: function() {
			this.$('.conversions').text(this.model.get('conversions'));
		},
		
		updateRevenue: function() {
			this.$('.revenue').text('$' + Math.floor(this.model.get('revenue')));
		},
		
		renderChart: function() {
			var chartView = new ChartView(this.model.get('conversionData'));
			this.$('.chartContainer').append(chartView.$el);
			chartView.updateChart();
		}
	});
	
	return UserView;
});