import { IResolverObject } from "graphql-tools";
import OutlookEvents from '../db/models/events';
import { pubSub } from "../apollo/apollo_impl";
import { EVENT_ADDED } from "./Subscription";
import { databaseClient } from "../app";
import mongoose from "mongoose";

function normalizeTags(tags : String[]) : String[] {
    return tags;
} 

let resolvers : IResolverObject = {
    createEvent: async (parent, args) => {
        const normalizedTags : String[] = normalizeTags(args.tags);
        let outlookEvent;
        try {
            outlookEvent = await OutlookEvents.create({name: args.name, description: args.description, time: {
                start: args.timeobj.start,
                end: args.timeobj.end
            }, tags: normalizedTags, attendees: []});
            pubSub.publish(EVENT_ADDED, { eventFeed: args });
        } catch(e) {
            console.error(e);
        }
        return outlookEvent;
    },
    joinEvent: async (parent, args) => {
        const foundEvent : any = await databaseClient.getEventById(args.eventID);
        if (foundEvent == null) return false;
        let attendeesArr = (foundEvent.attendees) ? foundEvent.attendees : [];
        attendeesArr.push(args.userID)
        foundEvent.attendees = attendeesArr;
        foundEvent.save((err : any, updated : any) => {});
        return true;
    }
};

export default resolvers;