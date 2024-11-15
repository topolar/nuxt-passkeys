<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center px-2 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-4 sm:space-y-8">
      <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-xl rounded-lg p-4 sm:p-8">
        <div class="text-center mb-6 sm:mb-8">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Admin Panel
          </h2>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Welcome back, {{ userSession.user.value?.userName }}!
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div class="px-3 py-4 sm:px-6 sm:py-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Account Information
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Your personal account details
            </p>
          </div>
          <div class="border-t border-gray-200 dark:border-gray-700 px-3 py-4 sm:px-6 sm:py-5">
            <dl class="grid grid-cols-1 gap-x-3 gap-y-4 sm:gap-x-4 sm:gap-y-6 sm:grid-cols-2">
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Username
                </dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-gray-300">
                  {{ userSession.user.value?.userName }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Session Status
                </dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-gray-300">
                  Active
                </dd>
              </div>
              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  User ID
                </dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-gray-300">
                  {{ userSession.user.value?.id }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Created At
                </dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-gray-300">
                  {{ new Date(userSession.user.value?.createdAt).toLocaleString() }}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div class="flex flex-col space-y-3 sm:space-y-4 mt-6 sm:mt-8">
          <NuxtLink
            to="/"
            class="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900 transition-colors duration-200"
          >
            <Icon
              name="ph:arrow-left-bold"
              class="w-5 h-5 mr-2"
            />
            Back to Home
          </NuxtLink>

          <button
            @click="logout"
            class="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900 transition-colors duration-200"
          >
            <Icon
              name="ph:sign-out-bold"
              class="w-5 h-5 mr-2"
            />
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const userSession = useUserSession()

async function logout() {
  userSession.clear()
  await navigateTo('/')
}
</script>