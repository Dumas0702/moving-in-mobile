import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description:
        'Click Generate to create the URL from the post title. Only change this after publishing if absolutely necessary.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description:
        'A short summary shown on the blog page and in article previews.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            'Describe the image for accessibility and search engines.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'body',
      title: 'Article',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            annotations: [
              {
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      initialValue: 'url',
      options: {
        list: [
          {title: 'Normal Link', value: 'url'},
          {title: 'Home Value Report Popup', value: 'homeValue'},
          {title: 'Contact Tina', value: 'contact'},
          {title: 'Neighborhoods', value: 'neighborhoods'},
          {title: 'Buyers', value: 'buyers'},
          {title: 'Sellers', value: 'sellers'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'href',
      title: 'URL',
      type: 'url',
      description:
        'Only needed when Link Type is Normal Link.',
      hidden: ({parent}) => parent?.linkType !== 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    },
  ],
},
            ],
          },
        }),

        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Tina Rowe',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description:
        'Examples: Relocation, Buyers, Sellers, Neighborhoods, Mobile Living',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description:
        'Use specific topics such as Mobile Alabama, Fairhope, Flood Zones, Home Buying, etc.',
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description:
        'Optional. If left blank, the post title will be used.',
    }),

    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description:
        'Short search-result description. Aim for roughly 150–160 characters.',
    }),

    defineField({
      name: 'socialImage',
      title: 'Social Sharing Image',
      type: 'image',
      description:
        'Optional. If left blank, the featured image will be used for social sharing.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL Override',
      type: 'url',
      description:
        'Usually leave this blank. Only use it if this article was originally published somewhere else or requires a different canonical URL.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'author',
      media: 'featuredImage',
    },
  },
})
