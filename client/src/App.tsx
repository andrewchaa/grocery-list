import { useState } from 'react';
import { useQuery, gql } from '@apollo/client'
import Add from './components/Add';
import List from './components/List';
import { items as groceryList } from './data';
import { GroceryItem } from './types';

function App() {
  const [items, setItems] = useState<GroceryItem[]>(groceryList);
  const addToItems = (item: GroceryItem) => {
    setItems([...items, item])
  }

  const GET_GROCERYITEMS = gql`
    query GetItems {
      groceryItems {
        name
        done
      }
    }
  `
  const toggle = (name: string) => {
    const newItems = items.map(item => {
      if (item.name === name) {
        return {
          ...item,
          done: !item.done
        }
      }
      return item;
    })
    setItems(newItems);
  }

  const { loading, error, data } = useQuery(GET_GROCERYITEMS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :{error.message}</p>

  console.log(data)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Grocery List</h1>
      <div className="App">
        <div><List items={data.groceryItems} toggle={toggle} /></div>
        <div className="pt-10">
          <Add addToItems={addToItems} />
        </div>
      </div>
    </div>
  )
}

export default App;
