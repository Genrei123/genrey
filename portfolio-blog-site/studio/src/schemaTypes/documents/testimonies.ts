import {DocumentsIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const testimonies = defineType({
  name: 'testimonies',
  title: 'Testimonies / Documents',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section title',
      type: 'string',
      initialValue: 'Testimonies & Supporting Documents',
    }),
    defineField({
      name: 'items',
      title: 'Document items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'subtitleIcon',
              title: 'Subtitle icon',
              type: 'image',
              options: {hotspot: false},
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative text',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'images',
              title: 'Document images',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'image',
                  options: {hotspot: true},
                  fields: [
                    defineField({
                      name: 'alt',
                      title: 'Alternative text',
                      type: 'string',
                    }),
                  ],
                }),
              ],
              validation: (Rule) => Rule.min(1),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Testimonies / Documents',
      }
    },
  },
})
