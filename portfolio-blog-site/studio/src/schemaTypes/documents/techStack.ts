import { defineField } from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const techStack = defineField({
    name: "techStack",
    title: "Tech Stack",
    type: "document",
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
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
    ]
});