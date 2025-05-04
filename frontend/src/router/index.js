import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ProductManager from "../components/employee/ProductManager.vue";
import ProductList from "../components/customer/ProductList.vue";
import Cart from "../components/customer/Cart.vue";
import Checkout from "../components/customer/Checkout.vue";
import Transactions from "@/components/employee/Transactions.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/employee/products",
    component: ProductManager,
    meta: { requiresAuth: true, role: "employee" },
  },
  {
    path: "/employee/transactions",
    component: Transactions,
    meta: { requiresAuth: true, role: "employee" },
  },
  {
    path: "/customer/products",
    component: ProductList,
    meta: { requiresAuth: true, role: "customer" },
  },
  {
    path: "/customer/cart",
    component: Cart,
    meta: { requiresAuth: true, role: "customer" },
  },
  {
    path: "/customer/checkout",
    component: Checkout,
    meta: { requiresAuth: true, role: "customer" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Role-based navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else if (to.meta.role && to.meta.role !== userType) {
    next("/login");
  } else {
    next();
  }
});

export default router;
