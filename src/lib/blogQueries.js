import {sanityClient} from './sanity'

const postFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  featuredImage {
    asset,
    alt
  },
  body,
  author,
  publishedAt,
  _updatedAt,
  categories,
  tags,
  seoTitle,
  metaDescription,
  socialImage {
    asset,
    alt
  },
  canonicalUrl
`

export async function getBlogPosts() {
  return sanityClient.fetch(`
    *[
      _type == "post" &&
      defined(slug.current) &&
      defined(publishedAt) &&
      publishedAt <= now()
    ]
    | order(publishedAt desc) {
      ${postFields}
    }
  `)
}

export async function getBlogPost(slug) {
  return sanityClient.fetch(
    `
      *[
        _type == "post" &&
        slug.current == $slug &&
        defined(publishedAt) &&
        publishedAt <= now()
      ][0] {
        ${postFields}
      }
    `,
    {slug}
  )
}
