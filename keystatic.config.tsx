// keystatic.config.tsx
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'lunianfu1986/unbannow',
  },
  
  ui: {
    brand: { name: 'UnbanNow CMS' },
    navigation: {
      'Content': ['posts', 'games'],
    },
  },

  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({
          label: 'Publish Date',
          defaultValue: { kind: 'today' },
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          multiline: true,
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/uploads',
          publicPath: '/uploads/',
        }),
        author: fields.text({
          label: 'Author',
          defaultValue: 'unbannow',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'FPS and Tactical Shooter', value: 'FPS and Tactical Shooter' },
            { label: 'MOBA', value: 'MOBA' },
            { label: 'Battle Royale', value: 'Battle Royale' },
            { label: 'MMO / Gacha', value: 'MMO / Gacha' },
            { label: 'Sports', value: 'Sports' },
            { label: 'Other', value: 'Other' },
          ],
          defaultValue: 'FPS and Tactical Shooter',
        }),
        game: fields.text({
          label: 'Game (slug)',
          description: 'e.g., escape-from-tarkov',
        }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Guide', value: 'Guide' },
            { label: 'News', value: 'News' },
            { label: 'Review', value: 'Review' },
            { label: 'Esports', value: 'Esports' },
          ],
          defaultValue: 'Guide',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value,
          }
        ),
        seoTitle: fields.text({
          label: 'SEO Title',
          description: 'Optional custom title for search engines',
        }),
        seoDescription: fields.text({
          label: 'SEO Description',
          multiline: true,
          description: 'Optional custom description for search engines',
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/uploads',
            publicPath: '/uploads/',
          },
        }),
      },
    }),

    games: collection({
      label: 'Games',
      slugField: 'title',
      path: 'content/games/*',
      schema: {
        title: fields.slug({ name: { label: 'Game Name' } }),
        slug: fields.text({
          label: 'Slug',
          description: 'Auto-generated from title',
        }),
        genre: fields.text({
          label: 'Genre',
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/uploads',
          publicPath: '/uploads/',
        }),
      },
    }),
  },
});
