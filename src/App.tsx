import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './pages/Dashboard'
import { Spaces } from './pages/Spaces'
import { SpaceDetail } from './pages/SpaceDetail'
import { Storage } from './pages/Storage'
import { Schedule } from './pages/Schedule'
import { Posts } from './pages/Posts'
import { Workflow } from './pages/Workflow'

function App() {
  return (
    <BrowserRouter basename="/kitakanto-kankyo-portal">
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#f8faf9] p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/spaces" element={<Spaces />} />
            <Route path="/spaces/:id" element={<SpaceDetail />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/workflow" element={<Workflow />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
