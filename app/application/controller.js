import Ember from 'ember';

const ApplicationController = Ember.Controller.extend({
  queryParams: {
    activeId: null,
    appendPath: ""
  },
  activeUi: Ember.computed('model.[]', 'activeId', function() {
    return this.get('model').findBy('id', this.get('activeId'));
  }),
  actions: {
    selectUi(ui) {
      this.set('appendPath', ui.get('appendPath'));
      this.set('activeId', ui.get('id'));
    }
  }
});


export default ApplicationController;
