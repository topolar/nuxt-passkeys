<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center px-2 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-4 sm:space-y-8">
      <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-xl rounded-lg p-4 sm:p-8">
        <div>
          <h2 class="mt-2 text-center text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Set up passwordless authentication for your account
          </p>
        </div>
        
        <div class="mt-6 sm:mt-8 space-y-6">
          <div class="rounded-md -space-y-px">
            <div>
              <label for="username" class="sr-only">Username</label>
              <input
                id="username"
                v-model="userName"
                type="text"
                required
                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition-colors duration-200"
                placeholder="Username (optional)"
              />
            </div>
          </div>

          <div>
            <button
              @click="register"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900 transition-colors duration-200"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <Icon
                  name="ph:fingerprint-duotone"
                  class="h-5 w-5 text-white group-hover:text-white dark:text-white dark:group-hover:text-white"
                />
              </span>
              Register with Passkey
            </button>
          </div>
        </div>

        <div class="mt-6 text-center">
          <NuxtLink
            to="/"
            class="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
          >
            Already have an account? Sign in
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import humanId from 'human-id'

definePageMeta({
  middleware: 'guest'
})

const userName = ref('')
const userSession = useUserSession()
const webAuthn = useWebAuthn()

async function register() {
  if (!await webAuthn.register({ userName: userName.value || humanId() })) {
    throw new Error('webAuth.register failed!')
  }
  await userSession.fetch()
  await navigateTo('/')
}
</script>