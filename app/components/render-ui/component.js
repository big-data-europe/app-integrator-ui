import Ember from 'ember';

const RenderUiComponent = Ember.Component.extend({
  classNameBindings: ['mainClass', 'classes', 'isHidden:hidden', 'isActive:active'],
  mainClass: 'iframe-view',
  frameUrl: Ember.computed('ui', function() {
    return this.get('ui.baseUrl') + this.get('ui.appendPath');
  }),

  isHidden: Ember.computed('ui', 'activeUi', function(){
    return !(this.get('ui') === this.get('activeUi'));
  }),

  isActive: Ember.computed.not('isHidden')
});

export default RenderUiComponent;
