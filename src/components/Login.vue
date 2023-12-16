<template>
  <div class="login-container">
    <h1 class="login-container__title">Admin login</h1>

    <div class="login-form">
      <label for="username" class="login-form__label">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        v-model="username"
        class="login-form__input"
      />

      <label for="password" class="login-form__label">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        v-model="password"
        class="login-form__input"
      />

      <button type="submit" @click="login" class="login-form__button">
        Login
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const password = ref("");

const isTokenValid = (token) => {
  if (!token) {
    return false;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));
  const expirationTime = payload.exp * 1000;

  return Date.now() < expirationTime;
};

const login = async () => {
  try {
    const token = localStorage.getItem("token");

    if (isTokenValid(token)) {
      router.push("/orders");
      return;
    }

    const response = await fetch(
      "https://dev5-api-sneakers.onrender.com/api/v1/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username.value,
          userPassword: password.value,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const responseData = await response.json();
    localStorage.setItem("token", responseData.data.token);
    localStorage.setItem("username", responseData.data.user.userName);

    router.push("/orders");
  } catch (error) {
    console.error("Login error:", error.message);
  }
};

onMounted(() => {
  const token = localStorage.getItem("token");

  if (isTokenValid(token)) {
    router.push("/orders");
  }
});
</script>

<style scoped>
a {
  text-decoration: none;
  color: var(--color-accent);
}
.login-container {
  background-color: #242424;
  width: 100vw;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.login-container__title {
  color: #fff;
  text-align: center;
  margin-top: 0;
  padding-top: 2em;
  font-family: "cooper-black-std", serif;
  font-weight: 400;
  font-size: 36px;
  margin-bottom: 50px;
}
.login-form__label {
  font-family: "basic-sans", sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: white;
  display: block;
  margin: auto;
}

.login-form__button {
  color: var(--color-accent);
  background-color: #000;
  width: 60%;
  max-width: 300px;
  height: 68px;
  font-family: "cooper-black-std", serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  display: block;
  margin: auto;
  margin-top: 40px;
}

.login-form__input {
  border: 2px solid white;
  background-color: #242424;
  color: white;
  width: 60%;
  max-width: 300px;
  height: 30px;
  font-family: "cooper-black-std", serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  display: block;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 20px;
}

.login-form__input:focus {
  outline: none;
  border: 2px solid var(--color-accent);
}
</style>
