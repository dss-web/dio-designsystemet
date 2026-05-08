import type { Config } from "tailwindcss";

export default {
  content: [
    "./.storybook/**/*.{js,jsx,ts,tsx,mdx,html}",
    "./stories/**/*.{js,jsx,ts,tsx,mdx,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
