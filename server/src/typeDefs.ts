const typeDefs = `#graphql
  type GroceryItem {
    name: String
    done: Boolean
  }

  type Query {
    groceryItems: [GroceryItem]
  }

  type Mutation {
    addGroceryItem(name: String!): GroceryItem
    updateGroceryItem(name: String!, done: Boolean!): GroceryItem
  }
`

export default typeDefs
