<template>
  <h1>Hello admin!</h1>
  <button id="passwordchange">
    <router-link to="/changepassword">Change password</router-link>
  </button>
  <h1>All orders</h1>
  <div class="container">
    <div v-for="shoe in shoes" :key="shoe.id" class="shoe-item">
      <div class="shoe-info">
        <p id="type">{{ shoe.shoeType }}</p>
        <p>Status: {{ shoe.status }}</p>
        <p>Size: {{ shoe.shoeSize }}</p>
        <p>User: {{ shoe.userName }}</p>
      </div>
      <button>
        <router-link :to="'/shoe/' + shoe._id" @click="viewShoe(shoe._id)"
          >View</router-link
        >
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router"; // Import useRouter

export default {
  data() {
    return {
      shoes: [],
    };
  },
  mounted() {
    this.fetchShoes();
  },
  methods: {
    async fetchShoes() {
      try {
        const response = await fetch(
          "https://dev5-api-sneakers.onrender.com/api/v1/shoes"
        );
        const data = await response.json();

        if (data.status === "success") {
          this.shoes = data.data.shoes;
        } else {
          console.error("Error fetching shoes:", data.message);
        }
      } catch (error) {
        console.error("Error fetching shoes:", error);
      }
    },
    viewShoe(shoeId) {
      // Navigate to the detail page using router-link
      this.$router.push(`/shoe/${shoeId}`);
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #d6ff38;
}
h1 {
  font-family: "cooper-black-std", serif;
  font-weight: 400;
  color: white;
  font-size: 36px;
  letter-spacing: 1.08px;
  line-height: normal;
  margin-top: 50px;
  margin-left: 100px;
}

#type {
  font-family: "cooper-black-std", serif;
  font-weight: 400;
  color: white;
  font-size: 18px;
  line-height: normal;
  white-space: nowrap;
  margin-top: 10px;
}

p {
  font-family: "basic-sans", sans-serif;
  font-weight: 400;
  color: white;
  font-size: 16px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
}
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #242424;
  padding-top: 50px;
  margin-left: 80px;
}

.shoe-item {
  border: 1px solid #d6ff38;
  padding: 10px;
  margin-bottom: 10px;
}

.shoe-info {
  flex-grow: 1;
}

button {
  color: #d6ff38;
  background-color: #000;
  width: 90%;
  height: 50px;
  font-family: "cooper-black-std", serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  display: block;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}

#passwordchange {
  color: #d6ff38;
  background-color: #000;
  width: 100%;
  max-width: 300px;
  height: 50px;
  font-family: "cooper-black-std", serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  display: block;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 100px;
}

img {
  width: 200px;
}
</style>
