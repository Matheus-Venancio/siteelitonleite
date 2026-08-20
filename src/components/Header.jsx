import { useEffect, useState } from 'react'
import SmartImage from './SmartImage'
import { CANDIDATO, GALERIA } from '../site.config'

const LINKS = [
  { href: '#sobre', label: 'O Candidato' },
  { href: '#bandeiras', label: 'Bandeiras' },
  { href: '#propostas', label: 'Propostas' },
  // so entra no menu quando houver fotos cadastradas em GALERIA
  ...(GALERIA.length ? [{ href: '#galeria', label: 'Galeria' }] : []),
  { href: '#redes', label: 'Redes' }
]

export default function Header({ zapLink }) {
  const [scrolled, setScrolled] = useState(false)
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [aberto])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : 'header--top'}`}>
      <div className="container header__inner">
        <a href="#topo" className="header__logo" aria-label={`${CANDIDATO.nome} ${CANDIDATO.numero}`}>
          <SmartImage
            src="/assets/logo-branco.png"
            alt={`${CANDIDATO.nome} ${CANDIDATO.numero}`}
            fallback={
              <span className="header__logo-fallback">
                Eliton Leite <b>{CANDIDATO.numero}</b>
              </span>
            }
          />
        </a>

        <button
          className={`burger ${aberto ? 'is-open' : ''}`}
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
          onClick={() => setAberto((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <nav className={`nav ${aberto ? 'is-open' : ''}`}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setAberto(false)}>{l.label}</a>
          ))}
          <a
            href={zapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--amarelo header__cta"
            onClick={() => setAberto(false)}
          >
            Quero apoiar
          </a>
        </nav>
      </div>
    </header>
  )
}
