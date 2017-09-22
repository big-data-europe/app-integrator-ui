import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  title: attr('string'),
  icon: attr('string'),
  location: attr('string'),
  pipelineInstances: DS.hasMany('pipeline-instance'),

  numberOfPipelines: Ember.computed('pipelineInstances', 'pipelineInstances.[]', function () {
    return this.get('pipelineInstances.length');
  }),
  dockerFile: DS.belongsTo('docker-compose', {
    inverse: 'stacks'
  })
});
