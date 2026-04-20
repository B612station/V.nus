import React from 'react'

const navItems = [
  { id: 'dashboard', label: 'Accueil' },
  { id: 'traduction', label: 'Traduire' },
  { id: 'profils', label: 'Profils' },
]

export default function Nav({ current, onNavigate, couple }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'var(--sapin)',
      borderBottom: '0.5px solid var(--border-dark)',
      padding: '0 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '56px',
    }}>
      {/* Logo */}
      <div
        onClick={() => onNavigate('dashboard')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: '2px' }}
      >
        <span style={{
          fontFamily: 'var(--font-serif)', fontSize: '22px',
          color: 'var(--cream)', fontWeight: 400, letterSpacing: '0.04em',
        }}>
          V<em style={{ fontStyle: 'italic', color: 'var(--sapin-mist)' }}>·</em>nus
        </span>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              fontFamily: 'var(--font-sans)', fontSize: '12px',
              letterSpacing: '0.08em', fontWeight: current === item.id ? 500 : 400,
              color: current === item.id ? 'var(--cream)' : 'var(--ink-muted)',
              borderBottom: current === item.id ? '1px solid var(--sapin-mist)' : '1px solid transparent',
              paddingBottom: '2px',
              transition: 'color 0.2s, border-color 0.2s',
              background: 'none', cursor: 'pointer',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Couple avatars */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: '#2A4830', border: '1px solid #3A6040',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', fontWeight: 600, color: '#90C898',
          fontFamily: 'var(--font-sans)',
        }}>
          {couple.personA.initial}
        </div>
        <span style={{ fontSize: '10px', color: 'var(--ink-muted)' }}>·</span>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: '#243040', border: '1px solid #344858',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', fontWeight: 600, color: '#80B0C8',
          fontFamily: 'var(--font-sans)',
        }}>
          {couple.personB.initial}
        </div>
      </div>
    </nav>
  )
}
