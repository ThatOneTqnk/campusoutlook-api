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
        return await databaseClient.getEventById(args.id);
    }
};

export default resolvers;