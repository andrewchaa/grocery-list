import { groceryItems } from "./data.js";
const resolvers = {
    Query: {
        groceryItems: () => groceryItems,
    },
    Mutation: {
        addGroceryItem: (_, { name }) => {
            const newItem = { name: name, done: false };
            groceryItems.push(newItem);
            return newItem;
        }
    }
};
export default resolvers;
