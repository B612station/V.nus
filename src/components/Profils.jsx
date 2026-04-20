import React, { useState } from 'react'

function Avatar({ letter, type, size = 48 }) {
  const styles = {
    A: { bg: '#2A4830', border: '#3A6040', color: '#90C898' },
    B: { bg: '#243040', border: '#344858', color: '#80B0C8' },
  }
  const s = styles[type]
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: s.bg, border: `1.5px solid ${s.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 700, color: s.color,
      fontFamily: 'var(--font-sans)', flexShrink: 0,
    }}>
      {letter}
    </div>
  )
}

function TraitRow({ label, value }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
      <div style={{ fontSize: '10px', color: 'var(--ink-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', paddingTop: '2px' }}>
        {label}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 500 }}>
        {value}
      </div>
    </div>
  )
}

function ListBlock({ title, items, color }) {
  return (
    <div style={{ marginTop: '16px' }}>
      <p style={{ fontSize: '10px', color: color || 'var(--ink-faint)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
        {title}
      </p>
      {items.map((item, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'flex-start', gap: '8px',
          marginBottom: '6px', fontSize: '12px', color: 'var(--ink-mid)', lineHeight: 1.5,
        }}>
          <span style={{ color: color || 'var(--sapin-mid)', marginTop: '2px', flexShrink: 0 }}>—</span>
          {item}
        </div>
      ))}
    </div>
  )
}

export default function Profils({ couple }) {
  const [activeTab, setActiveTab] = useState('A')

  const profiles = {
    A: {
      name: couple.personA.name,
      initial: couple.personA.initial,
      type: 'A',
      style: 'Verbale-affective',
      age: '34 ans',
      summary: `${couple.personA.name} pense en racontant. Une question directe sans préambule lui semble froide ou accusatoire. Elle a besoin d'un espace narratif pour arriver à l'essentiel.`,
      traits: [
        { label: 'Traitement', value: 'Associatif & narratif' },
        { label: 'Conflit', value: 'Évitement → décharge' },
        { label: 'Besoin tacite', value: 'Sécurité émotionnelle' },
        { label: 'Charge cognitive', value: 'Externalisée par la parole' },
      ],
      declencheurs: ['Silence prolongé', 'Phrases courtes sans contexte', 'Décisions unilatérales'],
      passerelles: ['Reformulation', 'Récit avant solution', 'Validation préalable'],
      accent: '#90C898',
      accentFaint: '#DFF0E3',
    },
    B: {
      name: couple.personB.name,
      initial: couple.personB.initial,
      type: 'B',
      style: 'Analytique-séquentielle',
      age: '36 ans',
      summary: `${couple.personB.name} traite en silence avant de répondre. Son retrait n'est pas un rejet mais une condition de pensée. Le pousser à répondre vite court-circuite son traitement.`,
      traits: [
        { label: 'Traitement', value: 'Linéaire & convergent' },
        { label: 'Conflit', value: 'Retrait → analyse' },
        { label: 'Besoin tacite', value: 'Clarté & structure' },
        { label: 'Charge cognitive', value: 'Traitée en silence' },
      ],
      declencheurs: ['Superposition de sujets', 'Urgence émotionnelle', 'Manque de cadre'],
      passerelles: ['Donner un délai explicite', 'Une question à la fois', 'Conclure avant d\'ouvrir'],
      accent: '#80B0C8',
      accentFaint: '#E4EAF5',
    },
  }

  const p = profiles[activeTab]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream-soft)', paddingTop: '56px' }}>

      {/* Header */}
      <div style={{
        background: 'var(--sapin)', padding: '28px 48px 0',
        borderBottom: '0.5px solid var(--border-dark)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '10px', color: 'var(--sapin-mist)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Profils cognitifs
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: '38px',
            color: 'var(--cream)', fontWeight: 400, marginBottom: '24px',
          }}>
            Ce que Vnus a <em style={{ fontStyle: 'italic', color: 'var(--sapin-mist)' }}>compris</em> de chacun.
          </h1>

          {/* Tab switcher */}
          <div style={{ display: 'flex', gap: '0' }}>
            {['A', 'B'].map(side => {
              const pr = profiles[side]
              const isActive = activeTab === side
              return (
                <button
                  key={side}
                  onClick={() => setActiveTab(side)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '12px 24px',
                    background: isActive ? 'var(--white)' : 'transparent',
                    border: 'none',
                    borderTop: isActive ? `2px solid ${pr.accent}` : '2px solid transparent',
                    color: isActive ? 'var(--ink)' : 'var(--ink-muted)',
                    fontFamily: 'var(--font-sans)', fontSize: '13px',
                    cursor: 'pointer', transition: 'all 0.2s',
                    borderRadius: isActive ? 'var(--radius-sm) var(--radius-sm) 0 0' : '0',
                  }}
                >
                  <Avatar letter={pr.initial} type={side} size={24} />
                  {pr.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Profile content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 48px' }}>
        <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Left card */}
          <div style={{
            background: 'var(--white)', border: '0.5px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '28px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <Avatar letter={p.initial} type={activeTab} size={52} />
              <div>
                <div style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', color: 'var(--ink)', fontWeight: 400 }}>
                  {p.name}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--ink-faint)', marginTop: '2px' }}>
                  {p.style} · {p.age}
                </div>
              </div>
              <div style={{
                marginLeft: 'auto', fontSize: '10px',
                color: 'var(--ink-faint)', background: 'var(--cream-soft)',
                padding: '4px 10px', borderRadius: '20px',
                border: '0.5px solid var(--border)',
              }}>
                Session privée
              </div>
            </div>

            <p style={{
              fontFamily: 'var(--font-serif)', fontSize: '15px',
              color: 'var(--ink-mid)', lineHeight: 1.7, fontStyle: 'italic',
              borderLeft: `2px solid ${p.accent}`, paddingLeft: '16px',
              marginBottom: '24px',
            }}>
              « {p.summary} »
            </p>

            <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '20px' }}>
              <p style={{ fontSize: '10px', color: 'var(--ink-faint)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>
                Traits cognitifs
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {p.traits.map(t => (
                  <div key={t.label} style={{
                    background: 'var(--cream-soft)', borderRadius: 'var(--radius-sm)',
                    padding: '10px 12px',
                  }}>
                    <div style={{ fontSize: '9px', color: 'var(--ink-faint)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {t.label}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 500 }}>
                      {t.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right card */}
          <div style={{
            background: 'var(--white)', border: '0.5px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '28px',
            display: 'flex', flexDirection: 'column', gap: '0',
          }}>
            <ListBlock title="Déclencheurs" items={p.declencheurs} color={p.accent} />
            <div style={{ borderTop: '0.5px solid var(--border)', margin: '16px 0' }} />
            <ListBlock title="Passerelles" items={p.passerelles} color={p.accent} />

            <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '0.5px solid var(--border)' }}>
              <p style={{ fontSize: '10px', color: 'var(--ink-faint)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
                Compatibilité avec {activeTab === 'A' ? couple.personB.name : couple.personA.name}
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                {[
                  { label: 'Compréhension', value: 74 },
                  { label: 'Rythme', value: 42 },
                  { label: 'Vocabulaire', value: 61 },
                ].map(m => (
                  <div key={m.label} style={{ flex: 1 }}>
                    <div style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', color: 'var(--ink)', lineHeight: 1 }}>
                      {m.value}<span style={{ fontSize: '12px', color: p.accent }}>%</span>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--ink-faint)', marginTop: '3px' }}>{m.label}</div>
                    <div style={{
                      height: '2px', background: 'var(--border)',
                      borderRadius: '1px', marginTop: '6px', overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%', width: `${m.value}%`,
                        background: p.accent, borderRadius: '1px',
                        transition: 'width 0.6s ease',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
