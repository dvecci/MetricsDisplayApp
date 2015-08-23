define(function(require) {
	"use strict";
	var AppView = require('Views/AppView')
		,UserCollection = require('Collections/UserCollection');
	/*
	* Metrics Display App
	* The Metrics Display App processes a set of users and user data, and will display cards for each
	* user with that user's information and associated campaign data.
	*
	* Accepts 3 parameters:
	* userPath - a string indicating the location of the json file containing users
	* logsPath - a string indication the location of the json file containing log data
	* $domLocation - a jQuery DOM Element where the application display will be appended
	*/
		
	var MetricsDisplayApp = function(userPath, logsPath, $domLocation) {
		var self = this;
			self.userCollection = new UserCollection() // Collection of users loaded from the userPath
			,self.userMetrics = {} // Object to store the data loaded from the logsPath
			,self.loaded = $.Deferred();; // An boolean indicating when the data has been loaded
		
		// Load the Users
		var userLoading = $.getJSON(userPath);
		$.when(userLoading).done(function(users) {
			$(users).each(function() {
				self.userCollection.add(this);
			});
			
			// Create an App View with the loaded collection
			var appView = new AppView({collection: self.userCollection});
			
			// Append the app view to the page container
			$(document).ready(function() {
				$domLocation.append(appView.$el);
			});
		});
		
		// Load the logs
		var logLoading = $.getJSON(logsPath);
		$.when(logLoading).done(function(logs) {
			// Cycle through the logs
			$(logs).each(function() {
				var log = this;
				
				// Grab the user id
				var userId = log.user_id;
				
				// If there isn't a key for the user id in the user metrics object, 
				// create one with an empty metrics object
				if (!self.userMetrics[userId])
					self.userMetrics[userId] = {
						impressions: 0,
						conversions: 0,
						conversionData: null,
						revenue: 0
					};
					
				// Grab the conversion data for this user in the user	
				var userData = self.userMetrics[userId];
				
				// Determine the metric type, and store the data
				switch(log.type) {
					case "impression":
						userData.impressions++;
						break;
					case "conversion":
						// Increment total conversions
						userData.conversions++;
						
						// Cumulate the revenue
						userData.revenue += log.revenue;
						
						// Create a date key, ignoring time of day, for the conversion
						var date = new Date(log.time).setHours(0,0,0,0);
						// If the user has conversion data, and the date already had a conversion, increment it
						if (userData.conversionData && userData.conversionData[date]) {
							userData.conversionData[date]++;
						} else { 
							// If conversion data doesn't exist, create it
							if (!userData.conversionData)
								userData.conversionData = {};
							// Create a new date key with a single conversion
							userData.conversionData[date] = 1;
						};
						break;
					default:
						break;
				}
			});
			
			// Update the Collection
			self.userCollection.each(function(model) {
				var metrics = self.userMetrics[model.id];
				model.set('conversionData', metrics.conversionData);
				model.set('conversions', metrics.conversions);
				model.set('impressions', metrics.impressions);
				model.set('revenue', metrics.revenue);
			});
		});
		
		$.when(userLoading, logLoading).then(function() {
			self.loaded.resolve();
		});
	}
	
	return MetricsDisplayApp;
});
