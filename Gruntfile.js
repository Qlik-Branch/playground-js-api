module.exports = function(grunt) {
  grunt.initConfig({
    includes: {
      files:{
        src: ['playground-js-api.js'],
        dest: 'src/js/temp/',
        cwd: 'src/js/'
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/playground-js-api.js': 'src/js/temp/playground-js-api.js'
        },
        options: {

        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.registerTask('default', ['includes', 'browserify']);
};
