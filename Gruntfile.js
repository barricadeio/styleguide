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
      injectJS: {
        files: [
          'client/**/*.js',
          '!client/**/*.spec.js',
          '!client/**/*.mock.js',
          '!client/scripts/app.js'],
        tasks: ['injector:scripts']
      },
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
        '{assets/js, scripts}/*.js',
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

    // The actual grunt server settings
    connect: {
      options: {
        port: 9090,
        hostname: 'localhost',
        livereload: 35729
      },
      
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '.'
        }
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'injector',
      'watch',
      'connect:livereload'
    ]);
  });

  // Load the Grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-asset-injector');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Register the default tasks.
  grunt.registerTask('default', ['watch']);
};
