module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	sass: {
		dist: {
			files: 
			[
				{
					"expand": false,
					"src": 'App/Styles/MetricsDisplayApp.scss',
					"dest": 'App/Styles/MetricsDisplayApp.css'
				}
			]
		}
	},
	requirejs: {
	  compile: { 
		options: {
		  baseUrl: "App",
		  dir: "Build"
		}
	  }
}
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'requirejs']);

};