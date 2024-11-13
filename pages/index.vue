<template>
  <div>
    <h1>Passkey Auth Example</h1>
    <div v-if="loggedIn">
      Authentificated as {{ user?.userName }} <NuxtLink to="/admin">Open Admin</NuxtLink>
    </div>
    <div v-else>
      <NuxtLink to="/auth">Open Auth Page</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { user, loggedIn } = useUserSession();
</script>