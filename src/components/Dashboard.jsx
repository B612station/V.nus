import React from 'react'

const sessions = [
  { id: 14, date: 'Hier', title: 'La discussion de jeudi soir sur les vacances d\'été', tag: 'Décalage rythme/charge', from: 'É', to: 'M', color: 'A' },
  { id: 13, date: '13 avril', title: 'Le dîner avec ses parents', tag: 'Besoin de cadre vs spontanéité', from: 'M', to: 'É', color: 'B' },
  { id: 12, date: '9 avril', title: 'Quand tu pars sans dire au revoir', tag: 'Geste vs intention', from: 'É', to: 'M', color: 'A' },
  { id: 11, date: '5 avril', title: 'La répartition des tâches le week-end', tag: 'Contrat implicite asymétrique', from: 'M', to: 'É', color: 'B' },
]

function Avatar({ letter, type, size = 28 }) {
  const styles = {
    A: { bg: '#2A4830', border: '#3A6040', color: '#90C898' },
    B: { bg: '#243040', border: '#344858', color: '#80B0C8' },
  }
  const s = styles[type]
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: s.bg, border: `1px solid ${s.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.4, fontWeight: 700, color: s.color,
      fontFamily: 'var(--font-sans)', flexShrink: 0,
    }}>
      {letter}
    </div>
  )
}

export default function Dashboard({ couple, onNavigate }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream-soft)' }}>

      {/* Hero — Sapin block, 2 colonnes */}
      <div style={{
        background: 'var(--sapin)',
        padding: '36px 48px 48px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative rings */}
        <div style={{
          position: 'absolute', right: '-40px', top: '-40px',
          width: '280px', height: '280px', borderRadius: '50%',
          border: '0.5px solid rgba(255,255,255,0.06)',
        }} />
        <div style={{
          position: 'absolute', right: '60px', top: '30px',
          width: '160px', height: '160px', borderRadius: '50%',
          border: '0.5px solid rgba(255,255,255,0.05)',
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px', position: 'relative', alignItems: 'start' }}>

          {/* Colonne gauche : texte */}
          <div>
            <p className="fade-up" style={{
              fontFamily: 'var(--font-sans)', fontSize: '11px',
              color: 'var(--sapin-mist)', letterSpacing: '0.2em',
              textTransform: 'uppercase', marginBottom: '16px',
            }}>
              Session 14 · {couple.personA.name} & {couple.personB.name}
            </p>

            <h1 className="fade-up delay-1" style={{
              fontFamily: 'var(--font-serif)', fontSize: '52px',
              color: 'var(--cream)', lineHeight: 1.1, fontWeight: 400,
              marginBottom: '8px',
            }}>
              Vous ne parlez pas<br />
              la même langue.
            </h1>
            <h1 className="fade-up delay-2" style={{
              fontFamily: 'var(--font-serif)', fontSize: '52px',
              color: 'var(--sapin-mist)', lineHeight: 1.1, fontWeight: 400,
              fontStyle: 'italic', marginBottom: '24px',
            }}>
              Pourtant vous parlez.
            </h1>

            <p className="fade-up delay-3" style={{
              fontFamily: 'var(--font-sans)', fontSize: '15px',
              color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: '32px',
              maxWidth: '420px',
            }}>
              Vnus écoute chacun séparément, apprend votre fonctionnement,
              et traduit ce que l'autre ne reçoit pas. Pas un coach. Un pont.
            </p>

            <div className="fade-up delay-4" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                onClick={() => onNavigate('traduction')}
                style={{
                  background: 'var(--cream)', color: 'var(--sapin)',
                  fontFamily: 'var(--font-sans)', fontSize: '12px',
                  fontWeight: 600, letterSpacing: '0.08em',
                  padding: '12px 24px', borderRadius: 'var(--radius-xs)',
                  border: 'none', cursor: 'pointer',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.target.style.opacity = '0.85'}
                onMouseLeave={e => e.target.style.opacity = '1'}
              >
                Reprendre la traduction
              </button>
              <button
                onClick={() => onNavigate('traduction')}
                style={{
                  background: 'transparent',
                  border: '0.5px solid var(--border-dark)',
                  color: 'var(--ink-muted)',
                  fontFamily: 'var(--font-sans)', fontSize: '12px',
                  padding: '12px 20px', borderRadius: 'var(--radius-xs)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.target.style.borderColor = 'var(--sapin-mist)'; e.target.style.color = 'var(--cream)' }}
                onMouseLeave={e => { e.target.style.borderColor = 'var(--border-dark)'; e.target.style.color = 'var(--ink-muted)' }}
              >
                Nouvelle conversation
              </button>
            </div>
          </div>

          {/* Colonne droite : État du lien + Ce que Vnus a remarqué */}
          <div className="fade-up delay-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* État du lien */}
            <div style={{
              background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius)', padding: '18px',
            }}>
              <p style={{ fontSize: '9px', color: 'var(--sapin-mist)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '14px' }}>
                État du lien
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ textAlign: 'center' }}>
                  <Avatar letter="É" type="A" size={36} />
                  <div style={{ fontSize: '11px', color: 'var(--cream)', marginTop: '6px', fontWeight: 500 }}>{couple.personA.name}</div>
                  <div style={{ fontSize: '9px', color: 'var(--ink-muted)', marginTop: '2px' }}>Verbale-affective</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '24px', height: '0.5px', background: 'var(--sapin-mist)' }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--sapin-mist)', animation: 'pulse 2s infinite' }} />
                  <div style={{ width: '24px', height: '0.5px', background: 'var(--sapin-mist)' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Avatar letter="M" type="B" size={36} />
                  <div style={{ fontSize: '11px', color: 'var(--cream)', marginTop: '6px', fontWeight: 500 }}>{couple.personB.name}</div>
                  <div style={{ fontSize: '9px', color: 'var(--ink-muted)', marginTop: '2px' }}>Analytique-séq.</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', borderTop: '0.5px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--cream)', lineHeight: 1 }}>
                    74<span style={{ fontSize: '12px', color: 'var(--sapin-mist)' }}>%</span>
                  </div>
                  <div style={{ fontSize: '9px', color: 'var(--ink-muted)', marginTop: '2px' }}>Compréhension</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--cream)', lineHeight: 1 }}>14</div>
                  <div style={{ fontSize: '9px', color: 'var(--ink-muted)', marginTop: '2px' }}>Sessions · 7 ans</div>
                </div>
              </div>
            </div>

            {/* Ce que Vnus a remarqué */}
            <div style={{
              background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius)', padding: '18px',
            }}>
              <p style={{ fontSize: '9px', color: 'var(--sapin-mist)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Ce que Vnus a remarqué
              </p>
              {[
                { title: 'Asymétrie de rythme', body: 'Élise traite en 3-5s, Marc en 30-90s.', score: 86 },
                { title: 'Vocabulaire affectif divergent', body: '« On verra » = neutre pour Marc, négatif pour Élise.', score: 71 },
              ].map((insight, i) => (
                <div key={i} style={{ marginBottom: i === 0 ? '12px' : 0, paddingBottom: i === 0 ? '12px' : 0, borderBottom: i === 0 ? '0.5px solid rgba(255,255,255,0.08)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--cream)' }}>{insight.title}</span>
                    <span style={{ fontSize: '11px', color: 'var(--sapin-mist)', fontFamily: 'var(--font-serif)' }}>{insight.score}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--ink-muted)', lineHeight: 1.5 }}>{insight.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats band */}
      <div style={{
        background: 'var(--white)',
        borderBottom: '0.5px solid var(--border)',
        display: 'flex', padding: '0 48px',
      }}>
        {[
          { n: '74', unit: '%', label: 'Compréhension mutuelle' },
          { n: '14', unit: '', label: 'Sessions · 7 ans' },
          { n: '3', unit: '', label: 'Marqueurs actifs' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: '20px 48px 20px 0',
            borderRight: i < 2 ? '0.5px solid var(--border)' : 'none',
            marginRight: i < 2 ? '48px' : 0,
          }}>
            <div style={{
              fontFamily: 'var(--font-serif)', fontSize: '32px',
              color: 'var(--ink)', lineHeight: 1,
            }}>
              {s.n}<span style={{ fontSize: '16px', color: 'var(--sapin-mid)' }}>{s.unit}</span>
            </div>
            <div style={{
              fontFamily: 'var(--font-sans)', fontSize: '11px',
              color: 'var(--ink-faint)', marginTop: '4px', letterSpacing: '0.04em',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Body — Sessions pleine largeur, titre centré */}
      <div style={{ padding: '48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: '32px',
            color: 'var(--ink)', fontWeight: 400, display: 'inline',
          }}>
            Tout ce qui a été <em style={{ fontStyle: 'italic', color: 'var(--sapin-mid)' }}>traduit.</em>
          </h2>
          <span style={{ display: 'block', fontSize: '11px', color: 'var(--sapin-mid)', letterSpacing: '0.06em', cursor: 'pointer', marginTop: '6px' }}>
            Tout voir →
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {sessions.map((s, i) => (
            <div
              key={s.id}
              className={`fade-up delay-${i + 1}`}
              onClick={() => onNavigate('traduction')}
              style={{
                background: 'var(--white)',
                border: '0.5px solid var(--border)',
                borderRadius: i === 0 ? 'var(--radius) var(--radius) 0 0' :
                  i === sessions.length - 1 ? '0 0 var(--radius) var(--radius)' : '0',
                borderTop: i > 0 ? 'none' : '0.5px solid var(--border)',
                padding: '18px 24px',
                display: 'flex', alignItems: 'center', gap: '16px',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--cream-soft)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}
            >
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: '11px',
                color: 'var(--ink-faint)', minWidth: '64px',
              }}>
                <div>{s.date}</div>
                <div style={{ color: 'var(--border)', marginTop: '2px' }}>SES.{s.id}</div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-serif)', fontSize: '15px',
                  color: 'var(--ink)', fontStyle: 'italic', marginBottom: '3px',
                }}>
                  « {s.title} »
                </div>
                <div style={{ fontSize: '11px', color: 'var(--sapin-mid)', letterSpacing: '0.04em' }}>
                  {s.tag}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Avatar letter={s.from} type={s.from === 'É' ? 'A' : 'B'} size={24} />
                <span style={{ fontSize: '10px', color: 'var(--border)' }}>→</span>
                <Avatar letter={s.to} type={s.to === 'É' ? 'A' : 'B'} size={24} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
