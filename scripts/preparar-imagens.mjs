/**
 * Remove o fundo (chroma key verde das fotos e o fundo solido dos logos)
 * e grava os PNGs prontos em public/assets/.
 *
 * Uso:
 *   1. Coloque os arquivos originais em  fotos-originais/
 *      com os nomes finais desejados (extensao pode ser .jpg/.jpeg/.png):
 *        logo-branco.*   logo-azul.*
 *        foto-hero.*     foto-sobre.*
 *        foto-1.*  foto-2.*  foto-3.*  foto-4.*  foto-5.*
 *   2. npm run imagens
 *
 * O resultado sai em public/assets/<nome>.png com fundo transparente.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const RAIZ = path.resolve(import.meta.dirname, '..')
const ENTRADA = path.join(RAIZ, 'fotos-originais')
const SAIDA = path.join(RAIZ, 'public', 'assets')

// Ajustes por arquivo. "tolerancia" e a distancia de cor onde o pixel
// ainda e considerado fundo; "suavizacao" e a faixa de transicao (borda).
const PADRAO = { tolerancia: 78, suavizacao: 55, antiVazamento: true, larguraMax: 1600 }
const AJUSTES = {
  'logo-branco': { tolerancia: 90, suavizacao: 22, antiVazamento: false, larguraMax: 900 },
  'logo-azul': { tolerancia: 90, suavizacao: 22, antiVazamento: false, larguraMax: 900 }
}

const EXTENSOES = ['.jpg', '.jpeg', '.png', '.webp']

/** Media dos 4 cantos = cor de fundo. */
function corDeFundo(dados, largura, altura, canais) {
  const amostra = 12 // bloco de 12x12 px em cada canto
  const cantos = [[0, 0], [largura - amostra, 0], [0, altura - amostra], [largura - amostra, altura - amostra]]
  let r = 0, g = 0, b = 0, n = 0
  for (const [ox, oy] of cantos) {
    for (let y = oy; y < oy + amostra; y++) {
      for (let x = ox; x < ox + amostra; x++) {
        const i = (y * largura + x) * canais
        r += dados[i]; g += dados[i + 1]; b += dados[i + 2]; n++
      }
    }
  }
  return [r / n, g / n, b / n]
}

/**
 * Distancia de cor dando mais peso a matiz que ao brilho — assim a
 * variacao de iluminacao do tecido verde nao vira buraco na silhueta.
 */
function distancia(r, g, b, fr, fg, fb) {
  const dr = r - fr, dg = g - fg, db = b - fb
  const brilho = (dr + dg + db) / 3
  const cr = dr - brilho, cg = dg - brilho, cb = db - brilho
  const croma = Math.sqrt(cr * cr + cg * cg + cb * cb)
  return croma * 1.6 + Math.abs(brilho) * 0.45
}

async function processar(arquivo) {
  const nome = path.parse(arquivo).name
  const cfg = { ...PADRAO, ...(AJUSTES[nome] || {}) }

  let img = sharp(path.join(ENTRADA, arquivo)).rotate()
  const meta = await img.metadata()
  if (meta.width > cfg.larguraMax) img = img.resize({ width: cfg.larguraMax })

  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: L, height: A, channels: C } = info
  const [fr, fg, fb] = corDeFundo(data, L, A, C)
  const fundoVerde = fg > fr + 18 && fg > fb + 18

  let removidos = 0
  const limite = cfg.tolerancia
  const suave = Math.max(1, cfg.suavizacao)

  for (let i = 0; i < data.length; i += C) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const d = distancia(r, g, b, fr, fg, fb)

    let alfa = 255
    if (d <= limite) alfa = 0
    else if (d < limite + suave) alfa = Math.round(((d - limite) / suave) * 255)

    if (alfa === 0) removidos++

    // Anti-vazamento: tira o reflexo verde que sobra na borda do cabelo/roupa
    if (cfg.antiVazamento && fundoVerde && alfa > 0 && g > (r + b) / 2) {
      const teto = Math.round((r + b) / 2)
      const forca = alfa < 255 ? 1 : 0.65
      data[i + 1] = Math.round(g + (teto - g) * forca)
    }

    data[i + 3] = alfa
  }

  const pct = ((removidos / (L * A)) * 100).toFixed(1)

  const destino = path.join(SAIDA, `${nome}.png`)
  await sharp(data, { raw: { width: L, height: A, channels: C } })
    .png({ compressionLevel: 9, quality: 90 })
    .trim({ threshold: 1 })          // corta a moldura transparente que sobrou
    .toFile(destino)

  const final = await sharp(destino).metadata()
  const aviso =
    removidos === 0 ? '  <-- NADA foi removido; aumente a tolerancia' :
    pct > 92 ? '  <-- removeu quase tudo; diminua a tolerancia' : ''

  console.log(
    `  ${nome.padEnd(12)} ${String(L).padStart(4)}x${A} -> ${final.width}x${final.height}` +
    `   fundo rgb(${fr | 0},${fg | 0},${fb | 0})   ${pct}% removido${aviso}`
  )
}

async function main() {
  let arquivos
  try {
    arquivos = (await fs.readdir(ENTRADA)).filter((f) => EXTENSOES.includes(path.extname(f).toLowerCase()))
  } catch {
    console.error(`\nCrie a pasta "fotos-originais/" e coloque as imagens nela.\n`)
    process.exit(1)
  }

  if (!arquivos.length) {
    console.error(`\nNenhuma imagem em fotos-originais/. Veja public/assets/LEIA-ME.txt.\n`)
    process.exit(1)
  }

  await fs.mkdir(SAIDA, { recursive: true })
  console.log(`\nRemovendo fundo de ${arquivos.length} imagem(ns):\n`)
  for (const a of arquivos.sort()) {
    try {
      await processar(a)
    } catch (e) {
      console.error(`  ${a}: ERRO — ${e.message}`)
    }
  }
  console.log(`\nPronto. Arquivos em public/assets/\n`)
}

main()
