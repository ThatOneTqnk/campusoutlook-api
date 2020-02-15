import { IResolverObject } from "graphql-tools";
let resolvers : IResolverObject = {
    getAllEvents: async () => {
        return [
            {
                "name": "UChicago Test",
                "description": "Testing the events resolver",
                "time": {
                    "start": 1581791489,
                    "end": 1581792489
                }
            }
        ]
    }
};

export default resolvers;