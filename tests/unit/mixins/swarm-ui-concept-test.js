import Ember from 'ember';
import SwarmUiConceptMixin from 'bde-integrator-user-interface/mixins/swarm-ui-concept';
import { module, test } from 'qunit';

module('Unit | Mixin | swarm ui concept');

// Replace this with your real tests.
test('it works', function(assert) {
  let SwarmUiConceptObject = Ember.Object.extend(SwarmUiConceptMixin);
  let subject = SwarmUiConceptObject.create();
  assert.ok(subject);
});
