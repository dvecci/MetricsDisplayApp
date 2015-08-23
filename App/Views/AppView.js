define(function(require) {
	"use strict";
	var Backbone = require('backbone')
		,UserView = require('Views/UserView');
	
	var AppView = Backbone.View.extend({
		initialize: function(options) {
			// Store the users
			if (!options.collection) throw "AppView expects a collection";
			this.collection = options.collection;
			
			this.render();
		},
		
		render: function() {
			var self = this;
			
			// Create a new user view from each model and append it to this view's element
			self.collection.each(function(model) {
				var userView = new UserView(model);
				self.$el.append(userView.$el);
			})
		}
	});
	
	return AppView;
});