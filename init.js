define(function(require) {
	var MetricsDisplayApp = require('MetricsDisplayApp');
	
	// Create a new MetricsDisplayApp
	var app = new MetricsDisplayApp('./Data/users.json', './Data/logs.json', $('#pageContainer'));
	
});