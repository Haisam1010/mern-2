import { Link, Form, redirect, useNavigate } from 'react-router-dom';
import Wrapper from '../wrappers/RegisterLogin'
import {Logo,FormRows} from '../components'
import customFetch from '../utils/customFetch'
import {toast} from 'react-toastify'

export const action = async ({request})=>{
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login Success')
    return redirect('/dashboard');
  } catch (error) {
   // toast.error(error?.response?.data?.message || 'Login Failed')
   error.msg = error?.response?.data?.message || 'Login Failed'
    console.log(error)
    return error
  }
}

const Login = () => {
  const navigate = useNavigate();
 const isSubmitting = navigate.state === 'submitting'

  return (
    <Wrapper>
    <Form method='post' className='form'>
    <Logo />
      <h4>
        Login
      </h4>
      <FormRows type='email' name='email' defaultValue='' />
      <FormRows type='password' name='password' defaultValue='' />

      <button type='submit' className='btn btn-block' disabled={isSubmitting} >
         {isSubmitting ? 'Loading...' : 'submit'}
      </button>
      <p>
      Not a Member ? <Link to="/register" className='member-btn'> Register </Link>
      </p>
     </Form>

    </Wrapper>

  )
}

export default Login
