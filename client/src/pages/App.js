import React, { useState, useEffect, useRef } from "react"
import { Form, TextField, Field, Textarea } from "../components"

import "./App.css"
export const WAIT_MESSAGE = "Wait..."
const App = () => {
  const counter = useRef(0)
  const [last, setLast] = useState(WAIT_MESSAGE)

  const nextRequest = async (request) => {
    const current = ++counter.current
    setLast(WAIT_MESSAGE)
    let message
    try {
      const res = await request()
      const data = (res.ok && await res.json()) || { message: `Error code ${res.status}: ${res.statusText}` }
      message = data.message
    } catch (e) {
      message = String(e)
    }

    if (current !== counter.current) {
      return
    }
    setLast(message)
  }

  useEffect(() => {
    nextRequest(() => fetch("http://localhost:8080/"))
    return () => counter.current = Infinity
  }, [])

  const onSubmit = async (value) => {
    await nextRequest(() => fetch("http://localhost:8080/contacts", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    }))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Contact Us</h1>
        <p>{last}</p>

        <Form onSubmit={onSubmit}>
          <Field label={"First name"} name="first_name" required>{({ fieldProps }) => <TextField {...fieldProps} />}</Field>
          <Field label={"Last name"} name="last_name">{({ fieldProps }) => <TextField {...fieldProps} />}</Field>
          <Field label={"Address"} name="address" >{({ fieldProps }) => <TextField {...fieldProps} />}</Field>
          <Field label={"Phone"} name="phone">{({ fieldProps }) => <TextField {...fieldProps} />}</Field>
          <Field label={"Email"} name="email" required email>{({ fieldProps }) => <TextField {...fieldProps} />}</Field>
          <Field label={"Message"} name="message" required>{({ fieldProps }) => <Textarea {...fieldProps} />}</Field>
          <input type="submit" value="Submit" />
        </Form>
      </header>
    </div>
  )
}

export default App
