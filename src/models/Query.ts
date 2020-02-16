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
        } catch (e) {return null}
        return foundEvent;
    },
    tags: async (parent, args) => {
        let tags;
        try {
          tags = await OutlookEvents.distinct('tags');
        } catch(e) {return null}
        return tags;
    },
    recommendedEvents: async (parent, args) => {
        let tagAggregator : any[] = [];
        for (let interest of args.interests) {
            if (interest === 'cs') tagAggregator.push('cs');
        }
        if (tagAggregator.length == 0) return [];
        let events;
        try {
            events = await databaseClient.getEventsFromTags(tagAggregator);
        } catch (e) {
            return [];
        }
        return events;
    },
    eventsByTags: async (parent, args) => {
        let events;
        try {
            events = await databaseClient.getEventsFromTags(args.tags);
        } catch (e) {
            return [];
        }
        return events;
    }
};

export default resolvers;