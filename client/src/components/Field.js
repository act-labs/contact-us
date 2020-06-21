import React from 'react'
import "./Field.css"
import joi from '@hapi/joi'

export const joiValidator = (props) => {
  const v1 = props.number ? joi.number() : joi.string()
  const v2 = props.email ? v1.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }) : v1
  const v3 = props.required ? v2.required() : v2
  const v4 = props.min ? v3.min(props.min) : v3
  const v5 = props.max ? v4.max(props.max) : v4
  return v5
}

export const Field = ({
  errors,
  setValue,
  setValidation,
  label,
  name,
  children,
  ...other
}) => {

  setValidation(name, joiValidator(other))
  const onChange = (e) => {
    setValue(name, e.target.value)
  }

  const error = errors[name]
  const fieldProps = { label: other.required ? label + " *" : label, name, onChange }

  return (
    <div className={"Field"}>
      {children({ error, fieldProps })}
      {error && <span className="Form-error">{error}</span>}
    </div>
  )
}

export default Field