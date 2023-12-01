<template>
  <header class="header">
    <router-link to="/">
      <div class="header__logo">
        <img
          class="header__img"
          src="../assets/SWEAR_Logo.webp"
          alt="SWEAR-LOGO"
        />
      </div>
    </router-link>
    <router-link to="/login">
      <button class="header__admin-button" href="">Admin</button>
    </router-link>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  background-color: #242424;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  margin: 0;
  border-bottom: #d6ff38;
  border-width: 0 0 2px 0;
  border-style: solid;
}

.header__logo {
  flex-direction: column;
  align-items: start;
  padding: 43px;
  background-color: #d6ff38;
}

a {
  text-decoration: none;
  color: white;
}

.header__admin-button {
  color: #d6ff38;
  background-color: #000;
  width: 80%;
  max-width: 300px;
  height: 68px;
  font-family: "cooper-black-std", serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  display: block;
  margin-right: 100px;
}

@media (max-width: 600px) {
  .header__logo {
    flex-direction: column;
    align-items: start;
    padding: 20px;
    background-color: #d6ff38;
  }

  .header__admin-button {
    width: 60%;
    max-width: 200px;
    height: 30px;
    font-size: 12px;
    margin-right: 40px;
  }

  .header__img {
    width: 100px;
  }
}
</style>
