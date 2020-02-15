import { IResolverObject } from "graphql-tools";
import OutlookEvents from '../db/models/events';

let resolvers : IResolverObject = {
    getAllEvents: async () => {
        let totalEvents;
        try {
            totalEvents = await OutlookEvents.find();
        } catch (e) {
            console.error(e);
        }
        return totalEvents;
    },
    getEvent: async (parent, args) => {
        let foundEvent = null;
        try {
            foundEvent = await OutlookEvents.findById(args.id); 
        } catch (e) {}
        return foundEvent;
    }
};

export default resolvers;