import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  index: attr('number'),
  item: DS.belongsTo('container-item'),
  group: DS.belongsTo('container-group'),
});
