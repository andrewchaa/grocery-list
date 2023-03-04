import * as React from 'react'
import { render, screen } from '@testing-library/react'
import List from '../components/List'

describe('List', () => {
  const milk = 'Milk'
  const eggs = 'Eggs'
  const items = [
    { name: milk, done: false },
    { name: eggs, done: true },
  ]
  const toggle = jest.fn()

  it('renders a list of items', () => {
    render(<List items={items} toggle={toggle} />)

    expect(screen.getByText(milk)).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: milk })).not.toBeChecked()

    expect(screen.getByText(eggs)).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: eggs })).toBeChecked()
    expect(screen.getByText(eggs)).toHaveClass('line-through')
  })

  it('calls toggle when an item is clicked', () => {
    render(<List items={items} toggle={toggle} />)

    screen.getByRole('checkbox', { name: milk }).click()

    expect(toggle).toHaveBeenCalledWith(milk)
  })
})
