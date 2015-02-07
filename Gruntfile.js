module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      options: {
        force: true,
        'no-wrote': true
      },
      first: ['app/css', 'app/less/bootstrap', 'app/fonts/bootstrap', 'app/js/vendor', 'app/js/pi.js'],
      build: ['app/css', 'app/js/pi.js']
    },
    copy: {
      first: {
        files: [{
          nonull: true,
          src: 'bower_components/socket.io-client/socket.io.js',
          dest: 'app/js/vendor/socket.io.js'
        }, {
          nonull: true,
          src: 'node_modules/binaryjs/dist/binary.js',
          dest: 'app/js/vendor/binary.js'
        }, {
          nonull: true,
          expand: true,
          cwd: 'bower_components/jquery/dist',
          src: ['**'],
          dest: 'app/js/vendor/'
        }, {
          nonull: true,
          expand: true,
          cwd: 'bower_components/underscore',
          src: ['underscore*'],
          dest: 'app/js/vendor/'
        }, {
          nonull: true,
          expand: true,
          cwd: 'bower_components/bootstrap/dist/js',
          src: ['bootstrap*.js'],
          dest: 'app/js/vendor/'
        }, {
          nonull: true,
          expand: true,
          cwd: 'bower_components/bootstrap/fonts',
          src: ['**'],
          dest: 'app/fonts/bootstrap/'
        }, {
          nonull: true,
          expand: true,
          cwd: 'bower_components/bootstrap/less',
          src: ['**'],
          dest: 'app/less/bootstrap/'
        }, {
          nonull: true,
          expand: true,
          cwd: 'bower_components/angular',
          src: ['angular*'],
          dest: 'app/js/vendor'
        }, {
          nonull: true,
          expand: true,
          cwd: 'bower_components/angular-animate',
          src: ['angular-animate*'],
          dest: 'app/js/vendor'
        }, {
          nonull: true,
          expand: true,
          cwd: 'bower_components/angular-mocks',
          src: ['angular-mocks*'],
          dest: 'app/js/vendor'
        }, {
          nonull: true,
          expand: true,
          cwd: 'bower_components/angular-resource',
          src: ['angular-resource*'],
          dest: 'app/js/vendor'
        }, {
          nonull: true,
          expand: true,
          cwd: 'bower_components/angular-route',
          src: ['angular-route*'],
          dest: 'app/js/vendor'
        }, {
          nonull: true,
          expand: true,
          cwd: 'bower_components/angular-sanitize',
          src: ['angular-sanitize*'],
          dest: 'app/js/vendor'
        }, {
          nonull: true,
          expand: true,
          cwd: 'bower_components/requirejs',
          src: ['require*'],
          dest: 'app/js/vendor'
        }, {
          nonull: true,
          expand: true,
          cwd: 'bower_components/almond',
          src: ['almond*'],
          dest: 'app/js/vendor'
        }]
      }
    },
    less: {
      bootstrap: {
        options: {
          compress: true,
          modifyVars: {
            'icon-font-path': '"../fonts/bootstrap/"',
            'border-radius-base': '0',
            'border-radius-large': '0',
            'border-radius-small': '0',
            'font-family-sans-serif': '"Open Sans", sans-serif'
          }
        },
        files: {
          'app/css/bootstrap.css': 'app/less/bootstrap/bootstrap.less'
        }
      },
      piQuadApp: {
        options: {
          compress: true,
        },
        files: {
          'app/css/pi-style.css': 'app/less/styles/pi-style.less'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      piQuadApp: ['./app/js/**/*.js']
    },
    requirejs: {
      piQuadApp: {
        options: {
          baseUrl: './app/js',
          mainConfigFile: 'app/js/rjsConfig.js',
          deps: ['main', 'app', 'routes'],
          out: 'app/js/pi.js',
          optimize: 'uglify2',
          name: './vendor/almond',
          preserveLicenseComments: false
        }
      }
    },
    karma: {
      piQuadApp: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    watch: {
      piQuadAppJs: {
        files: ['./app/js/**/*.js'],
        tasks: ['build'],
        options: {
          spawn: false
        }
      },
      piQuadAppCss: {
        files: ['./app/less/**/*.less'],
        tasks: ['build'],
        options: {
          spawn: false
        }
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s).
  grunt.registerTask('default', 'Show Build command', function() {
    grunt.log.writeln('Please use the `grunt first` command to begin' ['grey']);
    grunt.log.writeln('Use the `grunt build` command subsequently' ['grey']);
  });

  grunt.registerTask('first', ['clean:first', 'copy:first']);

  grunt.registerTask('build', ['clean:build', 'less:bootstrap', 'less:piQuadApp', 'jshint:piQuadApp', 'requirejs:piQuadApp', 'watch']);

  grunt.registerTask('unit', ['karma:piQuadApp']);

};