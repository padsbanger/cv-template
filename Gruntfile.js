'use strict';

module.exports = function(grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var modRewrite = require('connect-modrewrite');

  // Define the configuration for all the tasks
  grunt.initConfig({


    // Watches files for changes and runs tasks based on the changed files
    watch: {
      styles: {
        files: ['src/less/**/*.less'],
        tasks: ['less'],
        options: {
          livereload: {
            port: 9000
          }
        },
      },
      html: {
        files: ['*.html', 'views/cv.html'],
        options: {
          livereload: {
            port: 9000
          }
        },
      },
      app: {
        files: ['src/js/**/*.js'],
        tasks: ['concat:app'],
        options: {
          livereload: {
            port: 9000
          }
        },
      }
    },

    // The actual grunt server settings
    connect: {
      server: {
        options: {
          port: 1337,
          hostname: '',
          livereload: 9000,
          open: true,
          middleware: function(connect, options) {
            var middlewares = [];

            middlewares.push(modRewrite(['^[^\\.]*$ /index.html [L]'])); //Matches everything that does not contain a '.' (period)
            options.base.forEach(function(base) {
              middlewares.push(connect.static(base));
            });
            return middlewares;
          }
        }

      }
    },
    less: {
      development: {
        options: {
          compress: true
        },
        files: {
          'build/styles.css': 'src/less/styles.less',
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      app: {
        src: ['src/js//moment.js','src/js/angular.min.js', 'src/js/angular.route.js', 'src/js/angular-translate.min.js','src/js/app.js', 'src/js/cvCtrl.js'],
        dest: 'build/app.js'
      }
    },

    uglify: {
      build: {
        files: {
          'js/build/app.min.js': 'js/build/app.js'
        }
      }
    }
  });

  grunt.registerTask('build', function() {
    grunt.task.run([
      'less',
      'concat:app',
      'uglify:build',
    ]);
  });

  grunt.registerTask('serve', function() {
    grunt.task.run([
      'concat:app',
      'less',
      'connect:server',
      'watch'
    ]);
  });
};