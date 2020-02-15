import { IResolverObject } from "graphql-tools";
import OutlookEvents from '../db/models/events';

const { PubSub } = require('apollo-server');
const pubsub = new PubSub();
const EVENT_ADDED = 'EVENT_ADDED';

let resolvers : IResolverObject = {
    createEvent: async (parent, args) => {
        let outlookEvent;
        try {
            outlookEvent = await OutlookEvents.create({name: args.name, description: args.description, time: {
                start: args.timeobj.start,
                end: args.timeobj.end
            }});
            pubsub.publish(EVENT_ADDED, { eventAdded: args });
        } catch(e) {
            console.error(e);
        }
        return outlookEvent;
    }
};

export default resolvers;