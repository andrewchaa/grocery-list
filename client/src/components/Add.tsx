import { useState } from "react";
import { GroceryItem } from "../types";
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

export default function Add({
  addToItems
}: {
  addToItems: (item: GroceryItem) => void
}): JSX.Element {
  const [item, setItem] = useState<GroceryItem>({
    name: '',
    done: false,
  });

  const handleAdd = () => {
    addToItems(item);
  };

  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
          placeholder="you@example.com"
          defaultValue="adamwathan"
          aria-invalid="true"
          aria-describedby="email-error"
          onChange={(event) => setItem({ ...item, name: event.target.value })}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-2 text-sm text-red-600" id="email-error">
        Your password must be less than 4 characters.
      </p>

      <div className="mt-5">
        <button
          onClick={handleAdd}
          type="button"
          className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add
        </button>
      </div>
    </div>
  );
}
