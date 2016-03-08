`import Ember from 'ember'`

RenderUiComponent = Ember.Component.extend
  frameUrl: Ember.computed 'activeUi.baseUrl', 'appendPath', ->
    "#{@get('activeUi.baseUrl')}#{@get('appendPath')}"

`export default RenderUiComponent`
