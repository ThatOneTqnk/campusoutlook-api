
import { AppConfig, databaseClient } from "../app";
import { IResolverObject } from "graphql-tools";
import OutlookEvents from '../db/models/events';
import { pubSub } from "../apollo/apollo_impl";
import { EVENT_ADDED } from "./Subscription";
import { Storage } from '@google-cloud/storage';
import uuidv4 from 'uuid/v4';

const storage = new Storage({
  credentials: {
    "client_email": AppConfig.storage.email,
    "private_key": AppConfig.storage.privateKey,
  }
});
const bucket = storage.bucket(AppConfig.storage.bucket);

function normalizeTags(tags : String[]) : String[] {
    return tags;
} 

function getPublicUrl(gcsname: String, bucket: String) {
  return `https://${bucket}.storage.googleapis.com/${gcsname}`
}

let resolvers : IResolverObject = {
    createEvent: async (parent, args) => {
        const normalizedTags : String[] = normalizeTags(args.tags);
        // const gcsurl = await new Promise(async (resolve, reject) => {
        //     args.event_photo.then((file) => {
                
        //         const { stream, filename, mimetype, encoding } = file;
        //         const gcsname = uuidv4().toString() + '-' + filename;
        //         const bucket_file = bucket.file(gcsname); // TO-DO: Fix file upload names
                
        //         const ws = bucket_file.createWriteStream({
        //             metadata: {
        //               contentType: mimetype
        //             },
        //             resumable: false
        //         })
                
        //         file.pipe(ws).on('finish', () => {
        //             bucket_file.makePublic(function(err, apiResponse) {
        //                 console.log(apiResponse[0]);
        //                 resolve(getPublicUrl(gcsname, AppConfig.storage.bucket))
        //             });
        //         });

        //     });
        // })
        
        let outlookEvent;
        try {
            outlookEvent = await OutlookEvents.create({name: args.name, description: args.description, time: {
                start: args.timeobj.start,
                end: args.timeobj.end
            }, tags: normalizedTags, attendees: [], image_url: args.event_photo_url, location: args.location});
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
        attendeesArr.push(args.user);
        foundEvent.attendees = attendeesArr;
        foundEvent.save((err : any, updated : any) => {});
        return true;
    }
};

export default resolvers;