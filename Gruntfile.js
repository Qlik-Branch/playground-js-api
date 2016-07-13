module.exports = function(grunt) {
  grunt.initConfig({
    includes: {
      files:{
        src: ['playground-js-api.js', 'playground-ui.js'],
        dest: 'src/js/temp/',
        cwd: 'src/js/'
      }
    },
    babel: {
  		options: {
  			sourceMap: false,
  			presets: ['babel-preset-es2015']
  		},
  		dist: {
  			files: [
          {
  				'src/js/temp/playground-js-api-transpiled.js': 'src/js/temp/playground-js-api.js'
          },
          {
  				'src/js/temp/playground-ui-transpiled.js': 'src/js/temp/playground-ui.js'
          }
        ]
  		}
  	},
    browserify: {
      dist: {
        files: [
          {
            'dist/playground-js-api.js': 'src/js/temp/playground-js-api-transpiled.js'
          },
          {
            'dist/playground-ui.js': 'src/js/temp/playground-ui-transpiled.js'
          }
        ],
        options: {

        }
      }
    },
    less:{
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        files: [
          {
            "dist/playground-ui.css": "src/less/playground-ui.less" // destination file and source file
          }
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.registerTask('default', ['includes', 'babel', 'browserify', 'less']);
};
