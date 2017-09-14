import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  title: attr('string'),
  repository: attr('string'),
  dockerText: attr('string'),
  relations: DS.hasMany('container-relation')
});
