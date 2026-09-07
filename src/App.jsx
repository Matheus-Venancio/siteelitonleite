import Header from './components/Header'
import Hero from './components/Hero'
import {
  Faixa, Sobre, Bandeiras, Numero, Propostas, Galeria, ChamadaMoldura, Redes, CTA, Footer, BotaoZap
} from './components/Secoes'
import LinksPage from './components/LinksPage'
import MolduraPage from './components/MolduraPage'
import useReveal from './useReveal'
import { CONTATO } from './site.config'

export default function App() {
  useReveal()

  // A pagina de links abre de dois jeitos:
  //  1) pelo caminho  /links  no dominio principal
  //  2) pela raiz de qualquer subdominio que comece com "links." —
  //     ex.: links.elitonleite.com.br (basta apontar o subdominio
  //     para este mesmo projeto na Vercel, sem configurar mais nada)
  const rota = window.location.pathname.replace(/\/+$/, '').toLowerCase()
  const host = window.location.hostname.toLowerCase()
  if (rota === '/links' || host.startsWith('links.')) return <LinksPage />
  if (rota === '/moldura' || host.startsWith('moldura.')) return <MolduraPage />

  const zapLink =
    `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(CONTATO.mensagemWhatsapp)}`

  return (
    <>
      <Header zapLink={zapLink} />
      <main>
        <Hero zapLink={zapLink} />
        <Faixa />
        <Sobre />
        <Bandeiras />
        <Numero />
        <Propostas />
        <Galeria />
        <ChamadaMoldura />
        <Redes />
        <CTA zapLink={zapLink} />
      </main>
      <Footer zapLink={zapLink} />
      <BotaoZap zapLink={zapLink} />
    </>
  )
}
