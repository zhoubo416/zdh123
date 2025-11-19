export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui'
  ],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'light',
    fallback: 'light'
  },
  ui: {
    primary: 'orange',
    gray: 'slate'
  },
  runtimeConfig: {
    // Private keys (only available on server-side)
    databaseUrl: process.env.DATABASE_URL,
    // Public keys (exposed to client-side)
    public: {
      apiBase: '/api'
    }
  },
  nitro: {
    experimental: {
      wasm: true
    }
  },
  ssr: true,
  vite: {
    define: {
      global: 'globalThis'
    }
  },
  plugins: [
    '~/plugins/buffer.client.ts'
  ]
})