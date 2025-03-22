import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightorange: "#e4b75e",
        seafoam: "#94d2bd",
      },
    },
  },
  plugins: [require("tailwindcss-motion")],
} satisfies Config;
