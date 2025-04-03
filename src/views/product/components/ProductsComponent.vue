<script>

export default {
    data() {
        return {
          table_headers: [
                {
                    label: 'Name'
                },
                {
                    label: 'Categories'
                },
                {
                    label: 'Status'
                },
                {
                    label: 'Actions'
                },
            ]
        }
    },
}
</script>
<template>
  <div class="col-12 text-md-end mb-2 d-flex align-items-center flex-wrap gap-3">
    <div class="col-auto order-2 order-md-1">
      <div class="input-group">
        <span class="input-group-text">
          <i class="bi bi-search"></i>
        </span>
          <input type="text" class="form-control p-2 px-3" id="floatingInputGroup1" placeholder="Username">
      </div>
    </div>
    <div class="col-12 col-md order-md-2 order-md-1">
      <button type="button" class="btn btn-2" @click="$router.push({name: 'add-product'})">
        <i class="bi bi-plus"></i>
          New Product
      </button>
    </div>
  </div>
  <div class="table-responsive table-lg">
    <table class="table align-middle mb-0 bg-white">
      <thead class="bg-light">
        <tr class="table-header">
          <th v-for="header in table_headers" :key="header">{{ header.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 50" :key="i">
          <td>
            <div class="d-flex align-items-center">
              <img
                src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                alt=""
                style="width: 45px; height: 45px"
                class="rounded-circle"
              />
              <div class="ms-3">
                <p class="fw-bold mb-1">Under Arm Serum</p>
              </div>
            </div>
          </td>
          <td>
            <p class="fw-normal mb-1">Catt & Co.</p>
          </td>
          <td>
            <span class="badge rounded-pill text-bg-success">In Stock</span>
            <span class="badge rounded-pill text-bg-warning text-light">Running Low</span>
            <span class="badge rounded-pill text-bg-danger">Out of Stock</span>
          </td>
          <td>
            <div class="d-flex gap-3">
              <div class="d-flex gap-1 primary-hover cursor-pointer text-gray">
                <i class="isax isax-edit"></i>
                <span>Edit</span>
              </div>
              <div class="d-flex gap-1 primary-hover cursor-pointer text-gray">
                <i class="isax isax-trash"></i>
                <span>Remove</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>