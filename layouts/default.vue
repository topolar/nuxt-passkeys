<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 transition-colors duration-200 flex flex-col">
    <nav class="bg-white/80 backdrop-blur-lg dark:bg-gray-800/80 shadow">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div class="flex justify-between h-14 sm:h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <NuxtLink to="/" class="flex items-center space-x-2">
                <Icon
                  name="ph:fingerprint-duotone"
                  class="h-8 w-8 text-primary-600 dark:text-primary-500"
                />
                <span class="text-2xl font-bold text-gray-900 dark:text-white">Passkeys</span>
              </NuxtLink>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="hidden md:ml-4 md:flex md:items-center md:space-x-4">
              <template v-if="!loggedIn">
                <NuxtLink to="/register" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Register</NuxtLink>
              </template>
              <template v-else>
                <NuxtLink to="/admin" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Admin</NuxtLink>
                <button @click="logout" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
              </template>
            </div>
            <button 
              @click="toggleTheme" 
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-2 rounded-lg transition-colors duration-200"
              :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <Icon
                v-if="isDark"
                name="ph:sun-bold"
                class="w-5 h-5"
              />
              <Icon
                v-else
                name="ph:moon-bold"
                class="w-5 h-5"
              />
            </button>
            <a 
              href="https://github.com/topolar/nuxt-passkeys" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200"
              title="View source on GitHub"
            >
              <Icon
                name="mdi:github"
                class="h-6 w-6"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow max-w-7xl w-full mx-auto py-4 sm:py-6 px-2 sm:px-6 lg:px-8">
      <slot />
    </main>

    <footer class="bg-white/80 backdrop-blur-lg dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div class="max-w-7xl mx-auto py-4 sm:py-6 px-2 sm:px-4 lg:px-8">
        <div class="text-center text-gray-500 dark:text-gray-400 text-sm space-y-2">
          <p>
            Powered by 
            <a href="https://webauthn.guide" class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200">WebAuthn</a>
            and
            <a href="https://nuxt.com" class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200">Nuxt.js</a>
          </p>
          <p>
            Developed by 
            <a href="https://github.com/topolar" class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200">
              Miroslav Topolář
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { loggedIn, clear } = useUserSession()
const { isDark, toggleTheme } = useTheme()

async function logout() {
  clear()
  await navigateTo('/')
}
</script>
