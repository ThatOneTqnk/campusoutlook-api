import config from './config.json';
import ApolloImpl from './apollo/apollo_impl';

(async () => {
    new ApolloImpl().start();
})();

export {config as AppConfig};