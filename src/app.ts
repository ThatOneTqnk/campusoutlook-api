import config from './config.json';
import ApolloImpl from './apollo/apollo_impl';
import DatabaseClient from './db/dbclient';
let dbClient : DatabaseClient;

(async () => {
    dbClient = new DatabaseClient(config.database.username, config.database.password, config.database.host);
    new ApolloImpl().start();
})();

export {config as AppConfig, dbClient as databaseClient};