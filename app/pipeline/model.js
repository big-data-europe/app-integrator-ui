import DS from 'ember-data';
import HasManyQuery from 'ember-data-has-many-query';

const Pipeline = DS.Model.extend(HasManyQuery.ModelMixin, {
  title: DS.attr('string'),
  description: DS.attr('string'),

  steps: DS.hasMany('step', {
    parameters: {
      page: {
        size: 10000
      }
    }
  }),
  dockerFile: DS.belongsTo('docker-compose', {
    inverse: 'relatedWorkflows'
  }),

  editing: false
});

export default Pipeline;
