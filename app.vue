<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">

const errorMessage = ref();
function errorHandler(e: unknown) {
  console.error(e);
  errorMessage.value = `Unhandled Error ${e}`;

}
</script>

<style scoped>
.error {
  text-align: center;
  color: red;
  margin: auto;
  max-width: 32em;
}

.error div {
  text-align: left;
}
</style>