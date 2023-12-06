import {Outlet,redirect,useLoaderData,useNavigate} from 'react-router-dom'
import Wrapper from "../wrappers/DashBoard"
import { SmallSideBar,BigSideBar,NavBar } from '../components'
import { createContext, useContext, useState } from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const loader = async () => {
  try {
    const {data} = await customFetch.get('/users/currentuser')
    return data
  } catch (error) {
    return redirect('/')
  }
}
const DashBoardContext = createContext()

const defaultDarkTheme = () => {
  const isDarkTheme = localStorage.getItem('dark-theme') === 'true'
  document.body.classList.toggle('dark-theme',isDarkTheme)
  return isDarkTheme
}

const Dashboard = ({isDarkThemeEnabled}) => {

  const {user} = useLoaderData()
  const navigate = useNavigate()
  const [showSidebar,setShowSidebar] = useState(false)
  const [isDarkTheme,setIsDarkTheme] = useState(isDarkThemeEnabled)

  const toggleDarkTheme = () => {
    const newDarktheme = !isDarkTheme
    setIsDarkTheme(newDarktheme)
    document.body.classList.toggle('dark-theme',newDarktheme)
    localStorage.setItem('darkTheme',newDarktheme)
  }

  const toggleSidebar = () => { 
    setShowSidebar(!showSidebar)
    console.log('toggle')
  }

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
  };
  return( 
    <DashBoardContext.Provider value={{user,showSidebar,isDarkTheme,toggleSidebar,toggleDarkTheme,logoutUser}}>
       <Wrapper>
  <main className='dashboard'>
    <SmallSideBar />
    <BigSideBar />
    <div>
      <NavBar />
      <div className='dashboard-page'>
        <Outlet context={{user}}/> 
      </div>
    </div>
  </main>

  </Wrapper>
    </DashBoardContext.Provider>
 )
}
export  const useDashBoardContext = () => useContext(DashBoardContext)
export default Dashboard
