var require = {
    baseUrl: "App",
    paths: {
		jquery: "../Libraries/jquery",
		backbone: '../Libraries/backbone',
		underscore: '../Libraries/underscore'
    },
	shim: {
		backbone: {
			deps: ['underscore', 'jquery']
		}
	}
};