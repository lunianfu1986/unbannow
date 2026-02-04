import { defineConfig } from "tinacms";

const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "FPS and Tactical Shooter",
              "MOBA",
              "Battle Royale",
              "MMO / Gacha",
              "Sports",
              "Other",
            ],
          },
          {
            type: "string",
            name: "game",
            label: "Game",
          },
          {
            type: "string",
            name: "type",
            label: "Type",
            options: ["Guide", "News", "Review", "Esports"],
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "game",
        label: "Games",
        path: "content/games",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Game Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
          },
          {
            type: "string",
            name: "genre",
            label: "Genre",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
          },
        ],
      },
    ],
  },
});
