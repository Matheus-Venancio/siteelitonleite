import SmartImage from './SmartImage'
import BandeiraBrasil from './BandeiraBrasil'
import { Check, Arrow, Whats } from './Icons'
import { CANDIDATO, FOTOS } from '../site.config'

const RESUMO = [
  'Segurança pública',
  'Liberdade econômica',
  'Família',
  'Oposição ao PT'
]

export default function Hero({ zapLink }) {
  return (
    <section className="hero" id="topo">
      {/* Bandeira do Brasil balançando ao fundo, coberta por uma camada verde */}
      <div className="hero__flag-wrap" aria-hidden="true">
        <div className="hero__flag-inner">
          <BandeiraBrasil className="hero__flag" />
        </div>
        <div className="hero__folds hero__folds--a" />
        <div className="hero__folds hero__folds--b" />
      </div>
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__conteudo">
          <span className="hero__badge">
            {CANDIDATO.cargo} · {CANDIDATO.estado} <b>{CANDIDATO.numero}</b>
          </span>

          <h1 className="hero__title">
            <small>{CANDIDATO.slogan}</small>
            Eliton
            <span>Leite</span>
          </h1>

          <p className="hero__text">
            São Paulo precisa de representantes que não recuem. Firmeza contra o crime,
            respeito a quem trabalha e defesa da família brasileira, sem meio-termo,
            sem acordo por debaixo da mesa.
          </p>

          <div className="hero__actions">
            <a href="#bandeiras" className="btn btn--amarelo">
              Conheça as bandeiras <Arrow />
            </a>
            <a href={zapLink} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              <Whats /> Falar no WhatsApp
            </a>
          </div>

          <ul className="hero__flags">
            {RESUMO.map((t) => (
              <li key={t}><Check /> {t}</li>
            ))}
          </ul>
        </div>

        <div className="hero__media">
          <div className="hero__photo-wrap">
            <SmartImage
              src={FOTOS.hero.src}
              className={FOTOS.hero.recorte ? 'foto--recorte' : 'foto--cheia'}
              alt={`${CANDIDATO.nome}, candidato a ${CANDIDATO.cargo} por ${CANDIDATO.estado}`}
              fetchpriority="high"
              loading="eager"
              fallback={
                <div className="hero__photo-fallback">
                  Adicione a foto em<br />/public/assets/foto-hero.png
                </div>
              }
            />
          </div>
          <div className="hero__numero" aria-hidden="true">
            <small>Digite</small>
            <strong>{CANDIDATO.numero}</strong>
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Role</span>
        <i />
      </div>
    </section>
  )
}
