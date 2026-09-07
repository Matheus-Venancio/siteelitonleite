import { useCallback, useEffect, useRef, useState } from 'react'
import { CANDIDATO, MOLDURAS } from '../site.config'

// ============================================================
//  GERADOR DE MOLDURA DE APOIO
//  A montagem acontece 100% no aparelho do visitante: a foto
//  nunca sai do navegador — nao ha upload, servidor nem storage.
// ============================================================

const IconeFoto = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="6" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.9" />
    <circle cx="12" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.9" />
    <path d="M8.5 6l1.2-2h4.6L15.5 6" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
  </svg>
)

const IconeBaixar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const IconeCompartilhar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="18" cy="5" r="2.6" stroke="currentColor" strokeWidth="1.9" />
    <circle cx="6" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.9" />
    <circle cx="18" cy="19" r="2.6" stroke="currentColor" strokeWidth="1.9" />
    <path d="m8.4 10.8 7.2-4.2M8.4 13.2l7.2 4.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
  </svg>
)

/**
 * Faixa de emergencia: so entra em cena se o PNG oficial nao carregar,
 * para o material nunca sair sem a identificacao da campanha.
 */
function faixaDeEmergencia(ctx, w, h) {
  const banda = Math.round(h * (h > w ? 0.16 : 0.23))
  const baseY = h - banda

  const sombra = ctx.createLinearGradient(0, baseY - h * 0.08, 0, baseY)
  sombra.addColorStop(0, 'rgba(0,0,0,0)')
  sombra.addColorStop(1, 'rgba(0,0,0,0.3)')
  ctx.fillStyle = sombra
  ctx.fillRect(0, baseY - h * 0.08, w, h * 0.08)

  const g = ctx.createLinearGradient(0, baseY, w, h)
  g.addColorStop(0, '#012883')
  g.addColorStop(1, '#055f16')
  ctx.fillStyle = g
  ctx.fillRect(0, baseY, w, banda)

  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#ffffff'
  ctx.font = `800 ${Math.round(banda * 0.2)}px "Barlow Condensed", Impact, sans-serif`
  ctx.fillText(CANDIDATO.nome.toUpperCase(), w / 2, baseY + banda * 0.36)

  ctx.fillStyle = '#f7cf0d'
  ctx.font = `900 ${Math.round(banda * 0.42)}px "Barlow Condensed", Impact, sans-serif`
  ctx.fillText(CANDIDATO.numero, w / 2, baseY + banda * 0.78)
}

