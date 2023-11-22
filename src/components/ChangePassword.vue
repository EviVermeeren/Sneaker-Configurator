<template>
  <div class="login-container">
    <h1>Admin login</h1>

    <!-- login form -->
    <div class="login-form">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" v-model="username" />

      <label for="password">Password</label>
      <input type="password" id="password" name="password" v-model="password" />

      <button type="submit" @click="login">Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // Import useRouter

const router = useRouter(); // Get the router instance

const username = ref("");
const password = ref("");

const login = async () => {
  console.log("login", username.value, password.value);

  try {
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

    // Handle successful login
    const responseData = await response.json();
    console.log("Login successful", responseData);

    // Save the token to local storage
    localStorage.setItem("token", responseData.data.token);
    localStorage.setItem("username", responseData.data.user.userName);

    // Redirect to the orders page
    router.push("/orders");
  } catch (error) {
    console.error("Login error:", error.message);
    // Handle login error, display a message to the user, etc.
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #d6ff38;
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
h1 {
  color: #fff;
  text-align: center;
  margin-top: 0;
  padding-top: 4em;
  font-family: "cooper-black-std", serif;
  font-weight: 400;
  font-size: 36px;
  margin-bottom: 50px;
}
label {
  font-family: "basic-sans", sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: white;
  display: block;
  margin: auto;
}

button {
  color: #d6ff38;
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

input {
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

input:focus {
  outline: none;
  border: 2px solid #d6ff38;
}
</style>
