import { ApolloServer, gql } from 'apollo-server';
import qlTypes from '../types/types';
import queryResolvers from '../models/Query';
import mutationResolvers from '../models/Mutation';
import subscriptionFeeds from '../models/Subscription';
import { AppConfig } from '../app';
import { PubSub } from 'apollo-server';

let pubSubInstance : PubSub;

export default class ApolloImpl {
    apolloServer: ApolloServer

    constructor() {
        this.apolloServer = new ApolloServer({
            typeDefs: qlTypes,
            resolvers: {
                Query: queryResolvers,
                Mutation: mutationResolvers,
                Subscription: subscriptionFeeds
            },
            introspection: true,
            playground: true,
        });
    }

    start() {
        pubSubInstance = new PubSub();
        this.apolloServer.listen({port: AppConfig.port}).then(({ url }) => {
            console.log(`Apollo Server up at ${url}`)
        });
    }
}

export {pubSubInstance as pubSub};