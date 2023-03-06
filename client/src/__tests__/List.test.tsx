import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'
import List from '../components/List'
import { GET, UPDATE } from '../gqls'

describe('List', () => {
  const milk = 'Milk'
  const eggs = 'Eggs'
  const items = [
    { name: milk, done: false },
    { name: eggs, done: true },
  ]

  it('renders a list of items', () => {
    const mocks = [
      {
        request: {
          query: GET,
        },
        result: { data: items },
      }
    ]
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <List items={items} />
      </MockedProvider>
    )

    expect(screen.getByText(milk)).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: milk })).not.toBeChecked()

    expect(screen.getByText(eggs)).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: eggs })).toBeChecked()
    expect(screen.getByText(eggs)).toHaveClass('line-through')
  })

  it('calls toggle when an item is clicked', async () => {
    const updateMock = jest.fn()
    updateMock.mockReturnValue({
      "updateGroceryItem": {
        "name": milk,
        "done": true
      }
    })

    const mocks = [{
      request: {
        query: GET,
      },
      result: { data: items },
    }, {
      request: {
        query: UPDATE,
        variables: { name: milk, done: true },
      },
      newData: updateMock,
    }]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <List items={items} />
      </MockedProvider>
    )

    screen.getByRole('checkbox', { name: milk }).click()

    expect(updateMock).toHaveBeenCalledWith()
  })
})
