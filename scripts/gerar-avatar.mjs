/**
 * Gera public/assets/avatar.png (foto redonda da pagina /links)
 * recortando o rosto a partir de public/assets/foto-hero.png.
 *
 *   node scripts/gerar-avatar.mjs
 */
import path from 'node:path'
import sharp from 'sharp'

const RAIZ = path.resolve(import.meta.dirname, '..')
const ORIGEM = path.join(RAIZ, 'public', 'assets', 'foto-hero.png')
const DESTINO = path.join(RAIZ, 'public', 'assets', 'avatar.png')

const { data, info } = await sharp(ORIGEM).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width: L, height: A, channels: C } = info

// A cabeca e a parte opaca do terco superior da imagem.
const faixa = Math.round(A * 0.30)
let x0 = L, x1 = 0, y0 = A
for (let y = 0; y < faixa; y++) {
  for (let x = 0; x < L; x++) {
    if (data[(y * L + x) * C + 3] > 40) {
      if (x < x0) x0 = x
      if (x > x1) x1 = x
      if (y < y0) y0 = y
    }
  }
}

if (x1 <= x0) {
  console.error('Nao achei a cabeca na foto — o PNG tem fundo transparente?')
  process.exit(1)
}

const centro = Math.round((x0 + x1) / 2)
const lado = Math.min(A, L, Math.round((x1 - x0) * 1.9))
const left = Math.max(0, Math.min(L - lado, centro - Math.round(lado / 2)))
const top = Math.max(0, Math.min(A - lado, y0 - Math.round(lado * 0.10)))

await sharp(ORIGEM)
  .extract({ left, top, width: lado, height: lado })
  .resize(400, 400)
  .png({ compressionLevel: 9 })
  .toFile(DESTINO)

console.log(`avatar.png gerado — recorte ${lado}x${lado} em (${left},${top}) de ${L}x${A}`)
