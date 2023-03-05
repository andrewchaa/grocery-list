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
  }
`;
export default typeDefs;
