<template>
    <div class="login-container">
        <h1>Login</h1>

        <!-- login form -->
        <div class="login-form">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="username" />

            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="password"/>

            <button type="submit" @click="login">Login</button>
        </div>

    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const username = ref('');
    const password = ref('');

    const login = async () => {
        console.log('login', username.value, password.value)

        try {
            const response = await fetch('https://dev5-api-sneakers.onrender.com/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: username.value,
                    userPassword: password.value,
                }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            // Handle successful login
            const responseData = await response.json();
            console.log('Login successful', responseData);

            // Save the token to local storage
            localStorage.setItem('token', responseData.data.token);
            localStorage.setItem('username', responseData.data.user.userName);
        } catch (error) {
            console.error('Login error:', error.message);
            // Handle login error, display a message to the user, etc.
        }
    }
</script>


<style scoped>
    .login-container {
        display: flex;
        flex-direction: column;
        gap: 1em;
        background-color: #000;
        max-width: 500px;
        margin: 0 auto;
    }
    .login-form {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    h1 {
        color: #fff;
        text-align: center;
    }
    label {
        color: #fff;
    }
    input {
        padding: 0.5em;
    }
    button {
        padding: 0.5em;
    }
    
</style>