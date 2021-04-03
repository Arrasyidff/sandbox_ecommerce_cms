<template>
  <div>
    <md-dialog :md-active.sync="showDeleteDialog">
      <div class="delete-dialog">
        <div class="icon-delete">
          <span>
            <i class="fas fa-trash-alt"></i>
          </span>
        </div>
        <div class="desc-delete">
          <p class="p1">You are about to delete a product</p>
          <p class="p2">This will delete your product from catalog</p>
          <p class="p2">Are You sure?</p>
        </div>
        <div class="action-delete">
          <button type="button" class="btn-cancel-delete-dialog" @click="resetData">cancel</button>
          <button type="button" class="btn-delete-dialog" @click="deleteProduct">delete</button>
        </div>
      </div>
    </md-dialog>
    <md-dialog :md-active.sync="showUpdateDialog">
      <div class="update-dialog">
        <h1>Update</h1>
        <form @submit.prevent="updateProduct">
          <div class="mb-3 row">
            <label for="inputUpdateNameProduct" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input v-model="nameProduct" type="text" class="form-control" id="inputUpdateNameProduct">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputUpdatePrice" class="col-sm-2 col-form-label">Price</label>
            <div class="col-sm-10">
              <input v-model="priceProduct" type="number" class="form-control" id="inputUpdatePrice">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputUpdateStock" class="col-sm-2 col-form-label">Stock</label>
            <div class="col-sm-10">
              <input v-model="stockProduct" type="number" class="form-control" id="inputUpdateStock">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputUpdateImageUrl" class="col-sm-2 col-form-label">Image URL</label>
            <div class="col-sm-10">
              <input v-model="imageUrlProduct" type="text" class="form-control" id="inputUpdateImageUrl">
            </div>
          </div>
          <div v-if="error !== null" class="mb-3">
            <div class="alert alert-danger" role="alert">
              {{error}}
            </div>
          </div>
          <div class="action-btn-dialog">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-danger" @click="resetData">Cancel</button>
          </div>
        </form>
      </div>
    </md-dialog>
    <table class="table table-striped">
      <thead class="table-primary">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Image</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in fetchProducts" :key="index">
          <th class="row-table">{{index + 1}}</th>
          <td class="name">{{item.name}}</td>
          <td class="price">{{item.price}}</td>
          <td class="stock">{{item.stock}}</td>
          <td class="image">
            <div class="img-table">
              <img :src="item.image_url" :alt="item.name">
            </div>
          </td>
          <td class="actions">
            <div class="btn-actions">
              <button type="button" class="btn btn-warning" @click="showUpdateDialogMethod(item)">Update</button>
              <button type="button" class="btn btn-danger" @click="showDeleteDialogMethod(item.id)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Axios from '../config/axiosInstance'

export default {
  name: 'Product-Page',
  data () {
    return {
      error: null,
      showDeleteDialog: false,
      showUpdateDialog: false,
      idDelete: '',
      idUpdate: '',
      nameProduct: '',
      priceProduct: 0,
      stockProduct: 0,
      imageUrlProduct: ''
    }
  },
  computed: {
    fetchProducts () {
      return this.$store.state.products
    }
  },
  methods: {
    resetData () {
      this.idDelete = ''
      this.idUpdate = ''
      this.showDeleteDialog = false
      this.showUpdateDialog = false
      this.nameProduct = ''
      this.priceProduct = 0
      this.stockProduct = 0
      this.imageUrlProduct = ''
      this.error = null
    },
    updateProduct () {
      Axios({
        url: 'products/' + this.idUpdate,
        method: 'PUT',
        data: {
          name: this.nameProduct,
          price: this.priceProduct,
          stock: this.stockProduct,
          image_url: this.imageUrlProduct
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.resetData()
          this.fetchAllProducts()
        })
        .catch(err => {
          console.log(err.response.data.msg)
          this.error = err.response.data.msg
          setTimeout(() => {
            this.error = null
          }, 3000)
        })
    },
    deleteProduct () {
      Axios({
        url: 'products/' + this.idDelete,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.resetData()
          this.fetchAllProducts()
        })
        .catch(err => {
          console.log(err)
        })
    },
    showDeleteDialogMethod (id) {
      this.resetData()
      this.showDeleteDialog = true
      this.idDelete = id
    },
    showUpdateDialogMethod (payload) {
      this.resetData()
      this.showUpdateDialog = true
      this.idUpdate = payload.id
      this.nameProduct = payload.name
      this.priceProduct = payload.price
      this.stockProduct = payload.stock
      this.imageUrlProduct = payload.image_url
    },
    fetchAllProducts () {
      this.$store.dispatch('fetchProducts')
    }
  },
  created () {
    this.fetchAllProducts()
  }
}
</script>

<style scoped>
/* DELETE DIALOG */
.delete-dialog {
  padding: 20px !important;
  width: 550px;
}

.icon-delete {
  display: flex;
  justify-content: center;
}

.icon-delete span {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: .2s;
}

.icon-delete span:hover {
  background: rgb(240, 240, 240);
}

.icon-delete i {
  font-size: 50px;
  color: red;
}

.desc-delete {
  margin-top: 20px;
}

.p1 {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.p2 {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: grey;
  margin-bottom: 10px;
}

.action-delete {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.action-delete button {
  margin-left: 5px;
  padding: 7px 20px;
  border-radius: 7px;
  border: none;
  font-weight: bold;
  font-size: 17px;
}

.btn-cancel-delete-dialog {
  background: white;
}

.btn-cancel-delete-dialog:hover {
  background: rgb(240, 240, 240);
}

.btn-delete-dialog {
  background: rgb(233, 21, 21);
  color: white;
}

.btn-delete-dialog:hover {
  background: rgb(194, 35, 35);
}

/* UPDATE DIALOG */
.update-dialog {
  width: 650px;
  padding: 10px 20px;
}

.update-dialog h1 {
  text-align: center;
  margin-bottom: 20px;
}

.action-btn-dialog {
  /* background: red; */
  width: 180px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.action-btn-dialog button {
  width: 80px;
  border-radius: 3px;
}

.alert {
  padding: 5px 10px !important;
}

/* TABLE */
thead th {
  text-align: center;
}

tbody th, tbody td {
  padding: 10px;
}

.row-table, .price, .stock {
  width: 25px !important;
  text-align: center;
}

.name {
  width: 250px !important;
}

.image {
  display: flex;
  justify-content: center;
}

.img-table {
  width: 200px;
  height: 200px;
  overflow: hidden;
}

.img-table img {
  width: 100%;
}

.actions {
  text-align: center;
  width: 200px;
}

.btn-actions {
  display: flex;
  justify-content: space-between;
}
</style>
