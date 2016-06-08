`import DS from 'ember-data'`

UserInterface = DS.Model.extend
  label: DS.attr()
  baseUrl: DS.attr()
  appendPath: DS.attr()


`export default UserInterface`
