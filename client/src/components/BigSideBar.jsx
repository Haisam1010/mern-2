import { useDashBoardContext } from "../pages/Dashboard"
import Wrapper from "../wrappers/BigSideBar"
import Logo from "./Logo"
import NavLinks from "./NavLinks"


const BigSideBar = () => {
  const {showSidebar} = useDashBoardContext()
  return (
    <Wrapper>
    <div
      className={ showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
      }
    >
      <div className='content'>
        <header>
          <Logo />
        </header>
        <NavLinks />
      </div>
    </div>
  </Wrapper>
  )
}

export default BigSideBar
