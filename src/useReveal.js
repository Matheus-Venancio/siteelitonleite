import { useEffect } from 'react'

/**
 * Anima elementos com a classe .reveal quando entram na tela.
 * Usa checagem por posicao (scroll/resize) com rAF — funciona em
 * qualquer navegador e nunca deixa conteudo preso em opacity:0.
 */
export default function useReveal() {
  useEffect(() => {
    const semSuporte =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const checar = () => {
      const alvos = document.querySelectorAll('.reveal:not(.is-visible)')
      if (!alvos.length) return
      const limite = window.innerHeight - 60
      alvos.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < limite && r.bottom > 0) el.classList.add('is-visible')
      })
    }

    const agendar = checar

    if (semSuporte) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
      return
    }

    checar()
    window.addEventListener('scroll', agendar, { passive: true })
    window.addEventListener('resize', agendar)
    window.addEventListener('load', agendar)

    // Recheca apos o carregamento das fontes/imagens, que mudam a altura da pagina.
    const recheck = setTimeout(checar, 1200)

    return () => {
      clearTimeout(recheck)
      window.removeEventListener('scroll', agendar)
      window.removeEventListener('resize', agendar)
      window.removeEventListener('load', agendar)
    }
  }, [])
}
