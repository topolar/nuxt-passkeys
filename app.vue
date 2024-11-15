<template>
  <NuxtLayout>
    <NuxtErrorBoundary @error="errorHandler">
      <template #error="{ error }">
        <div class="error">
          <div>
            {{ errorMessage }}
          </div>
          <button @click="error.value = null">Continue</button>
        </div>
      </template>
      <NuxtPage />
    </NuxtErrorBoundary>
  </NuxtLayout>
</template>

<script setup lang="ts">
const errorMessage = ref();
function errorHandler(e: unknown) {
  console.error(e);
  if (e instanceof Error) {
    errorMessage.value = e.message;
  }
}
</script>

<style>
html {
  /* Prevent flash of incorrect theme */
  visibility: visible;
}

html.dark {
  color-scheme: dark;
}

.error {
  text-align: center;
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #f56565;
  border-radius: 0.5rem;
  background-color: #fff5f5;
  color: #c53030;
}

.error button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f56565;
  color: white;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
}
</style>