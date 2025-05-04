<template>
  <div class="container mt-4">
    <router-link to="/customer/products" class="btn btn-secondary mb-3">
      ← Back to Products
    </router-link>

    <h2>Your Cart</h2>
    <table class="table" v-if="cart.length">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="index">
          <td>{{ item.name }}</td>
          <td>${{ item.price }}</td>
          <td>
            <button class="btn btn-sm btn-danger" @click="removeItem(index)">
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>

    <div class="mt-3" v-if="cart.length">
      <h5>Total: ${{ total }}</h5>
      <router-link to="/customer/checkout" class="btn btn-primary">
        Proceed to Checkout
      </router-link>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      cart: [],
    };
  },
  computed: {
    total() {
      return this.cart
        .reduce((sum, item) => sum + parseFloat(item.price), 0)
        .toFixed(2);
    },
  },
  methods: {
    loadCart() {
      this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    },
    removeItem(index) {
      this.cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
  mounted() {
    this.loadCart();
  },
};
</script>
