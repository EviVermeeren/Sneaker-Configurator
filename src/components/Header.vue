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

<style scoped>
.headerMain {
  background-color: #242424;
  background-image: url("../media/header1.png");
  background-size: 40%;
  background-position: center;
  color: #000;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  margin: 0;
  border-bottom: var(--color-accent);
  border-width: 0 0 2px 0;
  border-style: solid;
  height: 100px;

  animation: loopBackground 50s infinite alternate ease-in-out;
}

@keyframes loopBackground {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% 100%;
  }
}

.headerMain__logo {
  flex-direction: column;
  align-items: start;
  padding: 32px;
  background-color: var(--color-accent);
}

a {
  text-decoration: none;
  color: white;
}

.headerMain__admin-button {
  color: var(--color-accent);
  background-color: #000;
  width: 80%;
  max-width: 300px;
  height: 50px;
  font-family: "cooper-black-std", serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  display: block;
  margin-right: 100px;
  margin-top: 30px;
}

@media (max-width: 600px) {
  .headerMain {
    height: 63px;
  }
  .headerMain__logo {
    flex-direction: column;
    align-items: start;
    padding: 20px;
    background-color: var(--color-accent);
  }

  .headerMain__admin-button {
    width: 60%;
    max-width: 200px;
    height: 30px;
    font-size: 12px;
    margin-right: 40px;
    margin-top: 20px;
    margin-bottom: 0px;
  }

  .headerMain__img {
    width: 100px;
  }
}
</style>
