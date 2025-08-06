// src/app/[...slug]/page.tsx
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client' // adjust if your path differs

// Types for the page document you store in Sanity
type SanityPage = {
  _id: string
  title?: string
  body?: unknown
  slug: { current: string }
}

export async function generateStaticParams() {
  // Get all page slugs from Sanity and split by "/" for catch-all route
  const slugs = await client.fetch<string[]>(
    `*[_type == "page" && defined(slug.current)].slug.current`
  )
  return slugs.map((s) => ({ slug: s.split('/') }))
}

export default async function Page({
  params,
}: {
  params: { slug: string[] }
}) {
  const slug = params.slug?.join('/') ?? ''

  // Fetch the matching page
  const data = await client.fetch<SanityPage | null>(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug },
    { next: { revalidate: 60 * 60 * 24 } } // revalidate every 24h
  )

  if (!data) {
    notFound()
  }

  return (
    <main className="prose mx-auto p-6">
      <h1>{data.title ?? 'Untitled page'}</h1>
      {/* TODO: render rich text, e.g. with @portabletext/react if you have data.body */}
    </main>
  )
}
