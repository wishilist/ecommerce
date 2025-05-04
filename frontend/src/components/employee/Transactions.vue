<template>
  <div class="container mt-5">
    <!-- Back Button -->
    <button class="btn btn-secondary mb-3" @click="goBack">
      ← Back
    </button>

    <h2 class="mb-4">Transactions</h2>

    <!-- Filter by Exact Date -->
    <div class="mb-4 row g-3 align-items-center">
      <div class="col-auto">
        <label for="filterDate" class="col-form-label">Select Date:</label>
      </div>
      <div class="col-auto">
        <input
          type="date"
          id="filterDate"
          v-model="filterDate"
          class="form-control"
        />
      </div>
    </div>

    <div v-if="filteredOrders.length === 0">No transactions available.</div>

    <div
      v-for="order in filteredOrders"
      :key="order.id"
      class="card mb-3 shadow-sm"
    >
      <div class="card-body">
        <h5 class="card-title">Order #{{ order.id }}</h5>
        <p class="card-text">Date: {{ formatDate(order.created_at) }}</p>
        <button
          class="btn btn-outline-primary"
          @click="toggleProducts(order.id)"
        >
          {{ expandedOrders.includes(order.id) ? "Hide" : "View" }} Products
        </button>

        <div v-if="expandedOrders.includes(order.id)" class="mt-3">
          <ul v-if="order.items && order.items.length">
            <li
              v-for="item in order.items"
              :key="item.product.id"
              class="list-group-item"
            >
              ☕ {{ item.product.name }} — ${{ item.product.price }} × {{ item.quantity }}
            </li>
          </ul>
          <div v-else>Loading products...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios";

export default {
  data() {
    return {
      orders: [],
      expandedOrders: [],
      filterDate: "", // only one date
    };
  },
  computed: {
    filteredOrders() {
      if (!this.filterDate) return this.orders;
      return this.orders.filter((order) => {
        const orderDate = new Date(order.created_at).toISOString().split("T")[0];
        return orderDate === this.filterDate;
      });
    },
  },
  methods: {
    async fetchOrders() {
      try {
        const res = await axios.get("/orders/");
        this.orders = res.data;
      } catch (err) {
        alert("Failed to load transactions");
      }
    },
    async toggleProducts(orderId) {
      const index = this.expandedOrders.indexOf(orderId);
      if (index !== -1) {
        this.expandedOrders.splice(index, 1);
      } else {
        const order = this.orders.find((o) => o.id === orderId);
        if (!order.items) {
          try {
            const res = await axios.get(`/orders/${orderId}/`);
            order.items = res.data.items;
          } catch (err) {
            alert("Failed to load products for order");
            return;
          }
        }
        this.expandedOrders.push(orderId);
      }
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    goBack() {
      this.$router.go(-1); // Go back to previous page
    },
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>
