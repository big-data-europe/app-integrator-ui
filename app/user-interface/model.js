import DS from 'ember-data';

const UserInterface = DS.Model.extend({
  label: DS.attr(),
  baseUrl: DS.attr(),
  appendPath: DS.attr({defaultValue: ""})
});


export default UserInterface;
