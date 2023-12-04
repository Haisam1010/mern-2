import { FaTimes } from "react-icons/fa"
import Wrapper from "../wrappers/SmallSideBar"
import Logo from "./Logo"
import { useDashBoardContext } from "../pages/Dashboard"
import NavLinks from "./NavLinks"

const SmallSideBar = () => {
  const {showSidebar,toggleSidebar} = useDashBoardContext()

  return (
    <Wrapper>
    
    <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}  >
          <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
        <NavLinks />
        </div>
    </div>
    </Wrapper>
  )
}

export default SmallSideBar