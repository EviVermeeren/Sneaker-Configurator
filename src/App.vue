<script setup>
import { useRoute } from "vue-router";
import Header from "./components/Header.vue";
import HeaderMinimal from "./components/HeaderMinimal.vue";

const route = useRoute();
</script>

<template>
  <Header v-if="route.path !== '/customize' && route.path !== '/config2'" />
  <HeaderMinimal v-else />
  <router-view />
</template>
