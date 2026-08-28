import { useState, useEffect } from 'react'
import { CANDIDATO, CONTATO, LEGAL, REDES, PAGINA_LINKS } from '../site.config'
import { iconMap, Whats, Globe } from './Icons'

function Avatar() {
  const [erro, setErro] = useState(false)
  const iniciais = CANDIDATO.nome.split(' ').slice(0, 2).map((p) => p[0]).join('')

  if (erro || !PAGINA_LINKS.avatar) {
    return <div className="links-avatar links-avatar--sem-foto">{iniciais}</div>
  }
  return (
    <img
      className="links-avatar"
      src={PAGINA_LINKS.avatar}
      alt={CANDIDATO.nome}
      onError={() => setErro(true)}
    />
  )
}

/** Monta a lista de botoes a partir de PAGINA_LINKS.ordem + REDES + CONTATO. */
function montarBotoes() {
  const zap = `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(CONTATO.mensagemWhatsapp)}`

  return PAGINA_LINKS.ordem
    .map((item) => {
      if (item === 'whatsapp') {
        return CONTATO.whatsapp ? { label: 'WhatsApp', Ico: Whats, url: zap, externo: true } : null
      }
      if (item === 'site') {
        return { label: 'Site oficial', Ico: Globe, url: '/', externo: false }
      }
      const rede = REDES.find((r) => r.nome === item)
      if (!rede || !rede.url?.trim()) return null
      return { label: rede.nome, Ico: iconMap[rede.icone] || Globe, url: rede.url, externo: true }
    })
    .filter(Boolean)
}

export default function LinksPage() {
  const botoes = montarBotoes()

  useEffect(() => {
    document.title = `${CANDIDATO.nome} ${CANDIDATO.numero} · Links`
  }, [])

  return (
    <div className="links-page">
      <main className="links-card">
        <Avatar />

        <h1 className="links-nome">
          {CANDIDATO.nome} <span className="links-numero">{CANDIDATO.numero}</span>
        </h1>
        <p className="links-sub">{PAGINA_LINKS.subtitulo}</p>

        <nav className="links-lista">
          {botoes.map((b) => (
            <a
              key={b.label}
              className="link-botao"
              href={b.url}
              {...(b.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="link-icone"><b.Ico /></span>
              <span className="link-label">{b.label}</span>
            </a>
          ))}
        </nav>

        <footer className="links-rodape">
          {CANDIDATO.nome} © {new Date().getFullYear()} · Todos os direitos reservados
          <span className="links-legal">
            Pago por {LEGAL.registro} — CNPJ {LEGAL.cnpj}
          </span>
        </footer>
      </main>
    </div>
  )
}
