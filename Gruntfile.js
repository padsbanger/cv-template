'use strict';

module.exports = function(grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

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
          open: true
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
        src: ['src/js/**/*.js'],
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