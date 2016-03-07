`import Ember from 'ember'`

ApplicationRoute = Ember.Route.extend
  store: Ember.inject.service 'store'
  model: ->
    @store.findAll('user-interface')


`export default ApplicationRoute`
