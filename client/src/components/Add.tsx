import { useState } from "react";
import { GroceryItem } from "../types";

export default function Add({
  addToItems
}: {
  addToItems: (item: GroceryItem) => void
}): JSX.Element {
  const [item, setItem] = useState<GroceryItem>({
    name: '',
    done: false,
    quantity: 1
  });

  const handleAdd = () => {
    addToItems(item);
  };

  return (
    <div>
      <input
        value={item.name}
        onChange={(event) => setItem({ ...item, name: event.target.value })}
        placeholder='Name'
      />

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
