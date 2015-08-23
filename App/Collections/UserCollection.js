define(function(require) {
	var Backbone = require('backbone')
		,User = require('Models/UserModel');
		
	var UserCollection = Backbone.Collection.extend({
		model: User
	});
	
	return UserCollection;
});