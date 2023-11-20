<template>
  <div>
    <h1 class="text-5xl text-center uppercase">{{ route.params.id }}</h1>
    <nav class="text-2xl flex justify-center gap-2">
      <RouterLink :to="route.params.id + '/writing'">Writing</RouterLink>
      <RouterLink :to="route.params.id + '/sorting'">Sorting</RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
</script>
