/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';

const RenderUiComponent = Ember.Component.extend({
  frameUrl: Ember.computed('activeUi.baseUrl', 'appendPath', function() {
    return `${this.get('activeUi.baseUrl')}${this.get('appendPath')}`;
  })
});

export default RenderUiComponent;
