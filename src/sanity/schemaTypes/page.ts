import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'heroImage', type: 'image'}),
    defineField({name: 'body', type: 'array', of: [{type: 'block'}]}),
  ],
})

