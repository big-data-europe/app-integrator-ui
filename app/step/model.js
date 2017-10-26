import Ember from 'ember';
import DS from 'ember-data';
import HasManyQuery from 'ember-data-has-many-query';

const Step = DS.Model.extend(HasManyQuery.ModelMixin, {
  title: DS.attr('string'),
  description: DS.attr('string'),
  code: DS.attr('string'),
  order: DS.attr('number'),
  status: DS.attr('string', {defaultValue() { return 'not_started'; }}),
  pipeline: DS.belongsTo('pipeline'),
  service: DS.belongsTo('docker-service'),

  collapsed:true,
  editing: false,

  save: function() {
    const _this = this;
    if(this.get('isDeleted')){
      // If a step is deleted, we need to ensure that the service linked to it is no longer using its init daemon step & is no longer depending on the service from the previous step
      let order = _this.get('order');
      let prom = this._super();
      return Ember.RSVP.hash({
        prevServ: this.getPreviousService(),
        currServ: this.get('service'),
        nextServ: this.getNextService()
      }).then(hash => {
        let promises = [];
        console.debug("Step Model - -------");
        if(hash.prevServ){
          console.debug("Step Model - prevServ : "+hash.prevServ.get('name'));
        }
        if(hash.currServ){
          console.debug("Step Model - currServ : "+hash.currServ.get('name'));
        }
        if(hash.nextServ){
          console.debug("Step Model - nextServ : "+hash.nextServ.get('name'));
        }
        console.debug("Step Model - -------");

        if(hash.currServ) {
          promises.push(hash.currServ.deleteEnvironmentVariable("INIT_DAEMON_STEP").catch(e =>{console.debug("Step Model - No INIT_DAEMON_STEP on this service. ");}));
          if(hash.prevServ) {
            promises.push(hash.currServ.removeDependsOn(hash.prevServ));
          }
          if(hash.nextServ){
            promises.push(hash.nextServ.removeDependsOn(hash.currServ));
          }
          if(hash.prevServ && hash.nextServ){
            promises.push(hash.nextServ.addDependsOn(hash.prevServ));
          }
        }

        return Ember.RSVP.all(promises).then(results => {
          let promises = [];
          promises.push(prom);
          if(hash.currServ){
            hash.currServ.set('step', null);
            promises.push(hash.currServ.save());
          }
          if(hash.nextServ){
            promises.push(hash.nextServ.save());
          }
          return Ember.RSVP.all(promises).then(results => {
            console.debug("Step Model - Finished cleaning step.");

            return _this.get('pipeline').then(pipeline => {
              return pipeline.get('steps').then(steps => {
                let promises = [];

                steps.forEach(step => {
                  if(step.get('order') > order){
                    step.set('order', step.get('order')-1);
                    promises.push(step.save());
                  }
                });
                return Ember.RSVP.all(promises).then(results => {
                  console.debug("Step Model - Finished updating order for next steps.");
                  return prom;
                });
              });
            });
          });
        });

      });
    }
    else
    {
      return this._super();
    }
  },

  getPreviousStep: function (include) {
    const step = this;

    return step.get('pipeline').then(pipeline => {
      return this.get('store').query('step', {
        filter: {
          order: step.get('order') - 1,
          pipeline: {id: pipeline.get('id')}
        },
        include
      }).then(results => {
        return results.get('firstObject');
      });
    });
  },
  getPreviousService: function () {
    return this.getPreviousStep("service").then(prevStep => {
      if (!prevStep) {
        return null;
      }
      return prevStep.get('service');
    });
  },

  getNextStep: function (include) {
    const step = this;

    return step.get('pipeline').then(pipeline => {
      return this.get('store').query('step', {
        filter: {
          order: step.get('order') + 1,
          pipeline: {id: pipeline.get('id')}
        },
        include
      }).then(results => {
        return results.get('firstObject');
      });
    });
  },
  getNextService: function () {
    return this.getNextStep("service").then(nextStep => {
      if (!nextStep) {
        return null;
      }
      return nextStep.get('service');
    });
  },

  removeLinksForStep: function() {
    return Ember.RSVP.hash({
      prevService: this.getPreviousService(),
      currService: this.get('service'),
      nextService: this.getNextService()
    }).then(hash => {
      if (!hash.currService) {
        throw new Error("No service was linked to this step. ");
      }
      console.debug("Step Model ---------------");
      console.debug("Step Model - removeLinksForStep");
      let promises = [];
      if (hash.prevService) {
        console.debug("Step Model - Current service [" + hash.currService.get('name') + "] must no longer depend on [" + hash.prevService.get('name') + "].");
        promises.push(hash.currService.removeDependsOn(hash.prevService));
      }

      if (hash.nextService) {
        console.debug("Step Model - Next service [" + hash.nextService.get('name') + "] must no longer depend on current service [" + hash.currService.get('name') + "].");
        promises.push(hash.nextService.removeDependsOn(hash.currService));
      }

      if(hash.prevService && hash.nextService) {
        console.debug("Step Model - Next service [" + hash.nextService.get('name') + "] must now depend on prev service [" + hash.prevService.get('name') + "].");
        promises.push(hash.nextService.addDependsOn(hash.prevService));
      }

      return Ember.RSVP.all(promises).then(result => {
        let promises = [];
        if (hash.prevService) {
          promises.push(hash.prevService.save());
        }

        if (hash.nextService) {
          promises.push(hash.nextService.save());
        }

        promises.push(hash.currService.save());

        return Ember.RSVP.all(promises).then(result => {
          console.debug("Step Model ---------------");
          return result;
        });
      });

    });
  },

  insertLinksForStep: function() {
    return Ember.RSVP.hash({
      prevService: this.getPreviousService(),
      currService: this.get('service'),
      nextService: this.getNextService()
    }).then(hash => {
      if (!hash.currService) {
        throw new Error("No service was linked to this step. ");
      }
      console.debug("Step Model ---------------");
      console.debug("Step Model - insertLinksForStep");
      let promises = [];
      if (hash.prevService) {
        console.debug("Step Model - Current service [" + hash.currService.get('name') + "] must now depend on [" + hash.prevService.get('name') + "].");
        promises.push(hash.currService.addDependsOn(hash.prevService));
      }

      if (hash.nextService) {
        console.debug("Step Model - Next service [" + hash.nextService.get('name') + "] must now depend on current service [" + hash.currService.get('name') + "].");
        promises.push(hash.nextService.addDependsOn(hash.currService));
      }

      if(hash.prevService && hash.nextService) {
        console.debug("Step Model - Next service [" + hash.nextService.get('name') + "] must no longer depend on prev service [" + hash.prevService.get('name') + "].");
        promises.push(hash.nextService.removeDependsOn(hash.prevService));
      }

      return Ember.RSVP.all(promises).then(result => {
        let promises = [];
        if (hash.prevService) {
          promises.push(hash.prevService.save());
        }

        if (hash.nextService) {
          promises.push(hash.nextService.save());
        }

        promises.push(hash.currService.save());

        return Ember.RSVP.all(promises).then(result => {
          console.debug("Step Model ---------------");
          return result;
        });
      });

    });
  },

  linkToService: function (newService) {
    let step = this;
    return step.get('service').then(oldService => {
      let promises = [];
      if(oldService) {
        promises.push(oldService.deleteEnvironmentVariable("INIT_DAEMON_STEP").catch(e => {
          console.debug("Step Model - oldService didn't have INIT_DAEMON_STEP");
        }));
      }
      promises.push(step.removeLinksForStep().catch(e => {
        console.debug("Step Model - oldService didn't exist");
      }));

      return Ember.RSVP.all(promises).then(results => {
        step.set('service', newService);
        return step.save().then(step => {
          let promises = [];
          if(oldService){promises.push(oldService.save());}
          promises.push(newService.setEnvironmentVariable("INIT_DAEMON_STEP", step.get('code')));
          promises.push(step.insertLinksForStep());
          return Ember.RSVP.all(promises).then(results => {
            return newService.save();
          });
        });
      });
    });
  }
});

export default Step;
