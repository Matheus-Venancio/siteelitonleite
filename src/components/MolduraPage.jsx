import { useEffect } from 'react'
import SmartImage from './SmartImage'
import GeradorMoldura from './GeradorMoldura'
import { iconMap, Whats } from './Icons'
import { CANDIDATO, CONTATO, LEGAL, REDES } from '../site.config'

const PASSOS = [
  'Escolha o modelo',
  'Coloque a sua foto',
  'Baixe e publique'
]

// Pagina dedicada: /moldura (tambem abre em moldura.<dominio>)
export default function MolduraPage() {
  useEffect(() => {
    document.title = `Tô com o ${CANDIDATO.nome} — monte a sua foto de apoio ${CANDIDATO.numero}`
  }, [])

  const zapLink =
    `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(CONTATO.mensagemWhatsapp)}`
  const redesAtivas = REDES.filter((r) => r.url && r.url.trim())

  return (
    <div className="pagina-moldura">
      <header className="header header--scrolled">
        <div className="container header__inner">
          <a href="/" className="header__logo" aria-label={`${CANDIDATO.nome} ${CANDIDATO.numero}`}>
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
          <a href="/" className="btn btn--ghost header__cta">Voltar ao site</a>
        </div>
      </header>

      <main className="section moldura__main">
        <div className="container">
          <div className="moldura__head">
            <span className="eyebrow">Campanha de apoio</span>
            <h1 className="h-sec moldura__titulo">
              Tô com o Eliton Leite {CANDIDATO.numero}
            </h1>
            <p className="lead moldura__lead">
              Mostre o seu apoio nas redes sociais. Escolha o modelo, coloque a sua
              foto, baixe e publique.
            </p>

            <ol className="moldura__passos">
              {PASSOS.map((p, i) => (
                <li key={p}><b>{i + 1}</b><span>{p}</span></li>
              ))}
            </ol>
          </div>

          <GeradorMoldura />

          <p className="moldura__privacidade">
            <strong>A sua privacidade em primeiro lugar.</strong> Nenhuma foto é
            enviada para a internet nem armazenada em qualquer servidor. Toda a
            montagem acontece dentro do seu próprio celular ou computador.
          </p>
        </div>
      </main>

      <footer className="footer moldura__rodape">
        <div className="container">
          {redesAtivas.length > 0 && (
            <div className="footer__social moldura__social">
              {redesAtivas.map((r) => {
                const Ic = iconMap[r.icone]
                return (
                  <a key={r.nome} href={r.url} target="_blank" rel="noopener noreferrer" aria-label={r.nome}>
                    <Ic />
                  </a>
                )
              })}
              <a href={zapLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da campanha">
                <Whats />
              </a>
            </div>
          )}
          <p className="moldura__legal">
            Pago por {LEGAL.registro} — CNPJ {LEGAL.cnpj}
          </p>
        </div>
      </footer>
    </div>
  )
}
