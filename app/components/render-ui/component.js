import Ember from 'ember';

const RenderUiComponent = Ember.Component.extend({
  frameUrl: Ember.computed('activeUi.baseUrl', 'appendPath', function() {
    return this.get('activeUi.baseUrl') + this.get('appendPath');
  })
});

export default RenderUiComponent;
