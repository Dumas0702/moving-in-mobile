import {writeFile} from 'node:fs/promises'
import {createClient} from '@sanity/client'

const SITE_URL = 'https://movinginmobile.com'

const client = createClient({
  projectId: 'emn6txxv',
  dataset: 'production',
  apiVersion: '2026-10-10',
  useCdn: false,
})

const staticPages = [
  {path: '/', priority: '1.0'},
  {path: '/about', priority: '0.8'},
  {path: '/buyers', priority: '0.9'},
  {path: '/sellers', priority: '0.9'},
  {path: '/neighborhoods', priority: '0.9'},
  {path: '/rowe-report', priority: '0.8'},
  {path: '/resources', priority: '0.8'},
  {path: '/faq', priority: '0.9'},
  {path: '/contact', priority: '0.7'},
  {path: '/open-houses', priority: '0.8'},
  {path: '/blog', priority: '0.9'},
]

const posts = await client.fetch(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ]
  | order(publishedAt desc) {
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }
`)

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const staticEntries = staticPages.map(({path, priority}) => {
  const url = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`

  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <priority>${priority}</priority>
  </url>`
})

const postEntries = posts.map((post) => {
  const lastModified = post._updatedAt || post.publishedAt

  return `  <url>
    <loc>${escapeXml(`${SITE_URL}/blog/${post.slug}`)}</loc>
    ${lastModified ? `<lastmod>${escapeXml(lastModified)}</lastmod>` : ''}
    <priority>0.8</priority>
  </url>`
})

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...postEntries].join('\n')}
</urlset>
`

await writeFile('public/sitemap.xml', sitemap)

console.log(
  `Generated sitemap with ${staticPages.length} static pages and ${posts.length} blog post(s).`
)
