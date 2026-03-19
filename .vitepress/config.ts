import { defineConfig } from "vitepress";

export default defineConfig({
  title: "DeclareUI",
  description: "Describe your UI. We'll build it.",

  appearance: "dark",

  head: [
    ["meta", { name: "theme-color", content: "#06b6d4" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "DeclareUI" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Declare UI components in simple YAML and compile to React, Vue, Svelte, Angular, or Web Components.",
      },
    ],
  ],

  themeConfig: {
    logo: "/logo.svg",

    nav: [
      { text: "Getting Started", link: "/guide/getting-started" },
      { text: "Guide", link: "/guide/concepts" },
      { text: "Reference", link: "/reference/schema" },
      { text: "Examples", link: "/examples/button" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          items: [
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "Core Concepts", link: "/guide/concepts" },
          ],
        },
        {
          text: "Guides",
          items: [
            { text: "YAML for UI Builders", link: "/guide/for-backend-devs" },
            { text: "AI & MCP Integration", link: "/guide/ai" },
          ],
        },
      ],
      "/reference/": [
        {
          text: "Reference",
          items: [
            { text: "YAML Schema", link: "/reference/schema" },
            { text: "CLI", link: "/reference/cli" },
          ],
        },
      ],
      "/examples/": [
        {
          text: "Examples",
          items: [
            { text: "Button", link: "/examples/button" },
            { text: "Card", link: "/examples/card" },
            { text: "Input", link: "/examples/input" },
            { text: "Modal", link: "/examples/modal" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/declare-ui" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 DeclareUI",
    },

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/declare-ui/docs/edit/main/:path",
      text: "Edit this page on GitHub",
    },
  },
});
