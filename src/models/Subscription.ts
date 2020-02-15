import { IResolverObject } from "graphql-tools";
import OutlookEvents from '../db/models/events';
import { pubSub } from "../apollo/apollo_impl";

export const EVENT_ADDED = 'EVENT_ADDED';


let resolvers : IResolverObject = {
    eventFeed: {
        // Additional event labels can be passed to asyncIterator creation
        subscribe: () => pubSub.asyncIterator([EVENT_ADDED])
    },
};

export default resolvers;