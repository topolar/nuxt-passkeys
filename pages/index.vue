<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center px-2 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-4 sm:space-y-8">
      <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-xl rounded-lg p-4 sm:p-8">
        <div>
          <h2 class="mt-2 text-center text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome to Passkeys
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {{ loggedIn ? `Authenticated as ${user?.userName}` : 'Experience passwordless authentication' }}
          </p>
        </div>
        
        <div class="flex flex-col items-center space-y-3 sm:space-y-4 mt-6 sm:mt-8">
          <div v-if="!loggedIn" class="w-full">
            <button
              @click="login"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900 transition-colors duration-200"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <Icon
                  name="ph:fingerprint-duotone"
                  class="h-5 w-5 text-white group-hover:text-white dark:text-white dark:group-hover:text-white"
                />
              </span>
              Login with Passkey
            </button>
            
            <div class="mt-4 text-center">
              <NuxtLink
                to="/register"
                class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
              >
                Don't have a passkey? Register now
              </NuxtLink>
            </div>
          </div>

          <div v-else class="w-full space-y-4">
            <NuxtLink
              to="/admin"
              class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900 transition-colors duration-200"
            >
              Go to Admin Panel
            </NuxtLink>
            
            <button
              @click="logout"
              class="w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        <div class="mt-6 sm:mt-8 w-full">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg px-2 text-sm text-gray-500 dark:text-gray-400">About Passkeys</span>
            </div>
          </div>
          <p class="mt-4 text-center text-gray-600 dark:text-gray-400 text-sm">
            This is an example implementation of passwordless authentication using WebAuthn.
            Say goodbye to forgotten passwords thanks to
            <a href="https://webauthn.guide" class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200">
              WebAuthn
            </a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, loggedIn, clear, fetch } = useUserSession()
const webAuthn = useWebAuthn()

async function login() {
  if (!await webAuthn.authenticate()) {
    throw new Error('webAuth.authenticate failed!')
  }
  await fetch()
  await navigateTo('/')
}

async function logout() {
  clear()
}
</script>