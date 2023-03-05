import { groceryItems } from "./data.js";
const resolvers = {
    Query: {
        groceryItems: () => groceryItems,
    },
};
export default resolvers;
