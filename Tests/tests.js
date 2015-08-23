define(function(require) {
	"use strict";
	var MetricsDisplayApp = require('MetricsDisplayApp');
	var testApp = new MetricsDisplayApp('testUsers.json', 'testLogs.json', $('#qunit-fixture'));
	
	// Run the tests after the app has finished loading the data
	testApp.loaded.done(function() {
		QUnit.test( "Test App Fields", function( assert ) {
			console.log(testApp);
			assert.ok(testApp.userCollection !== undefined, "Passed!");
			assert.ok(testApp.userMetrics !== undefined, "Passed!");
		});
		
		QUnit.test( "Test Models Loaded", function( assert ) {
			assert.ok(testApp.userCollection.models.length === 2, "Passed!");
		});
		
		QUnit.test( "Test User 1 Data", function( assert ) {
			var userMetrics1 = testApp.userMetrics["1"];
			assert.ok(userMetrics1.conversions === 2, "Passed!");
			assert.ok(userMetrics1.impressions === 1, "Passed!");
			assert.ok(userMetrics1.revenue === 15, "Passed!");
			assert.ok(userMetrics1.conversionData !== undefined, "Passed!");
			assert.ok(userMetrics1.conversionData["1366527600000"] === 1, "Passed!");
			assert.ok(userMetrics1.conversionData["1366441200000"] === 1, "Passed!");
		});
		
		QUnit.test( "Test User 2 Data", function( assert ) {
			var userMetrics1 = testApp.userMetrics["2"];
			assert.ok(userMetrics1.conversions === 1, "Passed!");
			assert.ok(userMetrics1.impressions === 2, "Passed!");
			assert.ok(userMetrics1.revenue === 20, "Passed!");
			assert.ok(userMetrics1.conversionData !== undefined, "Passed!");
			assert.ok(userMetrics1.conversionData["1366527600000"] === 1, "Passed!");
		});
	});
	
});



