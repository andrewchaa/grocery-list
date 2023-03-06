import { gql } from '@apollo/client'

export const GET = gql`
  query GetItems {
    groceryItems {
      name
      done
    }
  }
`

export const ADD = gql`
  mutation AddItem($name: String!) {
    addGroceryItem(name: $name) {
      name
      done
    }
  }
`

export const UPDATE = gql`
  mutation UpdateItem($name: String!, $done: Boolean!) {
    updateGroceryItem(name: $name, done: $done) {
      name
      done
    }
  }
`
