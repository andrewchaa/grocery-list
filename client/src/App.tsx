import { useState } from 'react';
import './App.css';
import Add from './components/Add';
import List from './components/List';
import { items as groceryList } from './data';
import { GroceryItem } from './types';

function App() {

  const [items, setItems] = useState<GroceryItem[]>(groceryList);
  const addToItems = (item: GroceryItem) => {
    setItems([...items, item])
  }

  return (
    <div className="App">
      <header className="App-header">
        <List items={items} />
        <Add addToItems={addToItems} />
      </header>
    </div>
  );
}

export default App;
