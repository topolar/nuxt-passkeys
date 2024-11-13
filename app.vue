<template>
  <div>
    <NuxtErrorBoundary @error="errorHandler">
      <template #error="{ error }">
        {{ errorMessage }}
        <button @click="error.value = null">Continue</button>
      </template>
      <NuxtPage />
    </NuxtErrorBoundary>
  </div>
</template>

<script setup lang="ts">

const errorMessage = ref();
function errorHandler(e: unknown) {
  console.error(e);
  errorMessage.value = `Unhandled Error ${e}`;

}
</script>