import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//add new address to the code  http://localhost:5173/

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Your existing config (plugins, etc.) goes here
  server: {
    host: true    ,  // Binds to 0.0.0.0, allowing external/tunnel access
    port: 5173,  // Default Vite port; change if needed
    hmr: {
      clientPort: 443,  // Use HTTPS port for Cloudflare
      host: 'selecting-beneficial-crossing-sustainability.trycloudflare.com',  // Tunnel domain change to new generate `domain
      protocol: 'wss',  // Explicitly use WebSocket Secure
      overlay: false,   // Disable HMR error overlay for debugging
    },
  },
})

