<template>
  <div>
    <h1>Sorting {{ route.params.id }}</h1>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
</script>
