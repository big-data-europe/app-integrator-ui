/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Ember from 'ember';

const ApplicationRoute = Ember.Route.extend({
  store: Ember.inject.service('store'),
  model() {
    return this.store.findAll('user-interface');
  }
});


export default ApplicationRoute;
