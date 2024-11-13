<template>
  <div>
    <h1>Authentification</h1>
    <div>
      User Name:
      <input v-model="userName" />
      <button @click="login">login</button>
      <button :disabled="!userName?.length" @click="register">register</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'guest'
})

const userName = ref();
const userSession = useUserSession()
const webAuthn = useWebAuthn()

async function register() {
  if (!await webAuthn.register({ userName: userName.value })) {
    throw new Error('webAuth.register failed!')
  }
  await userSession.fetch();
  await navigateTo('/admin');
}

async function login() {
  if (!await webAuthn.authenticate(userName.value)) {
    throw new Error('webAuth.authenticate failed!')
  }
  await userSession.fetch();
  await navigateTo('/');
}
</script>