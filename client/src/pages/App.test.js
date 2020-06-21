import React from 'react'
import { render, waitForElement, fireEvent, act } from '@testing-library/react'
import App from './App'

const mockFetch = (response) => {
  const mockResponseData = response

  const mockJsonPromise = Promise.resolve(mockResponseData)
  const mockResponsePromise = Promise.resolve({
    ok: true,
    json: () => mockJsonPromise,
  })

  jest.spyOn(global, 'fetch').mockImplementation(() => mockResponsePromise)
}

describe("user opens contact us", () => {
  it('API is active', async () => {
    await act(async () => {
      mockFetch({
        message: 'API Active'
      })

      const { getByText } = render(<App />)

      await waitForElement(() => getByText(/API Active/i))
      expect(global.fetch.mock.calls.length).toBe(1)
      global.fetch.mockRestore()
    })
  })

  it('API failure', async () => {
    await act(async () => {
      jest.spyOn(global, 'fetch').mockImplementation(() => { throw new Error("Some error") })
      const { getByText } = render(<App />)

      await waitForElement(() => getByText(/Error: Some error/i))
      expect(global.fetch.mock.calls.length).toBe(1)
      global.fetch.mockRestore()
    })
  })
})

describe("form validation errors", () => {
  it('empty', () => {

    const { getByText, getAllByText } = render(<App />)

    fireEvent.click(getByText(/Submit/i))
    const errors = getAllByText(/required/i)
    expect(errors.length).toBe(3)
  })

  it('wrong email', () => {

    const { getByText, getAllByText, getByLabelText } = render(<App />)

    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'email' } })
    fireEvent.click(getByText(/Submit/i))

    expect(getAllByText(/required/i).length).toBe(2)
    expect(getAllByText(/valid email/i).length).toBe(1)
  })

})


describe("sending data to server", () => {
  it('success', async () => {
    await act(async () => {
      mockFetch({
        message: 'Success'
      })

      const { getByText, getByLabelText } = render(<App />)
      await waitForElement(() => getByText(/Success/i))
      global.fetch.mockClear()

      fireEvent.change(getByLabelText(/First/i), { target: { value: 'name' } })
      fireEvent.change(getByLabelText(/Email/i), { target: { value: 'email@email.com' } })
      fireEvent.change(getByLabelText(/Message/i), { target: { value: 'message' } })
      fireEvent.change(getByLabelText(/Last/i), { target: { value: 'surname' } })
      fireEvent.change(getByLabelText(/Phone/i), { target: { value: 'phone' } })
      fireEvent.change(getByLabelText(/Address/i), { target: { value: 'address' } })

      fireEvent.click(getByText(/Submit/i))

      await waitForElement(() => getByText(/Success/i))

      expect(global.fetch.mock.calls.length).toBe(1)
      expect(global.fetch.mock.calls[0][0]).toEqual(expect.stringContaining("/contacts"))
      const request = global.fetch.mock.calls[0][1]
      expect(request.method).toBe('POST')
      expect(JSON.parse(request.body)).toEqual({
        "first_name": "name",
        "email": "email@email.com",
        "message": "message",
        "last_name": "surname",
        "phone": "phone",
        "address": "address"
      })

      global.fetch.mockRestore()
    })
  })
})

