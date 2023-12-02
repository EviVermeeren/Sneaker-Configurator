<template>
  <h1 class="admin-title">Hello admin!</h1>
  <button id="passwordchange" class="admin-password-change">
    <router-link to="/changepassword" class="admin-password-change__link"
      >Change password</router-link
    >
  </button>
  <h1 class="orders-title">All orders ({{ shoes.length }})</h1>

  <div class="container">
    <div v-for="shoe in shoes" :key="shoe.id" class="shoe-item">
      <div class="shoe-info">
        <p id="type" class="shoe-info__type">{{ shoe.shoeType }}</p>
        <p class="shoe-info__status">Status: {{ shoe.status }}</p>
        <p class="shoe-info__size">Size: {{ shoe.shoeSize }}</p>
        <p class="shoe-info__user">User: {{ shoe.userName }}</p>
      </div>
      <button class="view-button">
        <router-link
          :to="'/shoe/' + shoe._id"
          @click="viewShoe(shoe._id)"
          class="view-button__link"
          >View</router-link
        >
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router"; // Import useRouter
import { ref, onMounted } from "vue";

let socket = null;

export default {
  data() {
    return {
      shoes: [],
      shoeCount: null,
    };
  },
  mounted() {
    this.fetchShoes();
    this.socketConnect();
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
          console.log("fetched shoes:", this.shoes);
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
    socketConnect() {
      socket = new WebSocket("wss://shoe-config-ws.onrender.com/primus");

      socket.onopen = () => {
        console.log("connected with WebSocket");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        console.log("Received WebSocket data:", data);

        if (data.data) {
          this.shoes.push(data.data.shoe);
          console.log("shoes:", data.data);
        }

        if (data.action === "updateStatus") {
          const index = this.shoes.findIndex(
            (shoe) => shoe._id === data.shoe._id
          );

          if (index !== -1) {
            // Directly update the array
            this.shoes[index] = data.shoe;
            console.log("Status updated through WebSocket:", data.shoe);
          }
        }
      };
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #d6ff38;
}
.admin-title {
  font-family: "cooper-black-std", serif;
  font-weight: 400;
  color: white;
  font-size: 36px;
  letter-spacing: 1.08px;
  line-height: normal;
  margin-top: 50px;
  margin-left: 100px;
}

.orders-title {
  font-family: "cooper-black-std", serif;
  font-weight: 400;
  color: white;
  font-size: 36px;
  letter-spacing: 1.08px;
  line-height: normal;
  margin-left: 100px;
  margin-top: 50px;
}

.order-count {
  display: flex;
  flex-direction: row;
  margin-left: 100px;
}

.order-count__label,
.order-count__value {
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
  justify-content: left;
  align-items: left;
  gap: 20px;
  background-color: #242424;
  margin-left: 100px;
}

.shoe-item {
  border: 1px solid #d6ff38;
  padding: 10px;
  margin-bottom: 10px;
}

.shoe-info {
  flex-grow: 1;
}

.shoe-info__type,
.shoe-info__status,
.shoe-info__size,
.shoe-info__user {
  font-family: "basic-sans", sans-serif;
  font-weight: 400;
  color: white;
  font-size: 16px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
}

.view-button {
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

.view-button__link {
  text-decoration: none;
  color: #d6ff38;
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

@media (max-width: 600px) {
  .admin-title {
    font-size: 30px;
    margin-top: 50px;
    margin-left: 50px;
  }

  .orders-title {
    font-size: 24px;
    margin-top: 50px;
    margin-left: 50px;
  }

  .container {
    margin-left: 50px;
  }

  .view-button {
    width: 80%;
    height: 30px;
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  #passwordchange {
    width: 80%;
    max-width: 200px;
    height: 40px;
    font-size: 14px;
    margin-left: 50px;
  }
}

@media (max-width: 300px) {
  .admin-title {
    font-size: 24px;
    margin-top: 30px;
    margin-left: 30px;
  }

  .orders-title {
    font-size: 20px;
    margin-top: 30px;
    margin-left: 30px;
  }

  .container {
    margin-left: 30px;
  }

  #passwordchange {
    max-width: 180px;
    margin-left: 30px;
  }
}
</style>
