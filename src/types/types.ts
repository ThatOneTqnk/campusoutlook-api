import { gql } from "apollo-server";
import fs from 'fs';

export default gql`${fs.readFileSync('schema.graphql', 'utf8')}`;