import { gql } from '@apollo/client'

export const GET_GROCERYITEMS = gql`
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
