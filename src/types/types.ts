import { gql } from "apollo-server";
import fs from 'fs';

export default gql`
    type TimeInfo {
        start: Int
        end: Int
    }    

    type Event {
        name: String
        description: String
        time: TimeInfo
    }

    type Query {
        getAllEvents: [Event]
    }
`;