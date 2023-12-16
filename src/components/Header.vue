<template>
  <header class="headerMain">
    <router-link to="/">
      <div class="headerMain__logo">
        <img
          class="headerMain__img"
          src="../assets/SWEAR_Logo.webp"
          alt="SWEAR-LOGO"
        />
      </div>
    </router-link>
    <router-link to="/login">
      <button class="headerMain__admin-button" href="">Admin</button>
    </router-link>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>