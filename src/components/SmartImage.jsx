import { useState } from 'react'

/**
 * Exibe a imagem; se o arquivo ainda nao existir em /public/assets,
 * renderiza o fallback no lugar (o site nunca fica com icone quebrado).
 * `aoFalhar` avisa o componente pai — usado para esconder quadros vazios.
 */
export default function SmartImage({ src, alt, className, fallback = null, aoFalhar, ...rest }) {
  const [erro, setErro] = useState(false)
  if (erro || !src) return fallback
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => {
        setErro(true)
        aoFalhar?.(src)
      }}
      {...rest}
    />
  )
}
