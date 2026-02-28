import {defineField, defineType} from 'sanity'
import {CogIcon, DocumentTextIcon, ImageIcon} from '@sanity/icons'

export const experience = defineType({
    name: "experience",
    title: "Experience",
    type: "document",
    icon: CogIcon,
    fields: [
        defineField({
            name: "role",
            title: "Role",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "company",
            title: "Company",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "duration",
            title: "Duration",
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
            name: "icon",
            title: "Company Icon",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "responsibilities",
            title: "Responsibilities",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "link",
            title: "Company Website",
            type: "url",
        }),
    ]
})