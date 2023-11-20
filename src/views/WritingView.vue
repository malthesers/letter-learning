<template>
  <div>
    <h1>Writing {{ route.params.id }}</h1>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
</script>
