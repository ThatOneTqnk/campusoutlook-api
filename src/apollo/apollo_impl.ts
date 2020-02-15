import { ApolloServer, gql } from 'apollo-server';
import qlTypes from '../types/types';
import queryResolvers from '../models/Query';

const fakeData = [
    {
        "name": "UChicago Test",
        "description": "Testing the events resolver",
        "time": {
            "start": 1581791489,
            "end": 1581792489
        }
    }
];

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
        this.apolloServer.listen().then(({ url }) => {
            console.log(`Apollo Server up at ${url}`)
        });
    }
}
