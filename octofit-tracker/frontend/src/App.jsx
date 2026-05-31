import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const routes = [
  {
    path: '/users',
    label: 'Users',
    description: 'Profiles, roles, and fitness levels across the app.',
    element: <Users />,
  },
  {
    path: '/teams',
    label: 'Teams',
    description: 'Team rosters, descriptions, and participation counts.',
    element: <Teams />,
  },
  {
    path: '/activities',
    label: 'Activities',
    description: 'Logged workouts, duration, calories, and distance.',
    element: <Activities />,
  },
  {
    path: '/leaderboard',
    label: 'Leaderboard',
    description: 'Competitive rankings, points, and active periods.',
    element: <Leaderboard />,
  },
  {
    path: '/workouts',
    label: 'Workouts',
    description: 'Suggested routines tailored to each fitness level.',
    element: <Workouts />,
  },
]

function App() {
  return (
    <div className="app-shell">
      <header className="hero-panel">
        <div className="hero-copy">
          <div className="eyebrow">OctoFit Tracker</div>
          <h1>Presentation tier for your fitness data, teams, and suggestions.</h1>
          <p className="hero-text">
            React Router drives the navigation while each view reads from the backend API
            using a Codespaces-aware base URL with a local-safe fallback.
          </p>
        </div>
        <div className="hero-card" aria-hidden="true">
          <img src={logo} alt="" className="hero-logo" />
        </div>
      </header>

      <nav className="route-nav" aria-label="OctoFit sections">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            className={({ isActive }) => (isActive ? 'route-link active' : 'route-link')}
            to={route.path}
          >
            <span>{route.label}</span>
            <small>{route.description}</small>
          </NavLink>
        ))}
      </nav>

      <main className="content-panel">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </div>
  )
}

export default App
