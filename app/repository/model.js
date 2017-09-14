import DS from 'ember-data';
import attr from 'ember-data/attr';
import Concept from '../mixins/swarm-ui-concept';

export default DS.Model.extend(Concept, {
  location: attr('string'),
  isStack: false,
  isRepository: true
});
