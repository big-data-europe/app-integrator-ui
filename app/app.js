import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

const App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
  engines: {
    emberStackBuilderEngine: {
      dependencies: {
        services: [
          'store'
        ],
        externalRoutes: {
          swarmUiList: 'ember-swarm-ui-engine.list'
        }
      }
    },
    emberSwarmUiEngine: {
      dependencies: {
        services: [
          'store'
        ],
        externalRoutes: {
          stack: 'ember-stack-builder-engine.editor.edit'
        }
      }
    },
    emberPipelineBuilderEngine: {
      dependencies: {
        services: [
          'store'
        ]
      }
    }
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
