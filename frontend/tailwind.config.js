/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // NOTE: Tailwind is included per project requirements but the existing
  // CSS files (style.css, products.css, etc.) handle ALL visual styling.
  // Preflight MUST be disabled — it would reset margins, fonts, headings,
  // lists etc. and make the original CSS look completely unstyled.
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
