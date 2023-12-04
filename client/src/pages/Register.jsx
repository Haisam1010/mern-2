/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import { Form,Link,redirect,useNavigation } from 'react-router-dom'
import Wrapper from '../wrappers/RegisterLogin'
import {Logo,FormRows} from '../components'
import customFetch from '../utils/customFetch'


export const action = async ({request})=>{
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    console.log(data)
    await customFetch.post('/auth/register',data)
    return redirect('/login')
  } catch (error) {
    console.log(error)
    return error
  }
}


const Register = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
      <Logo />
      <h4>Register</h4> 
       <FormRows type='text' name='name' defaultValue='' />
       <FormRows type='text' name='lastName' defaultValue='' />
       <FormRows type='text' name='location' defaultValue='' />
       <FormRows type='email' name='email' defaultValue='' />
       <FormRows type='password' name='password' defaultValue='' />
        <button type='submit' className='btn btn-block'>
          Register
        </button>

        <p>
            Already Member ? <Link to="/login" className='member-btn'> Login </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register
