import React, { useState, useRef, useEffect } from 'react'
import { sendMessage } from '../ai/provider.js'

function Avatar({ letter, type, size = 32 }) {
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
      fontSize: size * 0.38, fontWeight: 700, color: s.color,
      fontFamily: 'var(--font-sans)', flexShrink: 0,
    }}>
      {letter}
    </div>
  )
}

const STEPS = ['Vnus écoute', 'Analyse cognitive', 'Traduction', 'Réponse']

const SAMPLE_MARKERS = [
  { n: '01', phrase: '« comme d\'habitude »', desc: 'Marqueur de répétition perçue — pattern, pas incident isolé' },
  { n: '02', phrase: '« trois mois »', desc: 'Investissement émotionnel signalé en amont' },
  { n: '03', phrase: '« je ne sais même pas »', desc: 'Demande implicite de clarté, pas de décision' },
]

export default function Traduction({ couple }) {
  const [activeStep, setActiveStep] = useState(0)
  const [activeSide, setActiveSide] = useState('A')
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [translation, setTranslation] = useState(null)
  const [error, setError] = useState(null)
  const textareaRef = useRef(null)

  const currentPerson = activeSide === 'A' ? couple.personA : couple.personB
  const otherPerson = activeSide === 'A' ? couple.personB : couple.personA
  const otherType = activeSide === 'A' ? 'B' : 'A'

  async function handleTranslate() {
    if (!inputText.trim() || loading) return
    setLoading(true)
    setError(null)
    setActiveStep(1)

    const userMsg = {
      role: 'user',
      content: `${currentPerson.name} dit à ${otherPerson.name} : "${inputText.trim()}"
      
Profil de ${currentPerson.name} : ${currentPerson.profile}
Profil de ${otherPerson.name} : ${otherPerson.profile}

Fais la traduction cognitive complète.`,
    }

    const newMessages = [...messages, userMsg]
    setMessages(newMessages)

    try {
      setTimeout(() => setActiveStep(2), 800)
      const response = await sendMessage(newMessages)
      setTimeout(() => setActiveStep(3), 200)
      setTranslation(response)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch (err) {
      setError(err.message)
      setActiveStep(0)
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setInputText('')
    setTranslation(null)
    setActiveStep(0)
    setError(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream-soft)', paddingTop: '56px' }}>

      {/* Header */}
      <div style={{
        background: 'var(--sapin)', padding: '28px 48px 24px',
        borderBottom: '0.5px solid var(--border-dark)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '10px', color: 'var(--sapin-mist)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Session 14 · {couple.personA.name} & {couple.personB.name}
              </p>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--cream)', fontWeight: 400 }}>
                « La discussion de jeudi soir »
              </h2>
            </div>

            {/* Switch side */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {['A', 'B'].map(side => {
                const p = side === 'A' ? couple.personA : couple.personB
                const isActive = activeSide === side
                return (
                  <button
                    key={side}
                    onClick={() => { setActiveSide(side); handleReset() }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '8px 14px', borderRadius: 'var(--radius-sm)',
                      background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                      border: isActive ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                      color: isActive ? 'var(--cream)' : 'var(--ink-muted)',
                      fontSize: '12px', fontFamily: 'var(--font-sans)',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                  >
                    <Avatar letter={p.initial} type={side} size={22} />
                    {p.name} → {side === 'A' ? couple.personB.name : couple.personA.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', gap: '0', marginTop: '20px' }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '7px 16px',
                  background: i === activeStep ? 'rgba(255,255,255,0.12)' : 'transparent',
                  borderRadius: 'var(--radius-xs)',
                  border: i === activeStep ? '0.5px solid rgba(255,255,255,0.2)' : '0.5px solid transparent',
                  transition: 'all 0.3s',
                }}>
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: i < activeStep ? 'var(--sapin-mist)' : i === activeStep ? 'var(--cream)' : 'transparent',
                    border: `1px solid ${i <= activeStep ? 'var(--sapin-mist)' : 'var(--border-dark)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '9px', fontWeight: 700,
                    color: i < activeStep ? 'var(--sapin)' : i === activeStep ? 'var(--sapin)' : 'var(--border-dark)',
                    transition: 'all 0.3s',
                  }}>
                    {i < activeStep ? '✓' : i + 1}
                  </div>
                  <span style={{
                    fontSize: '11px', letterSpacing: '0.06em',
                    color: i === activeStep ? 'var(--cream)' : i < activeStep ? 'var(--sapin-mist)' : 'var(--border-dark)',
                    transition: 'color 0.3s',
                  }}>
                    {step}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: '20px', height: '0.5px', background: 'var(--border-dark)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        {/* Left: input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            background: 'var(--white)', border: '0.5px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Avatar letter={currentPerson.initial} type={activeSide} size={32} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink)' }}>{currentPerson.name} parle</div>
                <div style={{ fontSize: '10px', color: 'var(--ink-faint)' }}>{currentPerson.profile} · session privée</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--sapin-mid)', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: '10px', color: 'var(--sapin-mid)' }}>enregistré</span>
              </div>
            </div>

            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={`${currentPerson.name} → Continue à raconter, Vnus écoute…`}
              disabled={loading}
              style={{
                width: '100%', minHeight: '160px',
                fontFamily: 'var(--font-serif)', fontSize: '16px',
                color: 'var(--ink)', lineHeight: 1.7,
                border: 'none', outline: 'none', resize: 'none',
                background: 'transparent',
                opacity: loading ? 0.5 : 1,
              }}
              onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleTranslate() }}
            />

            {/* Markers preview */}
            {inputText.length > 20 && (
              <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '12px', marginTop: '8px' }}>
                <p style={{ fontSize: '10px', color: 'var(--ink-faint)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Marqueurs cognitifs détectés
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Pattern répétition', 'Charge émotionnelle'].map(m => (
                    <span key={m} style={{
                      fontSize: '10px', color: 'var(--sapin-mid)',
                      background: 'var(--sapin-fog)',
                      padding: '3px 8px', borderRadius: '20px',
                    }}>{m}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleTranslate}
              disabled={!inputText.trim() || loading}
              style={{
                flex: 1, background: loading ? 'var(--sapin-mid)' : 'var(--sapin)',
                color: 'var(--cream)', fontFamily: 'var(--font-sans)',
                fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em',
                padding: '12px', borderRadius: 'var(--radius-xs)',
                border: 'none', cursor: inputText.trim() && !loading ? 'pointer' : 'not-allowed',
                opacity: !inputText.trim() ? 0.5 : 1,
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Vnus analyse…' : 'Traduire →'}
            </button>
            {translation && (
              <button
                onClick={handleReset}
                style={{
                  padding: '12px 16px', borderRadius: 'var(--radius-xs)',
                  border: '0.5px solid var(--border)',
                  color: 'var(--ink-faint)', fontSize: '12px',
                  background: 'transparent', cursor: 'pointer',
                }}
              >
                Effacer
              </button>
            )}
          </div>

          {error && (
            <div style={{
              background: '#FFF0F0', border: '0.5px solid #FFCCCC',
              borderRadius: 'var(--radius-sm)', padding: '12px 16px',
              fontSize: '12px', color: '#CC4444',
            }}>
              {error}
            </div>
          )}

          {/* Cognitive markers */}
          {translation && (
            <div className="fade-in">
              <p style={{ fontSize: '10px', color: 'var(--ink-faint)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Marqueurs cognitifs · {SAMPLE_MARKERS.length}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {SAMPLE_MARKERS.map(m => (
                  <div key={m.n} style={{
                    background: 'var(--white)', border: '0.5px solid var(--border)',
                    borderRadius: 'var(--radius-sm)', padding: '12px 14px',
                  }}>
                    <div style={{ fontSize: '9px', color: 'var(--ink-faint)', letterSpacing: '0.1em', marginBottom: '4px' }}>
                      MARQUEUR {m.n}
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', color: 'var(--ink)', marginBottom: '3px' }}>
                      {m.phrase}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--ink-faint)', lineHeight: 1.4 }}>
                      {m.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: translation output */}
        <div>
          {!translation && !loading && (
            <div style={{
              background: 'var(--white)', border: '0.5px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '32px',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', minHeight: '240px', textAlign: 'center',
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'var(--sapin-fog)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
              }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--sapin-mid)' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'var(--ink)', fontStyle: 'italic', marginBottom: '8px' }}>
                Vnus attend votre message.
              </p>
              <p style={{ fontSize: '12px', color: 'var(--ink-faint)', lineHeight: 1.6 }}>
                Écrivez ce que {currentPerson.name} ressent ou veut dire.<br />
                Vnus traduira pour {otherPerson.name}.
              </p>
            </div>
          )}

          {loading && (
            <div style={{
              background: 'var(--sapin)', border: '0.5px solid var(--border-dark)',
              borderRadius: 'var(--radius)', padding: '28px',
              minHeight: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <p style={{ fontSize: '10px', color: 'var(--sapin-mist)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Pour {otherPerson.name}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[80, 60, 90, 50].map((w, i) => (
                  <div key={i} style={{
                    height: '10px', borderRadius: '5px',
                    background: 'rgba(168, 208, 160, 0.15)',
                    width: `${w}%`,
                    animation: `pulse 1.5s ease ${i * 0.15}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}

          {translation && (
            <div className="fade-in" style={{
              background: 'var(--sapin)', border: '0.5px solid var(--border-dark)',
              borderRadius: 'var(--radius)', padding: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Avatar letter={otherPerson.initial} type={otherType} size={32} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--cream)' }}>Pour {otherPerson.name}</div>
                  <div style={{ fontSize: '10px', color: 'var(--ink-muted)' }}>traduit vers : {otherPerson.profile}</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: '9px', color: 'var(--ink-muted)', letterSpacing: '0.08em' }}>
                  VERSION PARTAGEABLE
                </div>
              </div>

              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: '15px',
                color: 'var(--cream)', lineHeight: 1.75,
                whiteSpace: 'pre-wrap',
              }}>
                {translation}
              </div>

              {/* Mot passerelle */}
              <div style={{
                marginTop: '20px', padding: '14px',
                background: 'rgba(168,208,160,0.08)',
                border: '0.5px solid rgba(168,208,160,0.2)',
                borderRadius: 'var(--radius-sm)',
              }}>
                <div style={{ fontSize: '9px', color: 'var(--sapin-mist)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Mot pour passer la passerelle
                </div>
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '13px', color: 'var(--cream)', lineHeight: 1.6 }}>
                  « J'ai envie d'y réfléchir sérieusement. Je te dis avant dimanche. » suffit — pas une réponse, un cadre.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button style={{
                  flex: 1, background: 'var(--cream)', color: 'var(--sapin)',
                  fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
                  padding: '10px', borderRadius: 'var(--radius-xs)', border: 'none', cursor: 'pointer',
                }}>
                  Envoyer à {otherPerson.name}
                </button>
                <button style={{
                  padding: '10px 14px',
                  border: '0.5px solid var(--border-dark)',
                  color: 'var(--ink-muted)', fontSize: '11px',
                  background: 'transparent', borderRadius: 'var(--radius-xs)', cursor: 'pointer',
                }}>
                  Reformuler
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
