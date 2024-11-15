<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Set up passwordless authentication for your account
        </p>
      </div>
      
      <div class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              v-model="userName"
              type="text"
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Username (optional)"
            />
          </div>
        </div>

        <div>
          <button
            @click="register"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-primary-300 group-hover:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
            </span>
            Register with Passkey
          </button>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <div class="text-sm">
          <NuxtLink
            to="/"
            class="font-medium text-primary-600 hover:text-primary-500"
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