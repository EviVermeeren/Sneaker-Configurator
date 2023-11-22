<template>
  <h1>All orders</h1>
  <div class="container">
    <div v-for="shoe in shoes" :key="shoe.id" class="shoe-item">
      <div class="shoe-info">
        <img src="../assets/shoe.webp" alt="ordered shoe" />
        <p id="type">{{ shoe.shoeType }}</p>
        <p>Status: {{ shoe.status }}</p>
        <p>Size: {{ shoe.shoeSize }}</p>
        <p>User: {{ shoe.userName }}</p>
      </div>
      <button @click="viewShoe(shoe.id)">View</button>
    </div>
  </div>
</template>

<script>
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
      // Handle view button click, e.g., navigate to a detail page
      console.log("View shoe with ID:", shoeId);
    },
  },
};
</script>

<style scoped>
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

img {
  width: 200px;
}
</style>
