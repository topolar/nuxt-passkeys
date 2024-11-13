<template>
  <div>
    <h1>Administration</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})

const userSession = useUserSession()

function logout() {
  userSession.clear();
  navigateTo('/');
}
</script>