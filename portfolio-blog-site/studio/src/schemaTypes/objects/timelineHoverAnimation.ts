import {defineField, defineType} from 'sanity'

export const timelineHoverAnimation = defineType({
  name: 'timelineHoverAnimation',
  title: 'Timeline Hover Animation',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Animation Variant',
      type: 'string',
      initialValue: 'lift',
      options: {
        list: [
          {title: 'Lift', value: 'lift'},
          {title: 'Zoom', value: 'zoom'},
          {title: 'Tilt', value: 'tilt'},
          {title: 'Glow', value: 'glow'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'number',
      initialValue: 0.22,
      description: 'Hover motion duration in seconds.',
    }),
    defineField({
      name: 'x',
      title: 'Horizontal movement',
      type: 'number',
      initialValue: 0,
      description: 'Used by custom hover variants.',
    }),
    defineField({
      name: 'y',
      title: 'Vertical movement',
      type: 'number',
      initialValue: -4,
      description: 'Used by lift-style hover variants.',
    }),
    defineField({
      name: 'scale',
      title: 'Scale',
      type: 'number',
      initialValue: 1.03,
      description: 'Used by zoom-style hover variants.',
    }),
    defineField({
      name: 'rotate',
      title: 'Rotate',
      type: 'number',
      initialValue: 1.5,
      description: 'Used by tilt-style hover variants.',
    }),
  ],
  preview: {
    select: {
      title: 'variant',
      subtitle: 'duration',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Hover animation',
        subtitle: subtitle ? `Duration ${subtitle}s` : 'Hover animation',
      }
    },
  },
})
