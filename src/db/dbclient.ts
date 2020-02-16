import OutlookEvents from './models/events';
import mongoose from 'mongoose';

export default class DatabaseClient {
    constructor(private username : string, private password : string, private host : string) {
        const uri = `mongodb+srv://${username}:${password}@${host}/test?retryWrites=true&w=majority`;
        mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then((as) => {
            console.log('Connected to the database!');
        });
    }

    getEventById(id : string) {
        return new Promise(async (resolve, reject) => {
            OutlookEvents.findById(id, (err, doc) => {
              if (doc) {
                resolve(doc);
              }  else {
                resolve(null);
              }
            }); 
        })
    }

    getEventsFromTags(tags: string[]) {
        return new Promise(async (resolve, reject) => {
            let taggedEvents;
            try {
              taggedEvents = await OutlookEvents.find({tags: {"$in": tags}});
            } catch(e) {
              return resolve(null);
            }
            resolve(taggedEvents);
        });
    }

    sortEvents(eventArr) {
      const currentTime = Date.now() / 1000;
      const filteredArr = eventArr.filter(obj => obj.time.start >= currentTime);
      filteredArr.sort((a, b) => a.time.start <= b.time.start);
      return filteredArr; 
    }
}