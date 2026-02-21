import { Outlet } from 'react-router-dom'
import LeftNav from './LeftNav'
import './LeftNav.css'
import './AppLayout.css'

function AppLayout() {
  return (
    <div className="app-layout">
      <LeftNav />
      <main className="app-layout__content">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
