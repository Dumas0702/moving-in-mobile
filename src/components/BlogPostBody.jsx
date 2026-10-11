import {PortableText} from '@portabletext/react'
import {urlFor} from '../lib/sanity'

const components = {
  block: {
    h2: ({children}) => (
      <h2 className="mt-10 font-display text-3xl font-semibold uppercase leading-tight text-neutral-950">
        {children}
      </h2>
    ),

    h3: ({children}) => (
      <h3 className="mt-8 text-2xl font-semibold leading-tight text-neutral-950">
        {children}
      </h3>
    ),

    normal: ({children}) => (
      <p className="mt-5 text-[17px] leading-8 text-neutral-700">
        {children}
      </p>
    ),

    blockquote: ({children}) => (
      <blockquote className="my-8 border-l-4 border-red-600 pl-6 text-xl italic leading-8 text-neutral-700">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({children}) => (
      <ul className="my-6 list-disc space-y-2 pl-6 text-[17px] leading-8 text-neutral-700">
        {children}
      </ul>
    ),

    number: ({children}) => (
      <ol className="my-6 list-decimal space-y-2 pl-6 text-[17px] leading-8 text-neutral-700">
        {children}
      </ol>
    ),
  },

  marks: {
    strong: ({children}) => (
      <strong className="font-semibold text-neutral-950">{children}</strong>
    ),

    link: ({children, value}) => {
  const linkType = value?.linkType || 'url'

  if (linkType === 'homeValue') {
    const handleHomeValueClick = (event) => {
      event.preventDefault()

      window.dispatchEvent(
        new CustomEvent('openLeadPopup', {
          detail: 'Home Value Report',
        })
      )
    }

    return (
      <a
        href="/home-value-report"
        onClick={handleHomeValueClick}
        className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700"
      >
        {children}
      </a>
    )
  }

  const internalRoutes = {
    contact: '/contact',
    neighborhoods: '/neighborhoods',
    buyers: '/buyers',
    sellers: '/sellers',
  }

  if (internalRoutes[linkType]) {
    return (
      <a
        href={internalRoutes[linkType]}
        className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700"
      >
        {children}
      </a>
    )
  }

  const href = value?.href || '#'
  const external =
    href.startsWith('http://') || href.startsWith('https://')

  return (
    <a
      href={href}
      className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700"
      {...(external
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {})}
    >
      {children}
    </a>
  )
  },
  },

  types: {
    image: ({value}) => {
      if (!value?.asset) {
        return null
      }

      return (
        <figure className="my-10">
          <img
            src={urlFor(value).width(1200).fit('max').auto('format').url()}
            alt={value.alt || ''}
            className="h-auto w-full rounded-lg"
            loading="lazy"
          />

          {value.caption ? (
            <figcaption className="mt-2 text-center text-sm text-neutral-500">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      )
    },
  },
}

export default function BlogPostBody({value}) {
  if (!value) {
    return null
  }

  return <PortableText value={value} components={components} />
}
