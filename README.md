# Eliton Leite 2002 — Site institucional

Landing page da campanha a **Deputado Federal por São Paulo**.
React 18 + Vite, sem dependências extras, pronta para deploy na Vercel.

---

## 1. Rodar localmente

```bash
npm install
```

```bash
npm run dev
```

Abre em `http://localhost:5173`.

## 2. O que você PRECISA preencher antes de publicar

### 2.1 Imagens — o fundo verde sai sozinho

Jogue os **originais** (com o chroma key verde mesmo) em `fotos-originais/`,
usando estes nomes:

| Arquivo em `fotos-originais/` | O que é |
|---|---|
| `logo-branco.*` | Logo de letras brancas (a que está sobre fundo azul) |
| `logo-azul.*` | Logo de letras azuis (a que está sobre fundo branco) |
| `foto-hero.*` | Foto principal do topo — de pé, corpo ou meio corpo |
| `foto-sobre.*` | Foto da seção "O Candidato" |
| `foto-1.*` … `foto-5.*` | Galeria |

Depois rode:

```bash
npm run imagens
```

O script `scripts/preparar-imagens.mjs` remove o fundo verde das fotos e o fundo
sólido dos logos, corta as sobras e grava os `.png` transparentes em
`public/assets/`. Ele imprime quanto removeu de cada imagem e avisa quando o
resultado ficou suspeito.

**Se precisar calibrar**, os parâmetros ficam no topo do script:

| Parâmetro | Aumente quando… | Diminua quando… |
|---|---|---|
| `tolerancia` | sobrou fundo verde | comeu pedaço da pessoa |
| `suavizacao` | a borda ficou serrilhada | a borda ficou lavada |
| `antiVazamento` | há reflexo verde no cabelo/ombro | (desligue para logos) |

Dá para ajustar arquivo por arquivo em `AJUSTES`.

Enquanto um arquivo não existir, o site mostra um bloco em degradê no lugar —
nunca aparece ícone de imagem quebrada.

### 2.2 Recorte ou foto com fundo?

Cada foto declara em `src/site.config.js` se é um recorte ou não:

```js
export const FOTOS = {
  hero:  { src: '/assets/foto-hero.png',  recorte: true  },
  sobre: { src: '/assets/foto-sobre.png', recorte: false }
}
```

- **`recorte: true`** — PNG sem fundo. Aparece inteiro, com sombra projetada, e
  as bordas cortadas (base e lateral) se dissolvem no fundo.
- **`recorte: false`** — foto que já tem fundo próprio (como a do Congresso).
  Preenche o quadro inteiro, sem sobra de cor nas laterais.

Errar essa flag é o que causa faixa vazia em volta da foto. As fotos da galeria
têm a mesma opção, item por item.

### 2.3 Galeria

A seção **Galeria e o link dela no menu só aparecem** quando houver fotos
listadas em `GALERIA` (em `src/site.config.js`) **e** os arquivos existirem.
As linhas já estão prontas, comentadas — é só adicionar as fotos e descomentar.

### 2.2 Dados de contato e redes
Tudo fica em **um arquivo só**: `src/site.config.js`.

- `CONTATO.whatsapp` — número real da campanha (só dígitos, com 55 na frente)
- `CONTATO.email`
- `REDES` — URLs reais de Instagram, Facebook, YouTube e TikTok
- `CANDIDATO.partido` e `CANDIDATO.cnpj` — **o CNPJ da campanha é obrigatório
  no rodapé** (Lei 9.504/97). Enquanto estiver vazio, o rodapé exibe um aviso.

Os textos das bandeiras e propostas também estão nesse arquivo.

## 3. Publicar na Vercel

### Opção A — pelo site da Vercel (recomendado)
1. Suba esta pasta para um repositório no GitHub.
2. Em [vercel.com](https://vercel.com) → **Add New → Project** → importe o repositório.
3. A Vercel detecta o Vite sozinho. Confirme:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy**. Depois, em *Settings → Domains*, aponte o domínio da campanha.

### Opção B — pela linha de comando
```bash
npx vercel --prod
```

O arquivo `vercel.json` já está configurado.

## 4. Estrutura

```
fotos-originais/        <- ENTRADA: fotos cruas, com fundo verde
scripts/
  preparar-imagens.mjs  <- remove o fundo e gera public/assets/*.png
src/
  site.config.js        <- EDITE AQUI (textos, redes, contato)
  App.jsx
  useReveal.js          <- animação de entrada ao rolar
  components/
    Header.jsx          <- menu fixo + menu mobile
    Hero.jsx            <- topo
    BandeiraBrasil.jsx  <- bandeira em SVG usada de fundo no topo
    Secoes.jsx          <- demais seções + rodapé
    Icons.jsx           <- ícones SVG (sem biblioteca externa)
    SmartImage.jsx      <- imagem com fallback
  styles/global.css     <- design system (cores em :root)
public/assets/          <- SAIDA: logos e fotos já recortados
```

### Fundo do topo
A bandeira do Brasil é desenhada em SVG (`BandeiraBrasil.jsx`) — não é imagem,
então não pesa no carregamento. O efeito de pano balançando vem de
`.hero__flag-inner` (animação `tremular`) somada a duas camadas de dobras
(`ondaA` / `ondaB`). A camada verde que deixa a bandeira opaca é o `.hero__veil`;
para deixar a bandeira mais ou menos visível, mexa nas opacidades dele em
`global.css`.

## 5. Paleta

| Cor | Hex | Uso |
|---|---|---|
| Verde | `#055f16` | Seções de destaque, detalhes |
| Azul | `#012883` | Cor institucional principal |
| Amarelo | `#f7cf0d` | Botões e chamadas de ação |
| Branco | `#ffffff` | Fundo e texto sobre escuro |

Para ajustar, altere as variáveis no topo de `src/styles/global.css`.
