module.exports = function(grunt) {
  // 1. All configuration goes here 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          'javascripts/vendor/*.js', // All JS in the libs folder
          'javascripts/items.js',
          'javascripts/item-details.js'
        ],
        dest: 'javascripts/application.js',
      }
    },

    uglify: {
      build: {
        src: 'javascripts/application.js',
        dest: 'javascripts/application.min.js'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'stylesheets/css/application.css': 'stylesheets/scss/application.scss'
        }
      } 
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'stylesheets/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'stylesheets/css/',
        ext: '.min.css'
      }
    },

    watch: {
      scripts: {
        files: ['javascripts/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
            spawn: false,
        },
      },
      css: {
        files: ['stylesheets/scss/*.scss'],
        tasks: ['sass'],
        options: {
            spawn: false,
        }
      }
    }
  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default',  ['concat', 'uglify', 'sass', 'watch']);
};
