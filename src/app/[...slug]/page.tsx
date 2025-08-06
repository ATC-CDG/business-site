// src/app/[...slug]/page.tsx
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'

type PageParams = { slug: string[] }
type SanityPage = {
  _id: string
  title?: string
  body?: unknown
  slug: { current: string }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    `*[_type == "page" && defined(slug.current)].slug.current`
  )
  return slugs.map((s) => ({ slug: s.split('/') }))
}

export default async function Page({
  params,
}: {
  // NOTE: params is async in the new Next.js types
  params: Promise<PageParams>
}) {
  const { slug: slugParts } = await params
  const slug = (slugParts ?? []).join('/')

  const data = await client.fetch<SanityPage | null>(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug },
    { next: { revalidate: 60 * 60 * 24 } }
  )

  if (!data) notFound()

  return (
    <main className="prose mx-auto p-6">
      <h1>{data.title ?? 'Untitled page'}</h1>
      {/* TODO: render data.body with @portabletext/react if you use Portable Text */}
    </main>
  )
}
