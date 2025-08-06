import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'

// This file no longer needs `generateStaticParams` because params are resolved at runtime.

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  // 1. Await the `params` promise to get the actual object with your slug.
  const resolvedParams = await params;

  // 2. Now you can use the resolved data just like before.
  const slug = resolvedParams.slug.join('/');
  const data = await client.fetch(
    `*[_type=="page" && slug.current==$slug][0]`,
    { slug },
    { next: { revalidate: 86400 } }
  );

  if (!data) {
    notFound();
  }

  return (
    <main className="prose mx-auto p-6">
      <h1>{data.title}</h1>
      {/* TODO: render rich body with @portabletext/react if you need */}
    </main>
  );
}