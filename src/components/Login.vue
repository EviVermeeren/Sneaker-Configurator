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
import Swal from "sweetalert2";

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
      let errorText = await response.text();

      // Try to parse the error text as JSON
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.error || "Login failed");
      } catch (jsonError) {
        throw new Error(errorText || "Login failed");
      }
    }

    const responseData = await response.json();
    localStorage.setItem("token", responseData.data.token);
    localStorage.setItem("username", responseData.data.user.userName);

    router.push("/orders");
  } catch (error) {
    console.error("Login error:", error.message);
    if (error.message.includes("Too many login attempts")) {
      Swal.fire({
        icon: "error",
        title: "Rate Limit Exceeded",
        text: error.message,
        confirmButtonColor: "#242424",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Please check your username and password and try again.",
        confirmButtonColor: "#242424",
      });
    }
  }
};

onMounted(() => {
  const token = localStorage.getItem("token");

  if (isTokenValid(token)) {
    router.push("/orders");
  }
});
</script>