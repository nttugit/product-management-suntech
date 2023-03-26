<template>
  <div class="product-info">
    <div
      class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center"
    >
      <h3 class="display-5">Product Infomation</h3>
      <router-link to="/products">Back</router-link>
    </div>

    <div class="container">
      <form @submit.prevent="save">
        <div class="form-group row">
          <label
            for="inputPassword"
            class="col-sm-3 col-form-label"
            >Product name</label
          >
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              v-model="product.name"
              @blur="validate()"
              :class="{ 'is-invalid': errors.name }"
            />
            <div
              class="invalid-feedback"
              v-if="errors.name"
            >
              {{ errors.name }}
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label
            for="inputPassword"
            class="col-sm-3 col-form-label"
            >Product price</label
          >
          <div class="col-sm-9">
            <input
              type="number"
              class="form-control"
              v-model="product.price"
              @blur="validate()"
              :class="{ 'is-invalid': errors.price }"
            />
            <div
              class="invalid-feedback"
              v-if="errors.price"
            >
              {{ errors.price }}
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label
            for="inputPassword"
            class="col-sm-3 col-form-label"
            >Product description</label
          >
          <div class="col-sm-9">
            <textarea
              class="form-control"
              rows="3"
              v-model="product.description"
            ></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label
            for="inputPassword"
            class="col-sm-3 col-form-label"
          ></label>
          <div class="col-sm-9">
            <button type="submit" class="btn btn-primary">
              Save
            </button>
            &nbsp;
            <button
              type="reset"
              class="btn btn-danger"
              @click="cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const rootAPI = process.env.VUE_APP_ROOT_API;
export default {
  name: 'ProductForm',
  data() {
    return {
      errors: {
        name: '',
        price: '',
        description: '',
      },
      product: {
        name: '',
        price: 0,
        description: '',
      },
    };
  },
  created() {
    const productId = this.$route.params.id;
    if (productId) {
      this.getOne(productId);
    }
  },
  methods: {
    validate() {
      let isValid = true;
      this.errors = {
        name: '',
        price: 0,
        description: '',
      };

      if (!this.product.name) {
        // set biến để event bắt được và dùng i-if dể show
        this.errors.name = 'Product name is required';
        isValid = false;
      }

      // self-check (no bootstrap)
      // if (!this.product.price) {
      //   this.errors.price = "Product price is required";
      // } else if (!this.isNumber(this.product.price)) {
      //
      //   this.errors.price = "Product price must be a number";
      // }

      if (this.product.price <= 0) {
        this.errors.price =
          'Product price must be greater than 0';
        isValid = false;
      }

      return isValid;
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },
    async save() {
      if (this.validate()) {
        const productId = this.product.id;
        if (!productId) {
          const postEndPoint = `${rootAPI}/products`;
          const response = await this.$request.post(
            postEndPoint,
            this.product
          );
          const { data } = await response;
          if (data.status != 201) {
            alert('Something went wrong');
          }
        } else {
          const putEndPoint = `${rootAPI}/products/${productId}`;
          const response = await this.$request.put(
            putEndPoint,
            this.product
          );
          const { data } = await response;
          if (data.status != 200) {
            alert('Something went wrong');
          }
        }

        // this.$router.push({ name: 'product-list' });
        this.$router.push({ path: '/products' });
      }
    },
    async getOne(productId) {
      const endPoint = `${rootAPI}/products/${productId}`;
      const { data } = await this.$request.get(endPoint);
      if (data.status === 200) {
        this.product = data.data;
      }
    },
    cancel() {
      this.product = {
        id: this.product.id,
        name: '',
        price: 0,
        description: '',
      };
    },
  },
};
</script>
