import DS from 'ember-data';

export default DS.Model.extend({
  // up, starting, started, stopping, stopped, restarting, down
  title: DS.attr()
});
