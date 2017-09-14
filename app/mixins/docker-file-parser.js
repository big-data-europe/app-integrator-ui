import Ember from 'ember';
import jsyaml from 'npm:js-yaml';

export default Ember.Mixin.create({
  yamlParser: function(yamlString) {
    return jsyaml.safeLoad(yamlString);
  },
  dockerParser: function(dockerText) {
    return dockerText.split('\n').filter(this.serviceNameFilter).map(this.removeUnsuportedCharacters);
  },
  serviceNameFilter: function(yaml) {
    return this.getKeysFromObject(yaml['services']);
  },
  getServices: function(yaml) {
    return yaml['services'];
  },
  getService: function(yaml, servicename) {
    return yaml['services'][servicename];
  },
  getAttributeFromService: function(yaml, servicename, attributename) {
    return yaml['services'][servicename][attributename];
  },

  // remove all the [^A-Za-z0-9_-] characters (non-alphanumberic)
  // match any character that is not in the set -> [^] is negation
  removeUnsuportedCharacters: function(line) {
    return line.replace(/[^A-Za-z0-9_-]/g, '');
  },

  getKeysFromObject: function(object) {
    var keys = [];
    for (let key in object) {
      keys.push(key);
    }
    return keys;
  }

});
