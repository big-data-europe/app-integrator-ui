import DS from 'ember-data';
import Concept from '../mixins/swarm-ui-concept';

export default DS.Model.extend(Concept, {
  dockerFile: DS.belongsTo('docker-compose', {
    inverse: 'stacks'
  }),
  isStack: true,
  isRepository: false
});
