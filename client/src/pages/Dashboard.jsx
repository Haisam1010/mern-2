import {Outlet} from 'react-router-dom'
import Wrapper from "../wrappers/DashBoard"
import { SmallSideBar,BigSideBar,NavBar } from '../components'
import { createContext, useContext, useState } from 'react'

const DashBoardContext = createContext()

const defaultDarkTheme = () => {
  const isDarkTheme = localStorage.getItem('dark-theme') === 'true'
  document.body.classList.toggle('dark-theme',isDarkTheme)
  return isDarkTheme
}

const Dashboard = ({isDarkThemeEnabled}) => {

  const user = ['mohamed']

  const [showSidebar,setShowSidebar] = useState(false)
  const [isDarkTheme,setIsDarkTheme] = useState(isDarkThemeEnabled)

  const toggleDarkTheme = () => {
    const newDarktheme = !isDarkTheme
    setIsDarkTheme(newDarktheme)
    document.body.classList.toggle('dark-theme',newDarktheme)
  }

  const toggleSidebar = () => { 
    setShowSidebar(!showSidebar)
    console.log('toggle')
  }


  const logoutUser = async () => {
    console.log('logout user')
  }

  return( 
    <DashBoardContext.Provider value={{user,showSidebar,isDarkTheme,toggleSidebar,toggleDarkTheme,logoutUser}}>
       <Wrapper>
  <main className='dashboard'>
    <SmallSideBar />
    <BigSideBar />

    <div>
      <NavBar />
      <div className='dashboard-page'>
        <Outlet />
      </div>
    </div>
  </main>

  </Wrapper>
    </DashBoardContext.Provider>
 )
}
export  const useDashBoardContext = () => useContext(DashBoardContext)
export default Dashboard
