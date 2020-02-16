import mongoose from 'mongoose';
let Schema = mongoose.Schema, objectID = mongoose.Schema.Types.ObjectId;

let OutlookEvent = new Schema({
    name: String,
    description: String,
    time: {
        start: Number,
        end: Number
    },
    tags: [{
        type: String
    }],
    attendees: [{
        first_name: String,
        last_name: String,
        email: String,
        phone_number: String,
    }]
});

export default mongoose.model('outlook_event', OutlookEvent);