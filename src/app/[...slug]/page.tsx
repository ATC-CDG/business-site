// src/app/[...slug]/page.tsx
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client' // adjust path if needed

// Add this at the top of your file
interface PageProps {
  params: { slug: string[] }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    `*[_type=="page" && defined(slug.current)].slug.current`
  )
  return slugs.map((s) => ({ slug: s.split('/') }))
}

// Keep only this one component definition
export default async function Page({ params }: PageProps) {
  const slug = params.slug.join('/')
  const data = await client.fetch(
    `*[_type=="page" && slug.current==$slug][0]`,
    { slug },
    { next: { revalidate: 86400 } }
  )

  if (!data) notFound()

  return (
    <main className="prose mx-auto p-6">
      <h1>{data.title}</h1>
      {/* TODO: render rich body with @portabletext/react if you need */}
    </main>
  )
}