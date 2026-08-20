import { useState, useEffect } from 'react'
import SmartImage from './SmartImage'
import { Check, Arrow, Whats, iconMap } from './Icons'
import { CANDIDATO, CONTATO, REDES, BANDEIRAS, PROPOSTAS, GALERIA, FOTOS } from '../site.config'

/* ---------------------------------------------------------- FAIXA */
export function Faixa() {
  return (
    <div className="faixa" aria-hidden="true">
      <div className="faixa__track">
        {Array.from({ length: 8 }, (_, i) => <span key={i}>{CANDIDATO.slogan} · Eliton Leite {CANDIDATO.numero}</span>)}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------- SOBRE */
export function Sobre() {
  return (
    <section className="section" id="sobre">
      <div className="container sobre__grid">
        <div className="sobre__foto reveal">
          <SmartImage
            src={FOTOS.sobre.src}
            className={FOTOS.sobre.recorte ? 'foto--recorte' : 'foto--cheia'}
            alt={`${CANDIDATO.nome} em retrato oficial`}
            fallback={
              <div className="sobre__foto-fallback">
                /public/assets/foto-sobre.png
              </div>
            }
          />
        </div>

        <div className="sobre__texto reveal">
          <span className="eyebrow">O Candidato</span>
          <h2 className="h-sec">Um nome que não se dobra</h2>
          <p>
            Eliton Leite é candidato a <strong>{CANDIDATO.cargo}</strong> por {CANDIDATO.estado} com uma
            missão clara: levar a Brasília a voz de quem trabalha, paga imposto, cria os filhos com
            valor e está cansado de ver o país andar para trás.
          </p>
          <p>
            Não é político de gabinete. É gente que conhece a realidade do paulista — o comerciante que
            fecha as portas com medo, o pai de família que vê o salário encolher, o empreendedor
            sufocado pela burocracia. É por eles que a candidatura existe.
          </p>

          <blockquote className="sobre__quote">
            “{CANDIDATO.slogan}. Não é discurso, é compromisso.”
          </blockquote>

          <div className="sobre__stats">
            <div className="sobre__stat">
              <strong>{CANDIDATO.numero}</strong>
              <span>O número na urna</span>
            </div>
            <div className="sobre__stat">
              <strong>4</strong>
              <span>Bandeiras inegociáveis</span>
            </div>
            <div className="sobre__stat">
              <strong>SP</strong>
              <span>Todo o estado representado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------ BANDEIRAS */
export function Bandeiras() {
  return (
    <section className="section section--cinza" id="bandeiras">
      <div className="container">
        <div className="bandeiras__head reveal">
          <span className="eyebrow">Minhas bandeiras</span>
          <h2 className="h-sec">No que acredito</h2>
          <p className="lead">
            Quatro compromissos que não mudam conforme a conveniência política. É o que defendo em cada voto, em cada sessão, em cada comissão.
          </p>
        </div>

        <div className="bandeiras__grid">
          {BANDEIRAS.map((b, i) => (
            <article className="bandeira reveal" key={b.id} style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="bandeira__num" aria-hidden="true">0{i + 1}</span>
              <span className="bandeira__tag">{b.tag}</span>
              <h3>{b.titulo}</h3>
              <p>{b.texto}</p>
              <ul>
                {b.itens.map((it) => (
                  <li key={it}><Check /> {it}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------- NUMERO */
export function Numero() {
  const digitos = CANDIDATO.numero.split('')
  return (
    <section className="numero">
      <div className="container numero__inner">
        <div className="reveal">
          <span className="eyebrow on-dark">Na hora de votar</span>
          <h2>Deputado Federal<br />é {CANDIDATO.numero}</h2>
          <p>
            São quatro dígitos que decidem quem representa São Paulo em Brasília.
            Guarde o número, salve no celular e leve para a urna.
          </p>
          <a href="#bandeiras" className="btn btn--amarelo">
            Ver os compromissos <Arrow />
          </a>
        </div>

        <div className="urna reveal" aria-label={`Número ${CANDIDATO.numero} na urna`}>
          <div className="urna__label">Seu voto para {CANDIDATO.cargo}</div>
          <div className="urna__digits">
            {digitos.map((d, i) => <b key={i}>{d}</b>)}
          </div>
          <div className="urna__cargo">Eliton Leite</div>
          <div className="urna__conf">Aperte confirma</div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------ PROPOSTAS */
export function Propostas() {
  return (
    <section className="section section--azul" id="propostas">
      <div className="container">
        <div className="bandeiras__head reveal">
          <span className="eyebrow on-dark">Propostas</span>
          <h2 className="h-sec">O que vamos levar para Brasília</h2>
          <p className="lead on-dark">
            Pautas concretas, com endereço certo: mais segurança, menos imposto e mais liberdade
            para o cidadão de bem viver e trabalhar.
          </p>
        </div>

        <div className="propostas__grid">
          {PROPOSTAS.map((p, i) => {
            const Ic = iconMap[p.icone] || Check
            return (
              <article className="proposta reveal" key={p.titulo} style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="proposta__ic"><Ic /></div>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------- GALERIA */
export function Galeria() {
  // Confere quais arquivos existem ANTES de montar a secao — assim nao
  // aparece quadro vazio nem acontece salto de layout. Se nenhuma foto
  // estiver disponivel, a secao inteira nao e renderizada.
  const [disponiveis, setDisponiveis] = useState(null)

  useEffect(() => {
    if (!GALERIA.length) return setDisponiveis([])
    let vivo = true
    Promise.all(
      GALERIA.map((f) => new Promise((ok) => {
        const im = new Image()
        im.onload = () => ok(f)
        im.onerror = () => ok(null)
        im.src = f.src
      }))
    ).then((r) => { if (vivo) setDisponiveis(r.filter(Boolean)) })
    return () => { vivo = false }
  }, [])

  if (!disponiveis || !disponiveis.length) return null

  return (
    <section className="section" id="galeria">
      <div className="container">
        <div className="bandeiras__head reveal">
          <span className="eyebrow">Galeria</span>
          <h2 className="h-sec">De perto e de frente</h2>
          <p className="lead">Registros da caminhada e do trabalho junto de quem realmente importa: você.</p>
        </div>

        <div className="galeria__grid">
          {disponiveis.map((f, i) => (
            <figure className="galeria__item reveal" key={f.src} style={{ transitionDelay: `${i * 60}ms` }}>
              <SmartImage
                src={f.src}
                alt={f.alt}
                className={f.recorte ? 'foto--recorte' : 'foto--cheia'}
                fallback={null}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- REDES */
export function Redes() {
  return (
    <section className="section section--cinza" id="redes">
      <div className="container">
        <div className="bandeiras__head reveal">
          <span className="eyebrow">Redes sociais</span>
          <h2 className="h-sec">Siga e compartilhe</h2>
          <p className="lead">
            A campanha se faz no boca a boca. Siga, curta e mande para o grupo da família e do trabalho.
          </p>
        </div>

        <div className="redes__grid">
          {REDES.map((r, i) => {
            const Ic = iconMap[r.icone]
            return (
              <a
                className="rede reveal"
                key={r.nome}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="rede__ic"><Ic /></div>
                <strong>{r.nome}</strong>
                <span>Seguir</span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ CTA */
export function CTA({ zapLink }) {
  return (
    <section className="cta" id="apoiar">
      <div className="container cta__inner reveal">
        <h2>Coragem para <em>mudar o Brasil</em></h2>
        <p>
          Cada voto conta e cada apoiador multiplica. Entre no grupo, receba os materiais da campanha
          e ajude a levar Eliton Leite {CANDIDATO.numero} a Brasília.
        </p>
        <div className="cta__actions">
          <a href={zapLink} target="_blank" rel="noopener noreferrer" className="btn btn--amarelo">
            <Whats /> Quero apoiar
          </a>
          <a href="#bandeiras" className="btn btn--ghost">Conhecer as propostas</a>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------- FOOTER */
export function Footer({ zapLink }) {
  const ano = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <div className="footer__logo">
              <SmartImage
                src="/assets/logo-branco.png"
                alt={`${CANDIDATO.nome} ${CANDIDATO.numero}`}
                fallback={
                  <div className="footer__logo-fallback">Eliton Leite <b>{CANDIDATO.numero}</b></div>
                }
              />
            </div>
            <p>{CANDIDATO.cargo} · {CANDIDATO.estado} · {CANDIDATO.numero}</p>
            <p><strong>{CANDIDATO.slogan}</strong></p>
            <div className="footer__social">
              {REDES.map((r) => {
                const Ic = iconMap[r.icone]
                return (
                  <a key={r.nome} href={r.url} target="_blank" rel="noopener noreferrer" aria-label={r.nome}>
                    <Ic />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h4>Navegue</h4>
            <ul className="footer__links">
              <li><a href="#sobre">O Candidato</a></li>
              <li><a href="#bandeiras">Bandeiras</a></li>
              <li><a href="#propostas">Propostas</a></li>
              <li><a href="#galeria">Galeria</a></li>
              <li><a href="#redes">Redes sociais</a></li>
            </ul>
          </div>

          <div>
            <h4>Contato</h4>
            <ul className="footer__links">
              <li><a href={zapLink} target="_blank" rel="noopener noreferrer">WhatsApp da campanha</a></li>
              <li><a href={`mailto:${CONTATO.email}`}>{CONTATO.email}</a></li>
              <li>{CONTATO.cidade}</li>
            </ul>
          </div>
        </div>

        <div className="footer__legal">
          <span>© {ano} Eliton Leite {CANDIDATO.numero}. Todos os direitos reservados.</span>
          <span>
            {CANDIDATO.cnpj
              ? `Propaganda eleitoral · CNPJ ${CANDIDATO.cnpj}`
              : 'Propaganda eleitoral · informe o CNPJ de campanha em src/site.config.js'}
          </span>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------- BOTAO WHATSAPP */
export function BotaoZap({ zapLink }) {
  return (
    <a className="zap" href={zapLink} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
      <Whats />
    </a>
  )
}
