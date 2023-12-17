<template>
  <div>
    <h1 class="admin-title">Hello admin!</h1>
    <button class="admin-password-change">
      <router-link to="/changepassword" class="admin-password-change__link"
        >Change password</router-link
      >
    </button>
    <button @click="logout" class="admin-logout-button">Logout</button>

    <h1 class="orders-title">All orders ({{ shoes.length }})</h1>

    <div class="orders-container">
      <div
        v-for="shoe in shoes"
        :key="shoe.id"
        class="orders-container__shoe-item"
      >
        <div class="orders-container__shoe-info">
          <p id="type" class="shoe-info__type">{{ shoe.shoeType }}</p>
          <p class="orders-container__shoe-info__status">
            Status: {{ shoe.status }}
          </p>
          <p class="orders-container__shoe-info__size">
            Size: {{ shoe.shoeSize }}
          </p>
          <p class="orders-container__shoe-info__user">
            User: {{ shoe.userName }}
          </p>
        </div>
        <button class="orders-container__view-button">
          <router-link
            :to="'/shoe/' + shoe._id"
            @click="viewShoe(shoe._id)"
            class="view-button__link"
            >View</router-link
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

let socket = null;

export default {
  data() {
    return {
      shoes: [],
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
      return;
    }
    if (token) {
      this.fetchShoes(token);
    }

    this.socketConnect();
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    async fetchShoes(token) {
      try {
        const response = await fetch(
          "https://dev5-api-sneakers.onrender.com/api/v1/shoes",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
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
      this.$router.push(`/shoe/${shoeId}`);
    },
    socketConnect() {
      socket = new WebSocket("wss://shoe-config-ws.onrender.com/primus");

      socket.onopen = () => {};

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.data) {
          this.shoes.push(data.data.shoe);
        }

        if (data.action === "updateStatus") {
          const index = this.shoes.findIndex(
            (shoe) => shoe._id === data.shoe._id
          );

          if (index !== -1) {
            this.shoes[index] = data.shoe;
          }
        }

        if (data.action === "deleteOrder") {
          this.shoes = this.shoes.filter((shoe) => shoe._id !== data.shoeId);
        }
      };
    },
  },
};
</script>
