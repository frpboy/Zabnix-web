import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
        }),

        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 4,
        }),

        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
        }),

        defineField({
            name: 'readTime',
            title: 'Read Time',
            type: 'number',
            description: 'Estimated reading time in minutes.',
            initialValue: 5,
            validation: (Rule) => Rule.min(1),
        }),

        defineField({
            name: 'gradient',
            title: 'Gradient',
            type: 'string',
            description: 'Tailwind gradient classes used by the existing website.',
            initialValue: 'from-blue-600/20 to-cyan-600/20',
        }),

        defineField({
            name: 'border',
            title: 'Border',
            type: 'string',
            description: 'Tailwind border classes used by the existing website.',
            initialValue: 'border-blue-500/15',
        }),

        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
            ],
        }),
    ],

    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
        },
    },
})