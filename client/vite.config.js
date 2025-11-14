import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Set base path for GitHub Pages: https://Suyash-666.github.io/UserEnquiry/
  base: "/UserEnquiry/",
})
