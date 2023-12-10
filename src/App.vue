<script setup>
import { useRoute } from "vue-router";
import Header from "./components/Header.vue";
import HeaderMinimal from "./components/HeaderMinimal.vue";
// import ShoePage from "./components/ShoePage.vue";
// import Login from "./components/Login.vue";

const route = useRoute();
</script>

<template>
  
  <Header v-if="route.path !== '/customize'"/>
  <HeaderMinimal v-else/>
  <router-view />
  <!-- <ShoePage /> -->
  <!-- <login/> -->
</template>

<style scoped></style>
