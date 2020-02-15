import { gql } from "apollo-server";
import fs from 'fs';

export default gql`
    type TimeInfo {
        start: Int
        end: Int
    }    

    type Event {
        uuid: String
        name: String
        description: String
        time: TimeInfo
    }

    type Query {
        getAllEvents: [Event]
        getEvent(UUID: String!): Event
    }

    type Mutation {
        createEvent(title: String!): Event
    }
`;