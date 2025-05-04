<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-primary fw-bold">Product Manager</h2>
    <div>
      <nav>
        <button class="btn btn-primary" @click="logout">Logout</button>
      </nav>
    </div>

    <button class="btn btn-success mb-3" @click="openCreateForm">
      <i class="bi bi-plus-lg me-1"></i> Add Product
    </button>

    <button class="btn btn-primary" @click="openTransaction">Transactions</button>

    <!-- Product Table -->
    <div v-if="products.length">
      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>${{ product.price }}</td>
              <td>
                <img
                  v-if="product.image"
                  :src="`${product.image}`"
                  alt="Product Image"
                  class="img-thumbnail"
                  style="width: 60px; height: 60px; object-fit: cover"
                />
                <span v-else class="text-muted">No image</span>
              </td>
              <td>
                <button
                  class="btn btn-sm btn-warning me-2"
                  @click="openEditForm(product)"
                >
                  Edit
                </button>
                <button
                  class="btn btn-sm btn-danger"
                  @click="deleteProduct(product.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <p class="text-muted">No products available.</p>
    </div>

    <!-- Modal for Create/Edit -->
    <div v-if="showModal" class="modal d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <form @submit.prevent="submitProduct">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ isEditing ? "Edit" : "Add" }} Product
              </h5>
              <button
                type="button"
                class="btn-close"
                @click="closeModal"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Name</label>
                  <input
                    v-model="form.name"
                    class="form-control"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Price</label>
                  <input
                    type="number"
                    v-model="form.price"
                    class="form-control"
                    placeholder="e.g. 29.99"
                    required
                  />
                </div>
                <div class="col-12">
                  <label class="form-label">Description</label>
                  <textarea
                    v-model="form.description"
                    class="form-control"
                    placeholder="Product details"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Stock</label>
                  <input
                    type="number"
                    v-model="form.stock"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Image</label>
                  <input
                    type="file"
                    @change="handleImage"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" @click="closeModal">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">
                {{ isEditing ? "Update" : "Create" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import axios from "../../axios";

export default {
  data() {
    return {
      products: [],
      showModal: false,
      isEditing: false,
      selectedId: null,
      form: {
        name: "",
        description: "",
        price: "",
        stock: "",
        image: null,
      },
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
      this.$router.push("/login");
    },
    openCreateForm() {
      this.resetForm();
      this.isEditing = false;
      this.showModal = true;
    },
    openEditForm(product) {
      this.form = { ...product, image: null };
      this.selectedId = product.id;
      this.isEditing = true;
      this.showModal = true;
    },
    openTransaction(){
      this.$router.push("transactions");
    },
    handleImage(e) {
      this.form.image = e.target.files[0];
    },
    closeModal() {
      this.showModal = false;
    },
    resetForm() {
      this.form = {
        name: "",
        description: "",
        price: "",
        stock: "",
        image: null,
      };
      this.selectedId = null;
    },
    submitProduct() {
      const formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("description", this.form.description);
      formData.append("price", this.form.price);
      formData.append("stock", this.form.stock);
      if (this.form.image) {
        formData.append("image", this.form.image);
      }

      if (this.isEditing) {
        axios.put(`products/${this.selectedId}/`, formData).then(() => {
          this.fetchProducts();
          this.closeModal();
        });
      } else {
        axios.post("products/", formData).then(() => {
          this.fetchProducts();
          this.closeModal();
        });
      }
    },
    deleteProduct(id) {
      if (confirm("Are you sure you want to delete this product?")) {
        axios
          .delete(`products/${id}/`)
          .then(() => {
            this.fetchProducts();
          })
          .catch((err) => {
            alert(err.response.data.error || "Failed to delete product.");
          });
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.img-thumbnail {
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000050;
  z-index: 1040;
}

.modal {
  z-index: 1050;
}
</style>
