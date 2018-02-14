import Ember from 'ember';

const ApplicationController = Ember.Controller.extend({
  queryParams: {
    activeId: null,
    appendPath: ""
  },
  activeUi: Ember.computed('model.[]', 'activeId', function() {
    let ui = this.get('model').findBy('id', this.get('activeId'));
    if(!ui) { return null;}
    let frames = this.get('visitedFrames');
    if(!frames.includes(ui)) {
      frames.pushObject(ui);
    }
    return ui;
  }),
  visitedFrames: [],

  previousIndex: -1,
  directionClass: 'left',

  actions: {
    selectUi(ui, index, type) {
      if (type === 'engine') {
        Ember.$('.iframe-view').each(function(key, value) {
          let iframeClasses = $(this).attr('class');
          if (iframeClasses.indexOf('active') !== -1) {
            $(this).addClass('hidden').removeClass('active');
          }
        });
      }

      if (this.get('activeId') === ui.get('id')) {
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

      if (type === 'iframe') {
        this.model.set("engine", false);
        this.transitionToRoute('application');
      }
    }
  }
});


export default ApplicationController;
