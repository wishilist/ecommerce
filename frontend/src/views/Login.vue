<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Login</h3>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label class="form-label">Username</label>
                <input
                  v-model="username"
                  type="text"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  required
                />
              </div>
              <button class="btn btn-primary w-100">Login</button>
              <div class="text-center mt-3">
                <router-link to="/register"
                  >Don't have an account? Register</router-link
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "../axios"; // Assuming axios is configured to handle base URL and authentication headers
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    // Send POST request to get the authentication token
    const res = await axios.post("/login/", {
      username: username.value,
      password: password.value,
    });

    // Store the token in localStorage
    localStorage.setItem("token", res.data.token);

    // Set the Authorization header for future requests
    axios.defaults.headers.common["Authorization"] = `Token ${res.data.token}`;

    // Get user details to determine user type (employee or customer)
    const userRes = await axios.get("/users/");
    localStorage.setItem("userType", userRes.data.user_type);

    // Redirect user based on their role (employee/customer)
    if (userRes.data.user_type === "employee") {
      router.push("/employee/products"); // Redirect employee to product management
    } else {
      router.push("/customer/products"); // Redirect customer to product listing
    }
  } catch (err) {
    alert("Invalid credentials or error during login.");
  }
};
</script>
