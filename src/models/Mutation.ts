import { IResolverObject } from "graphql-tools";
import OutlookEvents from '../db/models/events';

let resolvers : IResolverObject = {
    createEvent: async (parent, args) => {
        let outlookEvent;
        try {
            outlookEvent = await OutlookEvents.create({name: args.name, description: args.description, time: {
                start: args.timeobj.start,
                end: args.timeobj.end
            }});
        } catch(e) {
            console.error(e);
        }
        return outlookEvent;
    }
};

export default resolvers;