import { ApolloServer, gql } from 'apollo-server';
import qlTypes from '../types/types';
import queryResolvers from '../models/Query';
import { AppConfig } from '../app';

export default class ApolloImpl {
    apolloServer: ApolloServer

    constructor() {
        this.apolloServer = new ApolloServer({
            typeDefs: qlTypes,
            resolvers: {
                Query: queryResolvers
            }
        });
    }

    start() {
        this.apolloServer.listen({port: ((process.env.NODE_ENV || 'dev') == 'dev') ? AppConfig.port.devPort : AppConfig.port.prodPort}).then(({ url }) => {
            console.log(`Apollo Server up at ${url}`)
        });
    }
}
