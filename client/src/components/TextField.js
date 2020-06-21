import React from 'react'
import './TextField.css'

export const TextField = ({
  label = false,
  name,
  ...other
}) => (
  <>
    {label && <label htmlFor={name}>{label}</label>}
    <div className={"TextField"}>
      <input type="text" id={name} {...other} />
    </div>
  </>
  )

export default TextField