import Ember from 'ember';

const RenderUiComponent = Ember.Component.extend({
  classNameBindings: ['classes', 'isHidden:hidden'],
  classes: 'iframe-view',
  frameUrl: Ember.computed('ui', function() {
    return this.get('ui.baseUrl') + this.get('ui.appendPath');
  }),

  isHidden: Ember.computed('ui', 'activeUi', function(){
    return !(this.get('ui') === this.get('activeUi'));
  })
});

export default RenderUiComponent;
