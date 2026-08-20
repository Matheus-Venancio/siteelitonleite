/**
 * Bandeira do Brasil desenhada em SVG (sem imagem externa).
 * Serve de fundo do topo do site, com efeito de pano balançando
 * feito em CSS (ver .bandeira-* em global.css).
 */

// 27 estrelas dentro do globo (viewBox 200x140, globo em 100,70 raio 35).
// Spica e a unica acima da faixa, como na bandeira real.
const ESTRELAS = [
  [100, 52, 1.5],                                                   // Spica (acima da faixa)
  [98, 83, 1.7], [98, 104, 1.5], [88, 93, 1.4], [108, 91, 1.4], [99, 97, 0.9], // Cruzeiro do Sul
  [76, 84, 1.2], [83, 88, 0.9], [80, 96, 1.1], [72, 92, 0.8],
  [118, 85, 1.3], [124, 90, 0.9], [115, 97, 1.0], [121, 80, 0.8],
  [92, 87, 0.8], [104, 86, 1.0], [111, 100, 1.2], [90, 101, 0.9],
  [86, 80, 1.0], [113, 79, 0.9], [95, 92, 0.7], [105, 96, 0.8],
  [78, 79, 0.8], [126, 82, 0.7], [100, 108, 0.9], [84, 106, 0.7],
  [116, 105, 0.8]
]

export default function BandeiraBrasil({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 140"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id="globoClip">
          <circle cx="100" cy="70" r="35" />
        </clipPath>
        <path id="arcoFaixa" d="M 62 74 A 80 80 0 0 1 138 74" />
      </defs>

      {/* Campo verde */}
      <rect width="200" height="140" fill="#009c3b" />

      {/* Losango amarelo */}
      <polygon points="100,17 183,70 100,123 17,70" fill="#ffdf00" />

      {/* Globo azul */}
      <circle cx="100" cy="70" r="35" fill="#002776" />

      {/* Estrelas */}
      <g fill="#ffffff" clipPath="url(#globoClip)">
        {ESTRELAS.map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} />
        ))}
      </g>

      {/* Faixa branca */}
      <g clipPath="url(#globoClip)">
        <path
          d="M 58 76 A 80 80 0 0 1 142 76"
          fill="none"
          stroke="#ffffff"
          strokeWidth="8.5"
        />
      </g>

      {/* Dizeres da faixa */}
      <g clipPath="url(#globoClip)">
        <text
          fill="#002776"
          fontSize="4.4"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="700"
          letterSpacing="1.1"
        >
          <textPath href="#arcoFaixa" startOffset="50%" textAnchor="middle">
            ORDEM E PROGRESSO
          </textPath>
        </text>
      </g>
    </svg>
  )
}
