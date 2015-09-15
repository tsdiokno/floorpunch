module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: ['*.scss'],
          dest: 'dist/css',
          ext: '.css'
        }]
      }
    },


    postcss: {
        options: {
            map: true,
            processors: [
                require('autoprefixer')({
                    browsers: ['last 2 versions']
                })
            ]
        },
        dist: {
            src: 'src/css/*.css'
        }
    },


    imagemin: {                          // Task
      dynamic: {
        options: {                       // Target options
          optimizationLevel: 3,
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/',                   // Src matches are relative to this path
          src: ['img/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'dist/img'                  // Destination path prefix
        }]
      }
    },

    watch: {
      files: ['<%= sass.files %>'],
      tasks: ['sass', 'postcss']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['sass', 'postcss', 'imagemin']);

};
