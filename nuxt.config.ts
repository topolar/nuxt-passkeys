// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['nuxt-auth-utils', '@nuxthub/core', '@nuxtjs/tailwindcss', 'nuxt-icon'],
  app: {
    head: {
      script: [
        {
          innerHTML: `
            if (localStorage.theme === 'dark' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
          `,
          type: 'text/javascript'
        }
      ]
    }
  },
  auth: {
    webAuthn: true
  },
  hub: {
    kv: true,
  },
  runtimeConfig: {
    nuxthub: {
      projectId: process.env.NUXTHUB_PROJECT_ID
    }
  }
})