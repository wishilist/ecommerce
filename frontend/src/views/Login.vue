<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Welcome back</h2>
      <p class="login-subtitle">Sign in to continue</p>

      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <input
            v-model="username"
            type="text"
            class="form-input"
            placeholder=" "
            required
          />
          <label class="form-label">Username</label>
        </div>

        <div class="form-group">
          <input
            v-model="password"
            type="password"
            class="form-input"
            placeholder=" "
            required
          />
          <label class="form-label">Password</label>
        </div>

        <button class="login-button">
          <span>Sign In</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="button-icon"
          >
            <path
              fill-rule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </form>

      <div class="login-footer">
        <p>
          Don't have an account?
          <router-link to="/register" class="footer-link">Register</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "../axios";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    const res = await axios.post("/login/", {
      username: username.value,
      password: password.value,
    });

    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["Authorization"] = `Token ${res.data.token}`;

    const userRes = await axios.get("/users/");
    localStorage.setItem("userType", userRes.data.user_type);

    if (userRes.data.user_type === "employee") {
      router.push("/employee/products");
    } else {
      router.push("/customer/products");
    }
  } catch (err) {
    alert("Invalid credentials or error during login.");
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  padding: 2rem;
}

.login-card {
  width: 100%;
  max-width: 28rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2.5rem;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
  text-align: center;
}

.login-subtitle {
  color: #64748b;
  margin-bottom: 2rem;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
  background-color: #f8fafc;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label {
  transform: translateY(-1.5rem) scale(0.875);
  background-color: white;
  padding: 0 0.25rem;
  color: #3b82f6;
}

.form-label {
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: #64748b;
  pointer-events: none;
  transition: all 0.2s;
  transform-origin: left center;
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.login-button:hover {
  background-color: #2563eb;
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.5rem;
}

.login-footer {
  margin-top: 1.5rem;
  text-align: center;
  color: #64748b;
}

.footer-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
