import { useState } from "react"
import { useMutation } from "@apollo/client"
import { GroceryItem } from "../types"
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { ADD, GET } from "../gqls"

export default function Add(): JSX.Element {

  const [item, setItem] = useState<GroceryItem>({ name: '', done: false })
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [addGroceryItem, { data, loading, error }] = useMutation(
    ADD, {
    refetchQueries: [
      { query: GET },
    ]
  })

  if (loading) return <p>Submitting...</p>
  if (error) {
    setErrorMessage(error.message)
  }

  const textBoxclassNames = errorMessage
    ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
    : 'border-gray-300 pr-10 text-gray-900 placeholder-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'

  return (
    <div>
      <form name="Add" onSubmit={e => {
        e.preventDefault()
        if (!item.name) {
          setErrorMessage('Item name is required')
          return
        }

        addGroceryItem({ variables: { name: item.name } })
        setItem({ name: '', done: false })
      }}>
        <label
          htmlFor="item"
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
            value={item.name}
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
            type="submit"
            className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  )
}
