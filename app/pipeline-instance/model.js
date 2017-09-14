import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  title: attr('string'),
  icon: attr('string'),
  restartRequested: attr('string'),
  updateRequested: attr('string'),
  status: DS.belongsTo('status'),
  requestedStatus: DS.belongsTo('status'),
  repository: DS.belongsTo('repository', {
    inverse: 'pipelineInstances'
  }),
  stack: DS.belongsTo('stack', {
    inverse: 'pipelineInstances'
  }),
  services: DS.hasMany('service'),

  // Right now both for restarting & updating pipelines, a triple is written into the database
  // and once the pipeline is restarted or updated, the triple is removed from the DB, but that
  // is not reflected in the frontend since we don't have a way of pushing notifications yet.
  // The problem with this is that once you have restarted once, updating the pipeline will also
  // trigger a restart since the flag was never cleared in the frontend.
  // The best we can do now is optimistically assume that the admin service has successfully performed
  // the operation, cross fingers and reset the restart/update flag once we know the call at least
  // succeeded.

  // TODO: Remove this if the push notifications come through.
  restart: function() {
    this.set('restartRequested', true);
    this.save().then(() => this.set('restartRequested', false));
  },

  update: function() {
    this.set('updateRequested', true);
    this.save().then(() => this.set('updateRequested', false));
  }
});
