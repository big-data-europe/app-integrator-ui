import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  dockerFile: DS.belongsTo('docker-compose'),
  step: DS.belongsTo('step'),
  dependsOn: DS.hasMany('docker-service', {inverse: null}),
  environmentVariables: DS.hasMany('environment-variables', {inverse: 'dockerService'}),



  getEnvironmentVariableObject: function(key){
    return this.get('environmentVariables').then(function(variables){
      return variables.find(function (variable) {
        if (variable.get('key') === key) {
          return true;
        }
      });
    });
  },
  getEnvironmentVariable: function(key){
    return this.get('environmentVariables').then(function(variables){
      let variable = variables.find(function(variable){
        if(variable.get('key') === key) { return true;}
      });
      if(variable) {
        return variable.get('value');
      }
      else {
        return null;
      }
    });
  },
  setEnvironmentVariable: function(key, value) {
    let _this = this;

    return this.get('environmentVariables').then(function(variables){
      let variable = variables.find(function(variable){
        if(variable.get('key') === key) { return true;}
      });
      if(variable) {
        variable.set('value', value);
        return variable.save();
      }
      else {
        let newEnv = _this.get('store').createRecord('environment-variable', {key, value});
        variables.pushObject(newEnv);
        return newEnv.save().then(variable =>{
          return variables.save().then(variables => {
            return variable;
          });
        });
      }
    });
  },
  deleteEnvironmentVariable: function(key){
    return this.get('environmentVariables').then(function(variables){
      let variable = variables.find(function(variable){
        if(variable.get('key') === key) { return true;}
      });
      if(variable) {
        variables.removeObject(variable);
        return variable.destroyRecord();
      }
      else {
        throw new Error("This service has no environment variable with the following key: "+key);
      }
    });
  },

  deleteEnvironmentVariableKeyAndValue: function(key, value){
    return this.get('environmentVariables').then(function(variables){
      let variable = variables.find(function(variable){
        if(variable.get('key') === key && variable.get('value' === value)) { return true;}
      });
      if(variable) {
        variables.removeObject(variable);
        return variable.destroyRecord();
      }
      else {
        throw new Error("This service has no environment variable with the following key: "+key);
      }
    });
  },

  addDependsOn: function(service) {
    const _this = this;
    return this.get('dependsOn').then(dependsOn => {
      console.debug("Docker Service Model - ["+_this.get('name')+"] now depends on ["+service.get('name')+"].");
      return dependsOn.addObject(service);
    });
  },

  removeDependsOn: function(service) {
    const _this = this;
    return this.get('dependsOn').then(dependsOn => {
      console.debug("Docker Service Model - ["+_this.get('name')+"] no longer depends on ["+service.get('name')+"].");
      return dependsOn.removeObject(service);
    });
  },

  linkToPreviousService(){
    let service = this;
    return service.get('step').then(step => {
      return step.getPreviousService().then(prevService => {
        if(!prevService){ return null;}
        return service.addDependsOn(prevService);
      });
    });
  }
});
