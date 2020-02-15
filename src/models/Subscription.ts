import { IResolverObject } from "graphql-tools";
import OutlookEvents from '../db/models/events';
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();
const EVENT_ADDED = 'EVENT_ADDED';


let resolvers : IResolverObject = {
    // eventAdded: {
    //     // Additional event labels can be passed to asyncIterator creation
    //     subscribe: () => pubsub.asyncIterator([EVENT_ADDED]),
    // },
};

export default resolvers;