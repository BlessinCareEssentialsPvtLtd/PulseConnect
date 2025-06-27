import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
    base: './',
  preview: {
    host: '0.0.0.0',
    port: 4173, // or use process.env.PORT if needed
    allowedHosts: ['pulseconnect-2jrn.onrender.com']
  }
})


