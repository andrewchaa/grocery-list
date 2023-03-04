import * as React from 'react'
import { render, screen } from "@testing-library/react"
import Add from '../components/Add'
import userEvent from '@testing-library/user-event'

describe('Add', () => {
  const user = userEvent.setup()
  const addToItems = jest.fn()
  const item = 'Milk'

  it('renders an input and a button', () => {
    render(<Add addToItems={addToItems} />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls addToItems when the button is clicked', async () => {
    render(<Add addToItems={addToItems} />)

    await user.type(screen.getByRole('textbox'), item)
    await user.click(screen.getByRole('button'))

    expect(addToItems).toHaveBeenCalledWith({ name: item, done: false })
  })

  it('does not call addToItems when the button is clicked but the item is empty', async () => {
    render(<Add addToItems={addToItems} />)

    await user.click(screen.getByRole('button'))

    expect(addToItems).not.toHaveBeenCalled()
  })

  it('displays an error message when the item is empty', async () => {
    render(<Add addToItems={addToItems} />)

    await user.click(screen.getByRole('button'))

    expect(screen.getByText('The item cannot be empty.')).toBeInTheDocument()
    expect(screen.getByTitle('Error')).toBeInTheDocument()
  })
})
