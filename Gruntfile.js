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
  				'dist/playground-js-api.js': 'src/js/temp/playground-js-api.js'
          },
          {
  				'dist/playground-ui.js': 'src/js/temp/playground-ui.js'
          }
        ]
  		}
  	},
		uglify:{
      options : {
        beautify : false,
        mangle   : true,
        reserveDOMProperties: true,        
        compress : true
      },
      build: {
        files: [
          {"dist/playground-js-api.min.js":"dist/playground-js-api.js"},
					{"dist/playground-ui.min.js":"dist/playground-ui.js"},
					
        ]
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
	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['includes', 'babel', 'uglify', 'less']);
};
