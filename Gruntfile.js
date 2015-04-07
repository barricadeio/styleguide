'use strict';

module.exports = function(grunt) {

  var appConfig = {
    app: require('./bower.json').appPath || 'client',
    dist: 'dist'
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'client/assets/css/style.css' : 'client/assets/scss/style.scss'
        }
      }
    },

    watch: {
      injectCss: {
        files: [
          '/assets/**/*.css'
        ],
        tasks: ['injector:css']
      },
      injectSass: {
        files: [
          'assets/scss/*.{scss,sass}'],
        tasks: ['injector:sass']
      },
      sass: {
        files: [
          '**/*.sass',
          '**/*.scss'
        ],
        tasks: ['sass'],
        options: {
          livereload: true,
        }
      },
    },

    livereload: {
      files: [
        'assets/css/*.css',
        'views/*.html',
        'assets/img/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
      ],
      options: {
        livereload: true
      }
    },

    html2js: {
      options: {
        // custom options, see below
      },
      main: {
        src: ['client/viewsgrunt /*.html'],
        dest: 'tmp/templates.js'
      },
    },

    injector: {
      options: {

      },
      // Inject component scss into app.scss
      sass: {
        options: {
          transform: function (filePath) {
            filePath = filePath.replace('/client/app/', '');
            filePath = filePath.replace('/client/components/', '');
            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector',
          endtag: '// endinjector'
        },
        files: {
          'client/assets/scss/style.scss': [
            'assets/**/*.{scss,sass}'
          ]
        }
      },
      // Inject component css into index.html
      css: {
        options: {
          transform: function (filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          'client/index.html': [
           'assets/**/*.css'
          ]
        }
      }
    },

    express: {
      options: {
        port: process.env.PORT || 3000
      },
      dev: {
        options: {
          script: 'client/scripts/app.js',
            debug: true
        }
      },
      prod: {
        options: {
          script: 'client/scripts/app.js'
        }
      }
    }
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function () {
      this.async();
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {

    grunt.task.run([
      'injector',
      'watch',
      'express:dev',
      'express-keepalive'
    ]);
  });

  // Load the Grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-asset-injector');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-express-server');

  // Register the default tasks.
  grunt.registerTask('default', ['watch']);
};
