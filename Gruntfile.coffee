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

  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.registerTask('build', ['coffee']);
