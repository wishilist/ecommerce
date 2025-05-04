<template>
  <div class="container mt-4">
    <h2>Checkout</h2>
    <p>Total amount: ${{ total }}</p>

    <form @submit.prevent="submitOrder">
      <div class="mb-3">
        <label for="address" class="form-label">Shipping Address</label>
        <input v-model="address" id="address" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-success">Place Order</button>
    </form>
  </div>
</template>

<script>
import axios from "../../axios";

export default {
  data() {
    return {
      cart: [],
      address: "", // Optional if you're not using it in your model
      customerId: null, // 🧠 You'll need to fetch or store the logged-in user's ID
    };
  },
  computed: {
    total() {
      return this.cart
        .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
        .toFixed(2);
    },
  },
  methods: {
    submitOrder() {
      const orderData = {
        customer: this.customerId,
        write_items: this.cart.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        })),
      };
      axios
        .post("orders/", orderData)
        .then(() => {
          alert("Order placed successfully!");
          localStorage.removeItem("cart");
          this.$router.push("/customer/products");
        })
        .catch((err) => {
          console.error(err);
          alert("Something went wrong");
        });
    },
    getUserInfo() {
      // You could also get this from a Vuex store or JWT if you’ve got auth set up
      axios
        .get("/users/")
        .then((res) => {
          this.customerId = res.data.customerId;
        })
        .catch(() => {
          alert("Could not get user info");
        });
    },
  },
  mounted() {
    this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    this.getUserInfo();
  },
};
</script>

