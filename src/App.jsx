import Header from './components/Header'
import Hero from './components/Hero'
import {
  Faixa, Sobre, Bandeiras, Numero, Propostas, Galeria, Redes, CTA, Footer, BotaoZap
} from './components/Secoes'
import useReveal from './useReveal'
import { CONTATO } from './site.config'

export default function App() {
  useReveal()

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
        <Redes />
        <CTA zapLink={zapLink} />
      </main>
      <Footer zapLink={zapLink} />
      <BotaoZap zapLink={zapLink} />
    </>
  )
}
