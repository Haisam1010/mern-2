import { useDashBoardContext } from '../pages/Dashboard'
import links from '../utils/link'
import  {NavLink} from 'react-router-dom'


const NavLinks = () => {

  const {toggleSidebar} = useDashBoardContext()
  return (
    <div className="nav-links">
    {links.map((link)=>{
      const {title,path,icon} = link
      return (
        <NavLink to={path} key={title} className='nav-link' onClick={toggleSidebar} >
            <span className="icon">
            {icon}
            </span>
            {title}
        </NavLink>
      )
    })}
  </div>
  )
}

export default NavLinks