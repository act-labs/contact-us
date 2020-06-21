import React from 'react'
import './Textarea.css'

export const Textarea = ({
  label = false,
  name,
  ...other
}) => (
  <>
    {label && <label htmlFor={name}>{label}</label>}
    <div className={"Textarea"}>
      <textarea id={name} rows={5} {...other} />
    </div>
  </>
  )

export default Textarea