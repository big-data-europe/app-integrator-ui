import DS from 'ember-data';
import attr from 'ember-data/attr';
import Ember from 'ember';
import DockerFileParser from '../mixins/docker-file-parser';

export default DS.Model.extend(DockerFileParser, {
  title: attr('string'),
  text: attr('string'),

  yaml: Ember.computed('text', function() {
    return this.yamlParser(this.get('text'));
  }),

  serviceNames: Ember.computed('yaml', function() {
    return this.serviceNameFilter(this.get('yaml'));
  }),
  services: Ember.computed('yaml', function() {
    return this.getServices(this.get('yaml'));
  }),

  getServiceDetails: function(servicename) {
    return this.getService(this.get('yaml'), servicename);
  },
  
  relatedStacks: DS.hasMany('stack', {
    inverse: 'dockerFile'
  }),
  relatedWorkflows: DS.hasMany('pipeline', {
    inverse: 'dockerFile'
  })

});
