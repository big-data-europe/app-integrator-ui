import Ember from 'ember';

const ApplicationRoute = Ember.Route.extend({
  store: Ember.inject.service('store'),
  model() {
    return this.store.findAll('user-interface');
  }
});


export default ApplicationRoute;
