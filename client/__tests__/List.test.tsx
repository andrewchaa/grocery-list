import * as React from 'react'
import { render, screen } from '@testing-library/react'
import List from '../src/components/List'

describe('List', () => {
  const milk = 'Milk'
  const eggs = 'Eggs'
  const items = [
    { name: milk, done: false },
    { name: eggs, done: true },
  ]

  it('renders a list of items', () => {
    render(<List items={items} toggle={jest.fn()} />)

    expect(screen.getByText(milk)).toBeTruthy()
    expect(screen.getByRole('checkbox', { name: milk })).not.toBeChecked()

    expect(screen.getByText(eggs)).toBeTruthy()
    expect(screen.getByRole('checkbox', { name: eggs })).toBeChecked()
  })
})
