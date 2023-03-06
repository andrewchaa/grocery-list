import { groceryItems } from "./data.js"

const resolvers = {
  Query: {
    groceryItems: () => groceryItems,
  },
  Mutation: {
    addGroceryItem: (_, { name }) => {
      const newItem = { name: name, done: false }
      groceryItems.push(newItem)
      return newItem
    },
    updateGroceryItem: (_, { name, done }) => {
      const item = groceryItems.find((item) => item.name === name)
      if (item) {
        item.done = done
      }
      return item
    }
  }
}

export default resolvers
