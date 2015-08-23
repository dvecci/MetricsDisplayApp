define(function(require) {
	"use strict";
	var Backbone = require('backbone');
	
	var UserModel = Backbone.Model.extend({
		defaults: {
			name: null,
			avatar: null,
			id: null,
			occupation: null,
			impressions: 0,
			conversions: 0,
			revenue: 0
		}
	});
	
	return UserModel;
})