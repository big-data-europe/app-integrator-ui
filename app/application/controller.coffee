`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend
  activeUi: Ember.computed 'model.[]', 'activeId', ->
    @get('model').findBy 'id', @get('activeId')
  actions:
    selectUi: (ui) ->
      @set 'activeId', ui.get('id')
      return


`export default ApplicationController`
