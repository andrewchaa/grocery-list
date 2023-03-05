const typeDefs = `#graphql
  type GroceryItem {
    name: String
    done: Boolean
  }

  type Query {
    groceryItems: [GroceryItem]
  }
`;
export default typeDefs;
