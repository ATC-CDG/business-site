import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'

type PageParams = {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  // Fetch all slugs from Sanity
  const slugs = await client.fetch<string[]>(`*[_type=="page"].slug.current`)
  return slugs.map((slug) => ({ slug: slug.split('/') }))
}

export default async function Page({ params }: PageParams) {
  const slug = params?.slug?.join('/') ?? ''

  // Fetch the matching page document from Sanity
  const data = await client.fetch(
    `*[_type=="page" && slug.current==$slug][0]`,
    { slug },
    { next: { revalidate: 86400 } } // Revalidate every 24 hours
  )

  if (!data) notFound()

  return (
    <main className="prose mx-auto p-6">
      <h1>{data.title}</h1>
      {/* Render body content here with PortableText if needed */}
    </main>
  )
}
