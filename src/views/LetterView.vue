<template>
  <div>
    <h1 class="text-5xl text-center uppercase">{{ route.params.id }}</h1>
    <nav class="text-2xl flex justify-center gap-2">
      <RouterLink to='writing'>Writing</RouterLink>
      <RouterLink to='sorting'>Sorting</RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
</script>
