import { render, screen, waitFor } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import Add from '../components/Add'
import userEvent from '@testing-library/user-event'
import { ADD } from "../gqls"

describe('Add', () => {
  const user = userEvent.setup()
  const item = 'Milk'

  const responseData = {
    addGroceryItem: {
      name: item,
      done: false
    }
  }

  it('renders an input and a button', () => {
    const mocks = [
      {
        request: {
          query: ADD,
          variables: { name: item }
        },
        result: { data: responseData },
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Add />
      </MockedProvider>)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls addGroceryItem mutation when the button is clicked', async () => {
    const newDataMock = jest.fn()
    newDataMock.mockReturnValue({ data: responseData })

    const mocks = [
      {
        request: {
          query: ADD,
          variables: { name: item }
        },
        newData: newDataMock,
      }]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Add />
      </MockedProvider >)

    await user.type(screen.getByRole('textbox'), item)
    await user.click(screen.getByRole('button'))

    expect(newDataMock).toHaveBeenCalled()
  })

  it('clears the input when the button is clicked', async () => {
    const mocks = [
      {
        request: {
          query: ADD,
          variables: { name: item }
        },
        result: { data: responseData },
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Add />
      </MockedProvider>
    )

    await user.type(screen.getByRole('textbox'), item)
    await user.click(screen.getByRole('button'))

    await waitFor(() => expect(screen.getByRole('textbox')).toHaveValue(''))
  })

  it('does not call mutation when the button is clicked but the item is empty', async () => {
    const newDataMock = jest.fn()
    newDataMock.mockReturnValue({ data: responseData })

    const mocks = [
      {
        request: {
          query: ADD,
          variables: { name: item }
        },
        newData: newDataMock,
      }]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Add />
      </MockedProvider>
    )

    await user.click(screen.getByRole('button'))

    expect(newDataMock).not.toHaveBeenCalled()
  })

  it('displays an error message when the item is empty', async () => {
    const newDataMock = jest.fn()
    newDataMock.mockReturnValue({ data: responseData })

    const mocks = [
      {
        request: {
          query: ADD,
          variables: { name: item }
        },
        newData: newDataMock,
      }]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Add />
      </MockedProvider>
    )

    await user.click(screen.getByRole('button'))

    expect(screen.getByText('Item name is required')).toBeInTheDocument()
    expect(screen.getByTitle('Error')).toBeInTheDocument()
  })
})
