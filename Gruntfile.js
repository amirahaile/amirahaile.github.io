module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    autoprefixer: {
      global: {
        expand: true,
        flatten: true,
        src: "src/_sass/*.scss",
        dest: "dest/_sass/"
      }
    },

    // equivalent to minify
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/isotope.pkgd.min.js', // input
        dest: 'js/build/global.min.js' // output
      }
    },

    // sass: {
    //   dist: {                   // Target
    //     options: {              
    //       style: 'compressed',
    //       require: 'susy'
    //     },
    //     files: {                         // Dictionary of files
    //       //'css/global-unprefixed.css': 'css/global.scss',       // 'destination': 'source'
    //       'css/main.css': 'css/main.scss'      
    //     }
    //   }
    // },

    watch: {
      options: {
        livereload: 4000
      },
      site: {
        files: ["index.html", "_layouts/*.html", "_posts/*.md", "projects/*.md", "_includes/*.html"],
        tasks: ["shell:jekyllBuild"]
      },
      css: {
        files: ["css/*.scss", "_sass/*.scss"],
        tasks: ["shell:jekyllBuild", "autoprefixer"]
      },
      svg: {
        files: ["svg/*.svg"],
        tasks: ["svgstore", "shell:jekyllBuild"]
      }
    },

    shell: {
      jekyllServe: {
        command: "jekyll serve -w"
      },
      jekyllBuild: {
        command: "jekyll build"
      }
    },

    svgstore: {
      options: {
        prefix: 'shape-', // will prefix each <symbol> ID
      },
      default: {
        files: {
          'images/svg-defs.svg': ['images/*.svg'],
        }
      }
    },

    buildcontrol: {
      options: {
        dir: '_site',
        commit: true,
        push: true,
        message: 'Build %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:amirahaile/amirahaile.github.io.git',
          branch: 'master'
        }
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-build-control');

  // Default task(s).
  grunt.registerTask('default', ['svgstore', 'shell:jekyllBuild', 'watch']); // 'autoprefixer, uncss'
  grunt.registerTask('serve', ['shell:jekyllServe']);
  grunt.registerTask('build', ['buildcontrol:pages'])
};