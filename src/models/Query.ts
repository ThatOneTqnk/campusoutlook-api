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
    }
};

export default resolvers;