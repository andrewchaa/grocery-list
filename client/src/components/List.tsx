import { GroceryItem } from "../types";

export default function List({
  items,
}: {
  items: GroceryItem[]
}): JSX.Element {

  const toggleDone = (name: string) => {
    console.log('toggleDone', name);
  }

  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.name}
          onClick={() => toggleDone(item.name)}
          style={{ textDecoration: item.done ? 'line-through' : 'none' }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
