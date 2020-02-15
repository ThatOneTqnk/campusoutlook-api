import { IResolverObject } from "graphql-tools";
import OutlookEvents from '../db/models/events';
import { pubSub } from "../apollo/apollo_impl";
import { EVENT_ADDED } from "./Subscription";

function normalizeTags(tags: String[]) : String[] {
    return tags;
} 

let resolvers : IResolverObject = {
    createEvent: async (parent, args) => {
        const normalizedTags = normalizeTags(args.tags);
        let outlookEvent;
        try {
            outlookEvent = await OutlookEvents.create({name: args.name, description: args.description, time: {
                start: args.timeobj.start,
                end: args.timeobj.end
            }, tags: normalizeTags});
            pubSub.publish(EVENT_ADDED, { eventFeed: args });
        } catch(e) {
            console.error(e);
        }
        return outlookEvent;
    }
};

export default resolvers;