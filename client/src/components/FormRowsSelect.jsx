/* eslint-disable react/prop-types */
import React from 'react'

const FormRowsSelect = ({name,labelText,list,defaultValue=''}) => {
  return (
    <div className='form-row'>
    <label htmlFor='jobStatus' className='form-label'>
    {labelText || name}
    </label>
    <select name={name} id={name} className='form-select' defaultValue={defaultValue}>
    {list.map((itemValues)=>{
    return (
      <option value={itemValues} key={itemValues}>{itemValues}</option>
    ) 
    })}
    </select>
    </div>
  )
}

export default FormRowsSelect