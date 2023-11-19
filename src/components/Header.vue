<template>
  <header>
    <div class="shoe-desc">
      <img src="../assets/SWEAR_Logo.webp" alt="SWEAR-LOGO" />
    </div>
    <a class="link" href="">Admin</a>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
header {
  background-color: #fff;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  margin: 0;
  border-bottom: #000;
  border-width: 0 0 2px 0;
  border-style: solid;
}

.shoe-desc {
  flex-direction: column;
  align-items: start;
  padding: 43px;
  background-color: #d6ff38;
}

.link {
  font-family: "basic-sans", sans-serif;
  font-weight: 400;
  color: #000000;
  font-size: 24px;
  letter-spacing: 0.96px;
  line-height: normal;
  text-decoration: underline;
  margin-right: 43px;
}
</style>
