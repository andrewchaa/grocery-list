import { useState } from 'react';
import Add from './components/Add';
import List from './components/List';
import { items as groceryList } from './data';
import { GroceryItem } from './types';

function App() {

  const [items, setItems] = useState<GroceryItem[]>(groceryList);
  const addToItems = (item: GroceryItem) => {
    setItems([...items, item])
  }

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Grocery List</h1>
      <div className="App">
        <List items={items} toggle={toggle} />
        <Add addToItems={addToItems} />
      </div>
    </div>
  )
}

export default App;
