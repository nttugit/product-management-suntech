<template>
  <div
    class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm"
  >
    <h5 class="my-0 mr-md-auto font-weight-normal">
      <router-link to="/" class="navbar-item"> Vue Mini Project</router-link>
    </h5>

    <nav class="my-2 my-md-0 mr-md-3">
      <router-link to="/products" class="navbar-item"> Products</router-link>
      |
      <router-link to="/users" class="navbar-item"> Users</router-link>
    </nav>

    <a class="btn btn-outline-primary" routerlink="cart">Admin</a>
  </div>

  <router-view />
</template>

<style scoped>
.navbar-item {
  color: #000000;
  text-decoration: none;
}
.navbar-item:hover {
  opacity: 0.8;
}
</style>
