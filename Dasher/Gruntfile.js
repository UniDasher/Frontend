module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		shell: {
			'bower-install': {
				options: {
					stdout: true
				},
				command: 'bower install'
			}
		},

		env : {
			dev : {
				NODE_ENV : 'dev'
			},
			prod : {
				NODE_ENV : 'prod'
			}
		},

		//sass: {
		//	options: {
		//		sourcemap: true
		//	},
		//	files: {
		//		expand: true,
		//		cwd: 'app/css/scss',
		//		src: ['**/*.scss'],
		//		dest: 'app/css/compiled/',
		//		ext: '.css'
		//	}
		//},

		less: {
			build: {
				options: {
					dumpLineNumbers: 'comments'
				},
				files: {
					"app/css/style.css" : "app/less/style.less"
				}
			}
		},

		connect: {
			app: {
				options: {
					hostname: '*',
					port: 3000,
					base: 'app/'
				}
			}
		}
	});

	grunt.registerTask('compile:config', function () {
		if (!process.env.NODE_ENV) {
			console.error('NODE_ENV="%s" is falsy, exiting.', process.env.NODE_ENV);
			process.exit(1);
		}

		var config = require('config');
		var configSources = config.getConfigSources().forEach(function (item) {
			console.log('Loading ' + item.name);
		});

		var configServiceTpl = grunt.file.read('config/config.tpl');
		var configService = grunt.template.process(configServiceTpl, {
			data: {
				config: JSON.stringify(config, null, '  ').split('\n').join('\n    ')
			}
		});

		grunt.file.write('app/scripts/providers/config.js', configService);
	});

	grunt.registerTask('watch:sass+less+app', function () {
		grunt.config('watch', {
			//sass: {
			//	files: 'app/css/**/*.scss',
			//	tasks: ['sass']
			//},
			less: {
				files: 'app/less/**/*.less',
				tasks: ['less']
			},
			app: {
				files: [
					'app/**/*',
					'!app/**/*.map',
					'!app/bower_components/**',
					'!app/css/lib/**',
					'!app/**/*.scss'
				],
				options: {
					livereload: true
				}
			}
		});

		grunt.task.run('watch');
	});

	grunt.registerTask('default', [
		'shell:bower-install',
		'env:dev',
		'compile:config',
		//'sass',
		'less',
		'connect:app',
		'watch:sass+less+app'
	]);
};
