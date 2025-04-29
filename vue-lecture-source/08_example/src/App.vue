<script setup>

import Header from "@/components/layout/Header.vue";
</script>

<template>
  <div class="container">
    <Header/>
    <RouterView/>
  </div>
</template>

<style scoped>
.container {
  margin-top: 20px;
}
</style>