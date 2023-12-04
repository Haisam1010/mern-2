import { Link } from 'react-router-dom'
import Wrapper from '../wrappers/RegisterLogin'
import {Logo,FormRows} from '../components'


const Login = () => {
  return (
    <Wrapper>
    <div className='form'>
    <Logo />
      <h4>
        Login
      </h4>

      <FormRows type='email' name='Email' defaultValue='' />
      <FormRows type='password' name='Password' defaultValue='' />

      <button type='submit' className='btn btn-block'>
          Login
      </button>
      <p>
      Not a Member ? <Link to="/register" className='member-btn'> Register </Link>
      </p>
     </div>

    </Wrapper>

  )
}

export default Login
