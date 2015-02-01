module.exports = (grunt) ->

  grunt.initConfig

    coffee:
      compile:
        files: [
          expand: yes
          cwd: 'src/coffee/'
          src: ['**/*.coffee']
          dest: 'dist/js/'
          ext: '.js'
        ]

    sass:
      compile:
        files: [
          expand: yes
          cwd: 'src/sass/'
          src: ['**/*.scss', '**/*.sass']
          dest: 'dist/css/'
          ext: '.css'
        ]

    copy:
      html:
        files: [
          expand: yes
          cwd: 'src/'
          src: ['**/*.html']
          dest: 'dist/'
        ]
      img:
        files: [
          expand: yes
          cwd: 'src/img/'
          src: ['*']
          dest: 'dist/img/'
        ]
      sounds:
        files: [
          expand: yes
          cwd: 'src/sounds/'
          src: ['*']
          dest: 'dist/sounds/'
        ]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-sass'

  grunt.registerTask 'build', ['coffee', 'sass', 'copy']
