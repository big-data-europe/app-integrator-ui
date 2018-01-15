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
          swarmUiList: 'ember-swarm-ui-engine.list',
          workflow: 'ember-pipeline-builder-engine.steps'
        }
      }
    },
    emberPipelineBuilderEngine: {
      dependencies: {
        services: [
          'store'
        ],
        externalRoutes: {
          stack: 'ember-stack-builder-engine.editor.edit'
        }
      }
    },
    emberPipelineMonitorEngine: {
      dependencies: {
        services: [
          'store'
        ]
      }
    },
    emberSwarmUiEngine: {
      dependencies: {
        services: [
          'store',
          '-document'
        ],
        externalRoutes: {
          stack: 'ember-stack-builder-engine.editor.edit'
        }
      }
    }
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
