const FormRows = ({defaultValue,name,type,labelText}) => {
  return (
   
    <div className='form-row'>
    <label htmlFor={name} className="form-label"> 
    {name || labelText}
    </label>

    <input 
     type={type}
     id={name}
     name={name}
     className='form-input'
     default={defaultValue}
     required 
     />
    </div>


  )
}

export default FormRows