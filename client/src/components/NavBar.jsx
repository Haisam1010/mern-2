import Wrapper from "../wrappers/NavBar"
import {FaAlignLeft} from 'react-icons/fa'
import Logo from "./Logo"
import { useDashBoardContext } from "../pages/Dashboard"
import LogoutContainer from "./LogoutContainer"
import ThemeToggle from "./ThemeToggle"


const NavBar = () => {
  const {toggleSidebar} = useDashBoardContext()
  return (
    <Wrapper>
    <div className="nav-center">
      <button type="button" className="toggle-btn" onClick={toggleSidebar}>
        <FaAlignLeft />
      </button>

      <div>
        <Logo />
        <h4 className="logo-text">DashBoard</h4>
      </div>
      
      <div className="btn-container">
        <ThemeToggle />
        <LogoutContainer />
      </div>
    </div>
    </Wrapper>
  )
}

export default NavBar