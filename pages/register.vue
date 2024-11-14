<template>
  <div>
    <h1>Authentification</h1>
    <div>
      User Name:
      <input v-model="userName" placeholder="Optional" />
      <button @click="register">register</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import humanId from 'human-id';

definePageMeta({
  middleware: 'guest'
})

const userName = ref();
const userSession = useUserSession()
const webAuthn = useWebAuthn()

async function register() {
  if (!await webAuthn.register({ userName: userName.value ?? humanId() })) {
    throw new Error('webAuth.register failed!')
  }
  await userSession.fetch();
  await navigateTo('/');
}
</script>