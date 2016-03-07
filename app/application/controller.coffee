`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend
  activeUi: Ember.computed 'model.[]', 'model.@each.active', ->
    @get('model').findBy 'active', true
  actions:
    selectUi: (ui) ->
      @get('model').map (item) ->
        item.set 'active', item == ui
      return


`export default ApplicationController`
