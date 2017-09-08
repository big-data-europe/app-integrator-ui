/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType});

Router.map(function() {
  this.mount('ember-stack-builder-engine', { path: '/stack-builder' });
  this.mount('ember-swarm-ui-engine', { path: '/swarm-ui' });
  return this.mount('ember-pipeline-builder-engine', {path: '/workflow-builder'});
});

export default Router;
