import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar"><NavLink className="brand" to="/">OCTOFIT <span>TRACKER</span></NavLink><nav aria-label="Main navigation">{[['/activities', 'Activities'], ['/teams', 'Teams'], ['/leaderboard', 'Leaderboard'], ['/users', 'Members'], ['/workouts', 'Workouts']].map(([path, label]) => <NavLink key={path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={path}>{label}</NavLink>)}</nav></header>
      <main className="container page-content"><Routes><Route path="/" element={<Activities />} /><Route path="/activities" element={<Activities />} /><Route path="/teams" element={<Teams />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main>
    </div>
  )
}

export default App