export default function GeradorMoldura() {
  const canvasRef = useRef(null)
  const arrastando = useRef(false)
  const ultimoPonto = useRef({ x: 0, y: 0 })
  const urlTemporaria = useRef(null)

  const [imagem, setImagem] = useState(null)
  const [arte, setArte] = useState(null)
  const [modelo, setModelo] = useState(MOLDURAS.modelos[0].id)
  const [formato, setFormato] = useState(MOLDURAS.modelos[0].formatos[0])
  const [zoom, setZoom] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [ocupado, setOcupado] = useState(false)
  const [erro, setErro] = useState('')

  const modeloAtual = MOLDURAS.modelos.find((m) => m.id === modelo) || MOLDURAS.modelos[0]
  const dim = MOLDURAS.formatos[formato] || MOLDURAS.formatos.post

  // Se o modelo escolhido nao tiver o formato atual, volta para o primeiro dele
  useEffect(() => {
    if (!modeloAtual.formatos.includes(formato)) setFormato(modeloAtual.formatos[0])
  }, [modeloAtual, formato])

  // Carrega a arte oficial do modelo/formato escolhido
  useEffect(() => {
    let valido = true
    const im = new Image()
    im.onload = () => { if (valido) setArte(im) }
    im.onerror = () => { if (valido) setArte(null) }
    im.src = `/moldura/${modelo}-${formato}.png`
    return () => { valido = false }
  }, [modelo, formato])

  /** Quanto a foto pode deslizar sem deixar vao vazio na arte. */
  const limites = useCallback(() => {
    if (!imagem) return { maxX: 0, maxY: 0, dw: 0, dh: 0 }
    const base = Math.max(dim.largura / imagem.width, dim.altura / imagem.height)
    const escala = base * zoom
    const dw = imagem.width * escala
    const dh = imagem.height * escala
    return {
      dw,
      dh,
      maxX: Math.max(0, (dw - dim.largura) / 2),
      maxY: Math.max(0, (dh - dim.altura) / 2)
    }
  }, [imagem, zoom, dim])

  const desenhar = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = dim.largura
    const h = dim.altura
    canvas.width = w
    canvas.height = h

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)

    if (imagem) {
      // "cover": a foto sempre preenche a arte inteira
      const { dw, dh, maxX, maxY } = limites()
      const x = Math.min(maxX, Math.max(-maxX, pos.x))
      const y = Math.min(maxY, Math.max(-maxY, pos.y))
      ctx.drawImage(imagem, (w - dw) / 2 + x, (h - dh) / 2 + y, dw, dh)
    } else {
      ctx.fillStyle = '#eef1f7'
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(1, 40, 131, 0.42)'
      ctx.textAlign = 'center'
      ctx.font = `600 ${Math.round(w * 0.04)}px Inter, system-ui, sans-serif`
      ctx.fillText('Escolha a sua foto', w / 2, h * 0.28)
    }

    // A arte e um ativo pronto: nunca reproduzir a identidade por codigo.
    if (arte) ctx.drawImage(arte, 0, 0, w, h)
    else faixaDeEmergencia(ctx, w, h)
  }, [imagem, arte, pos, dim, limites])

  // Espera as fontes carregarem, senao a faixa de emergencia sai com a fonte errada
  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(desenhar).catch(desenhar)
    } else {
      desenhar()
    }
  }, [desenhar])

  useEffect(() => () => {
    if (urlTemporaria.current) URL.revokeObjectURL(urlTemporaria.current)
  }, [])

  const escolherFoto = async (evento) => {
    const arquivo = evento.target.files && evento.target.files[0]
    if (!arquivo) return
    setOcupado(true)
    setErro('')
    try {
      let bitmap
      if ('createImageBitmap' in window) {
        // from-image respeita a orientacao EXIF: foto de celular nao sai deitada
        bitmap = await createImageBitmap(arquivo, { imageOrientation: 'from-image' })
      } else {
        if (urlTemporaria.current) URL.revokeObjectURL(urlTemporaria.current)
        urlTemporaria.current = URL.createObjectURL(arquivo)
        bitmap = await new Promise((ok, falha) => {
          const img = new Image()
          img.onload = () => ok(img)
          img.onerror = falha
          img.src = urlTemporaria.current
        })
      }
      setImagem(bitmap)
      setZoom(1)
      setPos({ x: 0, y: 0 })
    } catch {
      setErro('Não foi possível abrir essa imagem. Tente outra foto.')
    } finally {
      setOcupado(false)
      evento.target.value = ''
    }
  }

  const pontoDoEvento = (evento) => {
    const area = canvasRef.current.getBoundingClientRect()
    const escala = dim.largura / area.width
    return { x: (evento.clientX - area.left) * escala, y: (evento.clientY - area.top) * escala }
  }

  const aoPressionar = (evento) => {
    if (!imagem) return
    arrastando.current = true
    ultimoPonto.current = pontoDoEvento(evento)
    evento.currentTarget.setPointerCapture(evento.pointerId)
  }

  const aoMover = (evento) => {
    if (!arrastando.current) return
    const p = pontoDoEvento(evento)
    const dx = p.x - ultimoPonto.current.x
    const dy = p.y - ultimoPonto.current.y
    ultimoPonto.current = p
    const { maxX, maxY } = limites()
    // Trava o valor guardado (e nao so o desenho), senao fica uma zona morta
    // quando o dedo passa do limite e volta.
    setPos((v) => ({
      x: Math.min(maxX, Math.max(-maxX, v.x + dx)),
      y: Math.min(maxY, Math.max(-maxY, v.y + dy))
    }))
  }

  const aoSoltar = (evento) => {
    arrastando.current = false
    try {
      evento.currentTarget.releasePointerCapture(evento.pointerId)
    } catch {
      /* ponteiro ja liberado */
    }
  }

  const gerarBlob = () => new Promise((ok) => canvasRef.current.toBlob(ok, 'image/png'))

  const nomeArquivo = `apoio-eliton-leite-${CANDIDATO.numero}.png`

  const baixar = async () => {
    const blob = await gerarBlob()
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = nomeArquivo
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 1500)
  }

  const compartilhar = async () => {
    const blob = await gerarBlob()
    if (!blob) return
    const arquivo = new File([blob], nomeArquivo, { type: 'image/png' })
    if (navigator.canShare && navigator.canShare({ files: [arquivo] })) {
      try {
        await navigator.share({
          files: [arquivo],
          title: `${CANDIDATO.nome} ${CANDIDATO.numero}`,
          text: `Tô com o ${CANDIDATO.nome} — ${CANDIDATO.cargo} ${CANDIDATO.numero}. ${CANDIDATO.slogan}.`
        })
      } catch {
        /* o visitante cancelou: nao e erro */
      }
      return
    }
    // Desktop e navegadores sem Web Share: cai para o download
    baixar()
  }

  return (
    <div className="gerador">
      <div className="gerador__previa">
        <canvas
          ref={canvasRef}
          className={`gerador__tela${imagem ? ' gerador__tela--arrastavel' : ''}`}
          style={{ aspectRatio: `${dim.largura} / ${dim.altura}` }}
          onPointerDown={aoPressionar}
          onPointerMove={aoMover}
          onPointerUp={aoSoltar}
          onPointerCancel={aoSoltar}
          role="img"
          aria-label={`Prévia da moldura ${modeloAtual.nome} no formato ${dim.nome}`}
        />
        {imagem && <p className="gerador__dica">Arraste a foto para ajustar</p>}
      </div>

      <div className="gerador__controles">
        <div className="gerador__campo">
          <span className="gerador__rotulo">1. Escolha o modelo</span>
          <div className="gerador__opcoes" role="group" aria-label="Modelo da moldura">
            {MOLDURAS.modelos.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`gerador__chip${modelo === m.id ? ' gerador__chip--ativo' : ''}`}
                aria-pressed={modelo === m.id}
                onClick={() => setModelo(m.id)}
              >
                {m.nome}
              </button>
            ))}
          </div>
        </div>

        {modeloAtual.formatos.length > 1 && (
          <div className="gerador__campo">
            <span className="gerador__rotulo">2. Escolha o formato</span>
            <div className="gerador__opcoes" role="group" aria-label="Formato da imagem">
              {modeloAtual.formatos.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`gerador__chip${formato === f ? ' gerador__chip--ativo' : ''}`}
                  aria-pressed={formato === f}
                  onClick={() => setFormato(f)}
                >
                  {MOLDURAS.formatos[f].nome}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="gerador__campo">
          <span className="gerador__rotulo">
            {modeloAtual.formatos.length > 1 ? '3.' : '2.'} Coloque a sua foto
          </span>
          <label className="btn btn--amarelo gerador__escolher">
            <IconeFoto />
            {imagem ? 'Trocar foto' : 'Escolher foto'}
            {/* sem o atributo capture: abre a galeria, nao forca a camera */}
            <input type="file" accept="image/*" onChange={escolherFoto} hidden />
          </label>
        </div>

        {erro && <p className="gerador__erro" role="alert">{erro}</p>}

        {imagem && (
          <label className="gerador__zoom">
            Zoom
            <input
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
            />
          </label>
        )}

        <div className="gerador__acoes">
          <button
            type="button"
            className="btn btn--verde"
            onClick={baixar}
            disabled={!imagem || ocupado}
          >
            <IconeBaixar /> Baixar imagem
          </button>
          <button
            type="button"
            className="btn btn--ghost-azul"
            onClick={compartilhar}
            disabled={!imagem || ocupado}
          >
            <IconeCompartilhar /> Publicar
          </button>
        </div>

        <p className="gerador__nota">
          A sua foto não é enviada nem armazenada em nenhum servidor. A imagem é
          montada dentro do seu próprio aparelho e salva direto na sua galeria.
        </p>
      </div>
    </div>
  )
}
