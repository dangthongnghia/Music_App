import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
    preview: {
    port: 4173,
    host: true,
    allowedHosts: ['music-app-nqq4.onrender.com']
  }
 
})
