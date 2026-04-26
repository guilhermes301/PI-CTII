import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Voltamos para o padrão
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // Desativa o motor antigo para sumir com o aviso de 'deprecated'
  esbuild: false, 
  appType: 'spa',
  plugins: [
    react(), 
    VitePWA({
      registerType: 'prompt', 
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },

      devOptions: {
        enabled: true,
        suppressWarnings: true,
        type: 'module',
      },

      manifest: {
        name: 'BarberPro App',
        short_name: 'BarberPro',
        description: 'Agendamento de Barbearia',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})