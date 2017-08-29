console.log("loading release.js");

// config/release.js
var path = require('path');
var fs = require('fs')
var archiver = require('archiver');
var BuildTask = require('ember-cli/lib/tasks/build');


module.exports = {
  init: function() {
    console.log('called init hook');
  },
  beforeCommit: function(project, tags) {
    return new Promise(function(success, failure) {
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
      }).then(function() {
        // zip the latest sources
        console.log("Zipping the sources...");
        // create a file to stream archive data to.
        var output = fs.createWriteStream(project.root + '/dist.zip');
        var archive = archiver('zip');
        // listen for all archive data to be written
        output.on('close', function() {
          console.log(archive.pointer() + ' total bytes');
          console.log('archiver has been finalized and the output file descriptor has closed.');
          console.log('[TODO] Please upload ' + path.join(project.root, "dist.zip") + ' to the GitHub release once the tag is pushed and maybe trigger the build on hub.docker.com again.');
        });

        // good practice to catch this error explicitly
        archive.on('error', function(err) {
          throw err;
        });
        // pipe archive data to the file
        archive.pipe(output);
        // append files from a directory
        archive.directory('dist/');
        // finalize the archive (ie we are done appending files but streams have to finish yet)
        archive.finalize();

        success();
      }, failure);
    });
  }
};
