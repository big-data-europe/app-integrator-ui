`import Ember from 'ember'`
`import config from './config/environment'`

Router = Ember.Router.extend
  location: config.locationType

Router.map ->
  @mount('ember-stack-builder-engine', { path: '/stack-builder' });
  @mount('ember-swarm-ui-engine', { path: '/swarm-ui' });
  @mount('ember-pipeline-builder-engine', {path: '/workflow-builder'});

`export default Router`
