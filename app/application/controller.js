import Ember from 'ember';

const ApplicationController = Ember.Controller.extend({
  queryParams: {
    activeId: null,
    appendPath: ""
  },
  activeUi: Ember.computed('model.[]', 'activeId', function() {
    return this.get('model').findBy('id', this.get('activeId'));
  }),

  previousIndex: -1,
  directionClass: 'left',

  actions: {
    selectUi(ui, index) {
      if (this.get('activeId') == ui.get('id')) {
        return;
      }

      var direction = 'left';
      if (this.get('previousIndex') >= index) {
        direction = "right";
      }

      this.set('directionClass', direction);
      this.set('previousIndex', index);

      this.set('appendPath', ui.get('appendPath'));
      this.set('activeId', ui.get('id'));

    }
  }
});


export default ApplicationController;
