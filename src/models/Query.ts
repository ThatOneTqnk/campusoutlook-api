import { IResolverObject } from "graphql-tools";
import OutlookEvents from '../db/models/events';
import { databaseClient } from "../app";

let resolvers : IResolverObject = {
    events: async () => {
        let totalEvents;
        try {
            totalEvents = await OutlookEvents.find();
        } catch (e) {
            console.error(e);
        }
        return totalEvents;
    },
    event: async (parent, args) => {
        let foundEvent;
        try {
            foundEvent = await OutlookEvents.findById(args.id); 
        } catch (e) {}
        return foundEvent;
    }
};

export default resolvers;