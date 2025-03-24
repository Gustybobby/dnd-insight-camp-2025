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
        intcolor: {
          DEFAULT: "#f97316",
          in: "#d67c2d",
          out: "#a41616",
        },
        chrcolor: {
          DEFAULT: "#ee9b00",
          in: "#f1ed02",
          out: "#bf693b",
        },
        strcolor: {
          DEFAULT: "#7d5c9d",
          in: "#7d5c9d",
          out: "#44176f",
        },
        dexcolor: {
          DEFAULT: "#0e7490",
          in: "#0a9396",
          out: "#0f5d5f",
        },
        seafoam: "#94d2bd",
        cream: "#d5c395",
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
