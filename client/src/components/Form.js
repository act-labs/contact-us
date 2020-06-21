import React, { useState, useRef } from 'react'
import './Form.css'

import Field from './Field'
import joi from '@hapi/joi'

export const Form = ({ onSubmit, children }) => {
  const validation = useRef({})
  const values = useRef({})
  const [errors, setErrors] = useState({})

  const setValidation = (name, validator) => {
    validation.current = { ...validation.current, [name]: validator }
  }

  const setValue = (name, value) => {
    values.current = { ...values.current, [name]: value }
  }

  const handleSubmit = event => {
    event.preventDefault()

    const errors = Object.entries(validation.current).reduce((errors, [name, validator]) => {
      const schema = joi.object({ [name]: validator })
      const { error } = schema.validate({ [name]: values.current[name] })
      if (error) {
        errors[name] = error.message
      }
      return errors
    }, {})

    setErrors(errors)

    if (Object.keys(errors).length) {
      return
    }

    const schema = joi.object(validation.current)
    const {value} = schema.validate(values.current)
    if(onSubmit) {
      onSubmit(value)
    }
  }

  const augmented = React.Children.map(children, child => {
    if (child.type === Field) {
      return React.cloneElement(child, { setValidation, setValue, errors })
    }
    return child
  })


  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        {augmented}
      </form>
    </div>
  )
}

export default Form