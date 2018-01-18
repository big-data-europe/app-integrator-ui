import Ember from 'ember';

const RenderUiComponent = Ember.Component.extend({
  classNameBindings: ['mainClass', 'classes', 'isHidden:hidden', 'isActive:active'],
  mainClass: Ember.computed('ui', function(){
    if (this.get('ui.engine') === true){
      return 'engine-view';
    }
    return 'iframe-view';
  }),
  frameUrl: Ember.computed('ui', function() {
    return this.get('ui.baseUrl') + this.get('ui.appendPath');
  }),

  isHidden: Ember.computed('ui', 'activeUi', function(){
    return !(this.get('ui') === this.get('activeUi'));
  }),

  isActive: Ember.computed.not('isHidden'),

  keepIFrameState: true,

  hasBeenDisplayed: Ember.computed('ui', 'visitedFrames.@each.id', function(){
    return this.get('visitedFrames').contains(this.get('ui'));
  })
});

export default RenderUiComponent;
