import DS from 'ember-data';
import Ember from 'ember';
import attr from 'ember-data/attr';

export default Ember.Mixin.create({
  title: attr('string'),
  icon: attr('string'),
  pipelineInstances: DS.hasMany('pipeline-instance'),

  numberOfPipelines: Ember.computed('pipelineInstances','pipelineInstances.[]', function(){
    return this.get('pipelineInstances.length');
  })
});
