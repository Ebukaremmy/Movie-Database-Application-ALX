import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite Configuration
 * This file handles the development server settings and the build pipeline. 
 * It optimizes the project for fast hot-module replacement and efficient production bundling.
 */
export default defineConfig({
  /**
   * Plugin Integration
   * Utilizes the official React plugin to enable JSX transformation 
   * and advanced developer tools like Fast Refresh.
   */
  plugins: [react()],
})