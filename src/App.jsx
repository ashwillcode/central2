import { Routes, Route } from 'react-router-dom'
import { SubjectColorProvider } from './context/SubjectColorContext'
import AppLayout from './components/AppLayout'
import Home from './pages/Home'
import StudyGroup from './pages/StudyGroup'
import Learning from './pages/Learning'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import './App.css'

function App() {
  return (
    <div className="app">
      <SubjectColorProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/study" element={<StudyGroup />} />
          <Route path="/learn" element={<Learning />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
        </Route>
      </Routes>
      </SubjectColorProvider>
    </div>
  )
}

export default App
