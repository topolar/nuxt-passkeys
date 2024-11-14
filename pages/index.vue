<template>
  <div>
    <h1>Passkey Auth Example</h1>
    <div v-if="loggedIn">
      Authentificated as {{ user?.userName }}
    </div>
    <div class="menu">
      <button @click="login" v-if="!loggedIn">Login</button>
      <NuxtLink to="/register" v-if="!loggedIn">Register</NuxtLink>
      <template v-if="loggedIn">
        <NuxtLink to="/admin">Open Admin</NuxtLink>
        <button @click="logout">Logout</button>
      </template>
    </div>
    <div class="info">
      This is example implementation of Passwordless identification.
      Say bye to forgotten passwords thanks to <NuxtLink to="https://webauthn.guide">webauthn</NuxtLink>.
    </div>
  </div>
</template>

<script lang="ts" setup>
const { user, loggedIn, clear, fetch } = useUserSession();
const userName = ref();
const webAuthn = useWebAuthn()

async function login() {
  if (!await webAuthn.authenticate()) {
    throw new Error('webAuth.authenticate failed!')
  }
  await fetch();
  await navigateTo('/');
}

async function logout() {
  clear();
}
</script>
<style scoped>
.menu {
  margin-block: 1em;
  display: flex;
  gap: 1em;
}

.info {
  margin-block: 1em;
  max-width: 24em;
}
</style>