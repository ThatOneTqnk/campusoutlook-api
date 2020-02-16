import ApolloImpl from './apollo/apollo_impl';
import DatabaseClient from './db/dbclient';
let dbClient : DatabaseClient;

let config : any = {};


try {
  config = require('./config.json');
} catch(e) {
  config = {
    "port": process.env.PORT,
    "database": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "host": process.env.DB_HOST
    },
    "storage": {
      "email": process.env.STORAGE_EMAIL,
      "privateKey": process.env.STORAGE_PRIVATE_KEY
    }
  }
}


(async () => {
    dbClient = new DatabaseClient(config.database.username, config.database.password, config.database.host);
    new ApolloImpl().start();
})();

export {config as AppConfig, dbClient as databaseClient};