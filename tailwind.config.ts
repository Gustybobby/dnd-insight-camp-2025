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
        lightorange: "#ee9b00",
        intcolor: "#f97316",
        strcolor: "#7d5c9d",
        dexcolor: "#0e7490",
        seafoam: "#94d2bd",
        cream: "#d0c1a0",
        oldcream: "#80826e",
        oldpurple: "#7d5c9d",
        darkred: "#692212",
        dark: "#111111",
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(circle, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-motion")],
} satisfies Config;
