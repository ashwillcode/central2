import { useLocation, Outlet } from 'react-router-dom'
import LeftNav from './LeftNav'
import './LeftNav.css'
import './AppLayout.css'

function AppLayout() {
  const location = useLocation()
  const isDashboard = location.pathname === '/'

  return (
    <div className="app-layout">
      <LeftNav />
      <div className={`app-layout__content ${isDashboard ? 'app-layout__content--dashboard' : ''}`}>
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
