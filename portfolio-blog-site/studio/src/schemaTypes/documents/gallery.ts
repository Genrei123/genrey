import {defineField, defineType} from 'sanity'
import {DocumentTextIcon, ImageIcon} from '@sanity/icons'

export const gallery = defineType({
    name: "gallery",
    title: "Gallery",
    type: "document",
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: "description",
            title: "Description",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
                aiAssist: {
                    imageDescriptionField: "description",
                },
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "alt",
            title: "Alt text",
            type: "string",
            description: "Important for accessibility and SEO.",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "caption",
            title: "Caption",
            type: "string",
            description: "Optional caption for the image.",
        }),

        defineField({
            name: "credit",
            title: "Credit",
            type: "string",
            description: "Optional credit for the image.",
        }),
    ]
})