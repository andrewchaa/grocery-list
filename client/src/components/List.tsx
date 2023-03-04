import { GroceryItem } from "../types";

export default function List({
  items,
  toggle
}: {
  items: GroceryItem[],
  toggle: (name: string) => void
}): JSX.Element {

  const itemClassNames = (item: GroceryItem) => {
    const classNames = ['block', 'text-sm', 'font-medium']
    if (item.done) {
      classNames.push('line-through')
    }
    return classNames.join(' ')
  }

  return (
    <fieldset className="space-y-5">
      {items.map((item, itemIdx) => (
        <div key={item.name} className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id={`check-${item.name}`}
              aria-describedby="comments-description"
              name={item.name}
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              checked={item.done}
              onChange={() => toggle(item.name)}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor={`check-${item.name}`}
              className={itemClassNames(item)}>
              {item.name}
            </label>
          </div>
        </div>
      ))}
    </fieldset>
  )
}
