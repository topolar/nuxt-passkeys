<template>
  <div>
    <h1>Administration for {{ userSession.user.value?.userName }}</h1>
    <div>
      Guarded route by middleware
    </div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})

const userSession = useUserSession()

async function logout() {
  userSession.clear();
  await navigateTo('/');
}
</script>