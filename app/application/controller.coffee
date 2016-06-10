`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend
  queryParams:
    activeId: null
    appendPath: ""
  activeUi: Ember.computed 'model.[]', 'activeId', ->
    @get('model').findBy 'id', @get('activeId')
  actions:
    selectUi: (ui) ->
      @set 'appendPath', ui.get('appendPath')
      @set 'activeId', ui.get('id')
      return


`export default ApplicationController`
