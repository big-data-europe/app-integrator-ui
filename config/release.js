console.log("loading release.js");

// config/release.js
var path = require('path');
var fs = require('fs')
var Zip = require('adm-zip');
var BuildTask = require('ember-cli/lib/tasks/build');


module.exports = {
  init: function() {
    console.log('called init hook');
  },
  beforeCommit: function(project, tags) {
    return new Promise( function( success, failure ) {
      // build the latest sources
      console.log("Creating new production build...");
      var task = new BuildTask({
        project: project,
        ui: project.ui,
        analytics: project.cli.analytics
      });

      task.run({
        environment: 'production',
        outputPath: 'dist/'
      }).then( function() {
        // zip the latest sources
        console.log("Zipping the sources...");
        var zip = new Zip();
        zip.addLocalFolder( path.join(project.root, "dist"), "dist" );
        zip.writeZip( path.join(project.root, "dist.zip") );
        console.log('[TODO] Please upload ' + path.join(project.root, "dist.zip") + ' to the GitHub release once the tag is pushed and maybe trigger the build on hub.docker.com again.');
	success();
      }, failure );
    });
  }
};
