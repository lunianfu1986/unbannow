import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'lunianfu1986',
      name: 'unbannow',
    },
  },

  collections: {
    posts: collection({
      label: 'Posts',
      path: 'content/posts',
      slugField: 'title',
      format: { contentField: 'body' },

      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.datetime({ label: 'Date' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/uploads',
          publicPath: '/uploads',
        }),
        author: fields.text({ label: 'Author', defaultValue: 'Admin' }),
        category: fields.text({ label: 'Category' }),
        tags: fields.array(fields.text({ label: 'Tag' })),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({
          label: 'SEO Description',
          multiline: true,
        }),
        body: fields.markdown({ label: 'Content' }),
      },
    }),
  },
});
