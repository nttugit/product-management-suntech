<template>
  <div class="product-list">
    <div
      class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center"
    >
      <h3 class="display-5">Product Management</h3>

      <p>
        <router-link to="/products/create">
          Add new
        </router-link>
      </p>
    </div>
    <div class="container">
      <div class="card-deck mb-3 text-center">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product name</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(product, index) in products"
              :key="index"
            >
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>
                <i
                  class="fa-solid fa-pen-to-square action-icon"
                ></i>
                <i
                  class="fa-solid fa-trash action-icon"
                  @click="onDelete(product.id)"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
const rootAPI = process.env.VUE_APP_ROOT_API_LOCAL;
export default {
  name: 'ProductList',
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.getAll();
    // console.log(this.products);
  },
  methods: {
    async getAll() {
      const { data } = await this.$request(
        `${rootAPI}/products`
      );
      if (data.data.length > 0) {
        console.log(data);
        this.products = data.data;
      }
    },
    onDelete(id) {
      this.$swal
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const { data } = await this.$request.delete(
              `${rootAPI}/products/${id}`
            );
            console.log(data);
            if (data.status != 200) {
              this.$swal.fire(
                'Error!',
                'Cannot delete this product.',
                'error'
              );
            } else {
              await this.getAll();
              this.$swal.fire(
                'Deleted!',
                'Product has been deleted.',
                'success'
              );
            }
          }
        });
    },
  },
};
</script>

<style>
.action-icon {
  padding: 10px;
  /* margin-left: 10px; */
  border-radius: 10px;
}

.action-icon:hover {
  cursor: pointer;
  background: #cac9c9;
}
</style>
