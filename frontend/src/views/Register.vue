<template>
  <div class="register-container">
    <div class="register-card">
      <h2 class="register-title">Create your account</h2>
      <p class="register-subtitle">Join us to get started</p>

      <form @submit.prevent="register" class="register-form">
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
            v-model="email"
            type="email"
            class="form-input"
            placeholder=" "
            required
          />
          <label class="form-label">Email</label>
        </div>

        <div class="form-group">
          <div class="password-input">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder=" "
              required
            />
            <label class="form-label">Password</label>
            <button
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path v-if="showPassword" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  v-if="!showPassword"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                />
                <path
                  v-if="showPassword"
                  fill-rule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="user-type-group">
          <p class="user-type-label">Account Type</p>
          <div class="user-type-options">
            <label class="user-type-option">
              <input
                type="radio"
                value="customer"
                v-model="user_type"
                class="user-type-radio"
                checked
              />
              <span class="user-type-custom-radio"></span>
              <span class="user-type-text">Customer</span>
            </label>

            <label class="user-type-option">
              <input
                type="radio"
                value="employee"
                v-model="user_type"
                class="user-type-radio"
              />
              <span class="user-type-custom-radio"></span>
              <span class="user-type-text">Employee</span>
            </label>
          </div>
        </div>

        <button class="register-button">
          <span>Create Account</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="button-icon"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </form>

      <div class="register-footer">
        <p>
          Already have an account?
          <router-link to="/login" class="footer-link">Sign in</router-link>
        </p>
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
const user_type = ref("customer");

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

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  padding: 2rem;
}

.register-card {
  width: 100%;
  max-width: 28rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2.5rem;
}

.register-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
  text-align: center;
}

.register-subtitle {
  color: #64748b;
  margin-bottom: 2rem;
  text-align: center;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  position: relative;
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  padding: 0.5rem;
}

.password-toggle svg {
  width: 1.25rem;
  height: 1.25rem;
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

.user-type-group {
  margin-top: 1rem;
}

.user-type-label {
  color: #64748b;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}

.user-type-options {
  display: flex;
  gap: 1.5rem;
}

.user-type-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.user-type-radio {
  position: absolute;
  opacity: 0;
}

.user-type-custom-radio {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.user-type-radio:checked + .user-type-custom-radio {
  border-color: #3b82f6;
}

.user-type-custom-radio::after {
  content: "";
  width: 0.75rem;
  height: 0.75rem;
  background-color: #3b82f6;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s;
}

.user-type-radio:checked + .user-type-custom-radio::after {
  opacity: 1;
}

.user-type-text {
  color: #1e293b;
  font-weight: 500;
}

.register-button {
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

.register-button:hover {
  background-color: #2563eb;
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.5rem;
}

.register-footer {
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
