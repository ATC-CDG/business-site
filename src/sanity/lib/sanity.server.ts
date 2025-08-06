import {createClient} from 'next-sanity'

// server-only client (no NEXT_PUBLIC, includes token)
export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION!,
  useCdn: false,
  token: process.env.SANITY_READ_TOKEN!, // do NOT expose to browser
  perspective: 'published',
})
