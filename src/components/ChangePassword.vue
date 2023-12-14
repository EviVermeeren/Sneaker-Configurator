<template>
  <div class="login-container">
    <h1 class="login-container__title">Change password</h1>

    <div class="login-form">
      <label for="oldpassword" class="login-form__label">Old password</label>
      <input
        type="password"
        id="oldpassword"
        name="oldpassword"
        v-model="oldpassword"
        class="login-form__input"
      />

      <label for="newpassword" class="login-form__label">New password</label>
      <input
        type="password"
        id="newpassword"
        name="newpassword"
        v-model="newpassword"
        class="login-form__input"
      />

      <button type="submit" @click="updatePassword" class="login-form__button">
        Change
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const oldpassword = ref("");
const newpassword = ref("");
const router = useRouter();

const updatePassword = async () => {
  const userId = "65513b6ffcea7b7baba6b737";
  const apiUrl = `https://dev5-api-sneakers.onrender.com/api/v1/users/${userId}`;

  const requestData = {
    currentPassword: oldpassword.value,
    newPassword: newpassword.value,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      router.push("/orders");
    } else {
      console.error("Error changing password", response.statusText);
    }
  } catch (error) {
    console.error("Error changing password", error);
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: var(--color-accent);
}
.login-container {
  background-color: #242424;
  width: 100vw;
  height: 100vh;
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
  margin-bottom: 80px;
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
