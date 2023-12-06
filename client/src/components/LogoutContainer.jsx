import { useState } from "react"
import { useDashBoardContext } from "../pages/Dashboard"
import Wrapper from "../wrappers/LogOutContainer"
import { FaUserCircle,FaCaretDown,FaAlignLeft } from "react-icons/fa"



const LogoutContainer = () => {
    const [showLogout,setLogout] = useState(false)
    const {logoutUser,user} = useDashBoardContext()
  return (
    <Wrapper>
      <button type="button" className='btn logout-btn' onClick={() => setLogout(!showLogout)}>
        <FaUserCircle />
        {user.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown':'dropdown'}>
        <button type="button" className='dropdown-btn' onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  )
}

export default LogoutContainer