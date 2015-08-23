var require = {
    baseUrl: "../App",
    paths: {
		jquery: "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min",
		backbone: '../Libraries/backbone',
		underscore: '../Libraries/underscore'
    },
	shim: {
		backbone: {
			deps: ['underscore', 'jquery']
		}
	}
};