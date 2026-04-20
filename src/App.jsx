import React, { useState } from 'react'
import Nav from './components/Nav.jsx'
import Dashboard from './components/Dashboard.jsx'
import Traduction from './components/Traduction.jsx'
import Profils from './components/Profils.jsx'

const couple = {
  personA: {
    name: 'Élise',
    initial: 'É',
    profile: 'Verbale-affective',
  },
  personB: {
    name: 'Marc',
    initial: 'M',
    profile: 'Analytique-séquentielle',
  },
}

export default function App() {
  const [page, setPage] = useState('dashboard')

  const screens = {
    dashboard: <Dashboard couple={couple} onNavigate={setPage} />,
    traduction: <Traduction couple={couple} />,
    profils: <Profils couple={couple} />,
  }

  return (
    <>
      <Nav current={page} onNavigate={setPage} couple={couple} />
      <div style={{ paddingTop: '56px' }}>
        {screens[page]}
      </div>
    </>
  )
}
