import { useState, useEffect } from "react"
import { GroceryItem } from "../types"
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

export default function Add({
  addToItems
}: {
  addToItems: (item: GroceryItem) => void
}): JSX.Element {
  const [item, setItem] = useState<GroceryItem>({ name: '', done: false })
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    setErrorMessage('')
  }, [item])

  const handleAdd = () => {
    if (item.name === '') {
      setErrorMessage('The item cannot be empty.')
      return
    }

    addToItems(item)
  }

  const textBoxclassNames = errorMessage
    ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
    : 'border-gray-300 pr-10 text-gray-900 placeholder-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'

  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700">
        Item
      </label>
      <div className="relative mt-1 rounded-md shadow-sm w-80">
        <input
          type="text"
          name="item"
          id="item"
          className={`block rounded-md w-full ${textBoxclassNames}`}
          placeholder="2 packs of eggs"
          aria-invalid="true"
          aria-describedby="email-error"
          onFocus={() => setErrorMessage('')}
          onChange={(e) => {
            setItem({ ...item, name: e.target.value })
          }}
        />
        {errorMessage && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              title="Error"
              className="h-5 w-5 text-red-500" aria-hidden="true"
            />
          </div>
        )}
      </div>
      <p className="mt-2 text-sm text-red-600" id="email-error">
        {errorMessage}
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
  )
}
