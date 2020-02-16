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
            let foundEvent;
            OutlookEvents.findById(id, (err, doc) => {
              if (doc) {
                resolve(foundEvent);
              }  else {
                resolve(null);
              }
            }); 
        })
    }
}