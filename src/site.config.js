// ============================================================
//  CONFIGURACAO DO SITE — edite apenas este arquivo para
//  trocar links, telefones e textos de contato.
// ============================================================

export const CANDIDATO = {
  nome: 'Eliton Leite',
  numero: '2002',
  cargo: 'Deputado Federal',
  estado: 'São Paulo',
  slogan: 'Coragem para mudar o Brasil',
  // Preencha quando definido:
  partido: 'PODEMOS' // ex.: 'PL' — deixe vazio para ocultar
}

// Dados obrigatorios no rodape pela Lei 9.504/97
export const LEGAL = {
  registro: 'ELEIÇÃO 2026 ELITON SOUSA LEITE DEPUTADO FEDERAL',
  cnpj: '68.491.987/0001-28'
}

// ------------------------------------------------------------------
// GERADOR DE MOLDURA — pagina /moldura
// As artes ficam em /public/moldura com o nome <modelo>-<formato>.png
// e a area da foto PRECISA ser transparente. Veja o LEIA-ME de la.
// Para adicionar um modelo: solte o arquivo na pasta e acrescente uma
// linha em "modelos". Nenhuma outra mudanca e necessaria.
// ------------------------------------------------------------------
export const MOLDURAS = {
  modelos: [
    { id: 'tocom', nome: '#TO COM LEITE', formatos: ['post'] },
    { id: 'classico', nome: 'Clássico', formatos: ['post'] }
  ],
  formatos: {
    post: { nome: 'Post (quadrado)', largura: 1080, altura: 1080 },
    story: { nome: 'Story (vertical)', largura: 1080, altura: 1920 }
  }
}

// Pagina de links da campanha — fica em /links
export const PAGINA_LINKS = {
  subtitulo: 'Conecte-se comigo!',
  avatar: '/assets/avatar.png', // recorte quadrado do rosto (gerado a partir da foto-hero)
  // Ordem dos botoes. 'whatsapp' e 'site' sao montados automaticamente;
  // os demais nomes vem da lista REDES abaixo. Rede sem URL nao aparece.
  ordem: ['Instagram', 'whatsapp', 'site', 'Facebook', 'YouTube', 'TikTok']
}

export const CONTATO = {
  // Formato internacional, so numeros. Ex.: 5511999999999
  whatsapp: '5511999999999',
  mensagemWhatsapp: 'Olá! Quero apoiar a campanha do Eliton Leite 2002.',
  email: 'contato@elitonleite.com.br',
  cidade: 'São Paulo — SP'
}

export const REDES = [
  { nome: 'Instagram', url: 'https://www.instagram.com/comendador_elitonleite/', icone: 'instagram' },
  { nome: 'Facebook',  url: 'https://www.facebook.com/eliton.leite.56/?locale=pt_BR',  icone: 'facebook'  },
  { nome: 'YouTube',   url: 'https://www.youtube.com/channel/UCRYiVIuuok9iV06DEXcgIWg',  icone: 'youtube'   },
  { nome: 'TikTok',    url: 'https://www.tiktok.com/@eliton.leite43',   icone: 'tiktok'    }
]

export const BANDEIRAS = [
  {
    id: 'seguranca',
    tag: 'Segurança',
    titulo: 'Segurança pública como prioridade nacional',
    texto:
      'Nenhuma família vive bem com medo. Vamos endurecer a lei contra o crime organizado, garantir estrutura e respaldo jurídico às forças policiais e devolver as ruas a quem trabalha.',
    itens: [
      'Respaldo legal para quem está na linha de frente',
      'Penas mais duras para crimes violentos e facções',
      'Investimento em inteligência e tecnologia policial'
    ]
  },
  {
    id: 'liberdade',
    tag: 'Economia',
    titulo: 'Menos Estado, mais liberdade econômica',
    texto:
      'Quem gera emprego não pode ser tratado como inimigo. Menos imposto, menos burocracia e menos gastança pública — para o brasileiro poder empreender, crescer e prosperar.',
    itens: [
      'Redução da carga tributária sobre quem produz',
      'Corte de privilégios e desperdício na máquina pública',
      'Desburocratização para o pequeno e o micro empresário'
    ]
  },
  {
    id: 'familia',
    tag: 'Família',
    titulo: 'Família e liberdade de criação dos filhos',
    texto:
      'Quem educa os filhos são os pais, não o Estado. Defesa intransigente da família, da liberdade de crença e do direito de cada pai decidir os valores que ensina em casa.',
    itens: [
      'Escola sem doutrinação ideológica',
      'Autonomia dos pais nas decisões sobre os filhos',
      'Defesa da liberdade religiosa e de expressão'
    ]
  },
  {
    id: 'oposicao',
    tag: 'Brasil',
    titulo: 'Oposição frontal ao PT e ao governo Lula',
    texto:
      'Sem meio-termo e sem acordo por debaixo da mesa. Voto firme contra o aumento de impostos, contra o inchaço do Estado e contra tudo que atrapalha a vida do brasileiro de bem.',
    itens: [
      'Voto contra novos impostos e taxações',
      'Fiscalização permanente do dinheiro público',
      'Defesa da liberdade de expressão do cidadão'
    ]
  }
]

export const PROPOSTAS = [
  { icone: 'shield', titulo: 'Excludente de ilicitude', texto: 'Segurança jurídica real para o policial que age em legítima defesa no cumprimento do dever.' },
  { icone: 'cash',   titulo: 'Menos imposto',            texto: 'Chega de o brasileiro trabalhar quase metade do ano só para pagar tributo.' },
  { icone: 'home',   titulo: 'Escola e família',         texto: 'Transparência total do conteúdo escolar e voz ativa dos pais na educação dos filhos.' },
  { icone: 'work',   titulo: 'Emprego e renda',          texto: 'Apoio ao micro e pequeno empresário, que é quem mais emprega em São Paulo.' },
  { icone: 'church', titulo: 'Liberdade de crença',      texto: 'Proteção às igrejas, templos e ao direito de cada um professar sua fé.' },
  { icone: 'eye',    titulo: 'Fiscalização',             texto: 'Acompanhamento aberto do orçamento e denúncia de qualquer desvio de recurso público.' }
]

// ------------------------------------------------------------------
// FOTOS
// recorte: true  -> PNG sem fundo. Aparece inteiro, com sombra projetada,
//                   apoiado na base do quadro.
// recorte: false -> foto que já tem fundo próprio. Preenche o quadro todo.
// ------------------------------------------------------------------
export const FOTOS = {
  hero: { src: '/assets/foto-hero.png', recorte: true },
  sobre: { src: '/assets/foto-sobre.png', recorte: false }
}

// Fotos da galeria. A seção (e o link no menu) só aparecem quando
// houver pelo menos uma foto aqui E o arquivo existir em /public/assets.
// Para ligar a galeria, coloque as fotos e descomente as linhas abaixo.
export const GALERIA = [
  // { src: '/assets/foto-1.png', alt: 'Eliton Leite sorrindo, de terno',        recorte: false },
  // { src: '/assets/foto-2.png', alt: 'Eliton Leite em retrato formal',         recorte: false },
  // { src: '/assets/foto-3.png', alt: 'Eliton Leite de camisa social',          recorte: false },
  // { src: '/assets/foto-4.png', alt: 'Eliton Leite cumprimentando apoiadores', recorte: false },
  // { src: '/assets/foto-5.png', alt: 'Eliton Leite de braços cruzados',        recorte: false }
]
