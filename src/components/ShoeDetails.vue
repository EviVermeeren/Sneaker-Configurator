<template>
  <div class="bgc">
    <div class="flex">
      <div>
        <img src="../assets/shoe.webp" alt="SHOE" />
      </div>
      <div>
        <h1 id="type">{{ shoe.shoeType }}</h1>
        <h2>{{ shoe.userName }}</h2>
        <p>Shipping adress: {{ shoe.userAddress }}</p>
        <p>Size: {{ shoe.shoeSize }}</p>
        <p>Status: {{ shoe.status }}</p>
        <div class="buttons">
          <button>Update status to “in production”</button>
          <button>Update status to “in transit”</button>
          <button>Update status to “complete”</button>
          <button>Delete order</button>
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
.bgc {
  background-color: #fff;
  height: 100vh;
}
a {
  text-decoration: none;
  color: #d6ff38;
}
h1 {
  font-family: "cooper-black-std", serif;
  font-weight: 400;
  color: #000000;
  font-size: 36px;
  letter-spacing: 1.08px;
  line-height: normal;
  margin: 0;
}

h2 {
  font-family: "cooper-black-std", serif;
  font-weight: 400;
  color: #000000;
  font-size: 20px;
  letter-spacing: 0.72px;
  line-height: normal;
  white-space: nowrap;
  margin: 0;
}

p {
  font-family: "basic-sans", sans-serif;
  font-weight: 400;
  color: #000000;
  font-size: 16px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding: 43px;
  gap: 100px;
  padding-top: 100px;
}

img {
  width: 25vw;
}
.buttons {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

button {
  width: 299px;
  height: 36px;
  top: 0;
  left: 0;
  background-color: #000000;
  font-family: "basic-sans", sans-serif;
  font-weight: 700;
  color: #d6ff38;
  font-size: 14px;
  letter-spacing: 1.61px;
  line-height: normal;
}
</style>
