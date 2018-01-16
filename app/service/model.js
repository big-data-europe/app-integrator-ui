import DS from 'ember-data';
import attr from 'ember-data/attr';
import Ember from 'ember';

export default DS.Model.extend({
  name: attr('string'),
  scaling: attr('number'),
  restartRequested: attr('string'),
  scalingRequested: attr('number'),
  pipelineInstance: DS.belongsTo('pipeline-instance'),
  status: DS.belongsTo('status', {
    async: true
  }),
  requestedStatus: DS.belongsTo('status'),

  restart: function() {
    this.set('restartRequested', true);
    this.save();
  },
  refreshLogs: function() {
    if (!this.get('refreshingLogs')) {
      this.set('refreshingLogs', true);
      return Ember.$.ajax("/swarm/services/" + (this.get('id')) + "/logs").then((function(_this) {
        return function(content) {
          _this.set('logs', content);
          return _this.set('refreshingLogs', false);
        };
      })(this));
    }
  }

});
