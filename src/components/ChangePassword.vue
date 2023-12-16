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
  const token = localStorage.getItem("token");

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
        Authorization: `${token}`,
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