<script setup>
import HeaderComponent from "../src/components/Header.vue";
import FooterComponent from "../src/components/Footer.vue";
</script>

<template>
  <HeaderComponent />
  <router-view />
  <FooterComponent />
</template>

<style scoped></style>
