<template>
  <div>
    <h1>Order</h1>
    <div class="container">
      <div class="shoe-item">
        <div class="shoe-info">
          <img src="../assets/shoe.webp" alt="ordered shoe" />
          <p id="type">{{ shoe.shoeType }}</p>
          <p>Status: {{ shoe.status }}</p>
          <p>Size: {{ shoe.shoeSize }}</p>
          <p>User: {{ shoe.userName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      shoeId: this.$route.params.id,
      shoe: {},
    };
  },
  mounted() {
    this.fetchShoes();
  },
  methods: {
    async fetchShoes() {
      try {
        const response = await fetch(
          `https://dev5-api-sneakers.onrender.com/api/v1/shoes?id=${this.shoeId}`
        );
        const data = await response.json();

        if (data.status === "success") {
          this.shoe = data.data.shoe || {}; // Use empty object if undefined
        } else {
          console.error("Error fetching shoes:", data.message);
        }
      } catch (error) {
        console.error("Error fetching shoes:", error);
      }
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
