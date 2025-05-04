<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Register</h3>
            <form @submit.prevent="register">
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
                <label class="form-label">Email</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3 position-relative">
            <label class="form-label">Password</label>
            <div class="input-group">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                required
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>


              <div class="mb-3">
                <label class="form-label d-block">User Type</label>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="customer"
                    value="customer"
                    v-model="user_type"
                  />
                  <label class="form-check-label" for="customer">Customer</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="employee"
                    value="employee"
                    v-model="user_type"
                  />
                  <label class="form-check-label" for="employee">Employee</label>
                </div>
              </div>

              <button class="btn btn-success w-100">Register</button>
              <div class="text-center mt-3">
                <router-link to="/login"
                  >Already have an account? Login</router-link
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
import axios from "../axios.js";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const email = ref("");
const showPassword = ref(false);
const user_type = ref("customer"); // default selection

const router = useRouter();

const register = async () => {
  try {
    await axios.post("/register/", {
      username: username.value,
      email: email.value,
      password: password.value,
      user_type: user_type.value,
    });
    router.push("/login");
  } catch (err) {
    alert("Registration failed");
  }
};
</script>

