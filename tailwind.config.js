/** @type {import('tailwindcss').Config} */
export default {
  /**
   * Content Configuration
   * Defines the paths to all template files so Tailwind can tree-shake unused styles
   * and optimize the final CSS bundle for production.
   */
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    /**
     * Design System Extensions
     * This section allows for the customization of the default design tokens 
     * (colors, spacing, fonts) without overriding the core framework.
     */
    extend: {},
  },

  /**
   * Plugin Integration
   * Allows for the addition of third-party utilities or custom component 
   * libraries to enhance the UI framework.
   */
  plugins: [],
}