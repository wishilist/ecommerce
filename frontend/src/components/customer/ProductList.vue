<template>
  <div class="container mt-4">
    <h2>Store</h2>
    <div>
      <nav>
        <button class="btn btn-primary" @click="logout">Logout</button>
        <router-link to="/customer/cart" class="btn btn-secondary ms-2">Cart</router-link>
      </nav>
    </div>
    
    <div class="row">
      <div class="col-md-4" v-for="product in products" :key="product.id">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="text-primary fw-bold">${{ product.price }}</p>
            <button class="btn btn-success w-100" @click="addToCart(product)">
              Add to Cart
            </button>
          </div>
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
      products: [],
    };
  },
  methods: {
    fetchProducts() {
      axios.get("products/").then((res) => {
        this.products = res.data;
      });
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      localStorage.removeItem("cart");
      localStorage.removeItem("role");
      localStorage.removeItem("projects");
      this.$router.push("/login");
    },
    addToCart(product) {
  let quantity = prompt("Enter quantity:");

  // Validate input: must be a number > 0 and an integer
  quantity = parseInt(quantity);
  if (isNaN(quantity) || quantity <= 0) {
    alert("Please enter a valid quantity (a number greater than 0).");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // Clone product and add quantity field
  const productWithQuantity = { ...product, quantity };

  cart.push(productWithQuantity);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`Added ${quantity} of ${product.name} to cart.`);
}
,
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
