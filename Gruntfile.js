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
          expand: true,
          cwd: 'bower_components/bootstrap/dist/js',
          src: ['bootstrap*.js'],
          dest: 'app/js/vendor/'
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
          cwd: 'bower_components/bootstrap/fonts',
          src: ['**'],
          dest: 'app/fonts/bootstrap/'
        }, {
          nonull: true,
          expand: true,
          cwd: 'bower_components/bootstrap/less',
          src: ['**'],
          dest: 'app/less/bootstrap/'
        }]
      }
    },
    less: {
      bootstrap: {
        options: {
          compress: true,
          modifyVars: {
            'icon-font-path': '"../fonts/bootstrap/"'
          }
        },
        files: {
          'app/css/bootstrap.css': 'app/less/bootstrap/bootstrap.less'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', 'Show Build command', function() {
    grunt.log.writeln('Please use the `grunt build` command');
  });

  grunt.registerTask('first', ['clean:first', 'copy:first']);

  grunt.registerTask('build', ['clean:build', 'less:bootstrap']);

};