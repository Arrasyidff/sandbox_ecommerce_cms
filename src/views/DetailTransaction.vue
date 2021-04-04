<template>
  <div class="section-detail-transaction">
    <div v-for="(item, index) in detail" :key="index" class="card-detail">
      <div class="img-card">
        <img :src="item.image_url" :alt="item.product_name">
      </div>
      <div class="detail-card">
        <p>Name : {{item.product_name}}</p>
        <p>quantity : {{item.quantity}}</p>
        <p>price : {{item.total_price}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from '../config/axiosInstance'
export default {
  name: 'detail-transaction',
  data () {
    return {
      detail: []
    }
  },
  methods: {
    fetchDetailTransaction () {
      Axios({
        url: 'transactions/user/' + this.$route.params.id,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.detail = data.products
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  },
  mounted () {
    this.fetchDetailTransaction()
  }
}
</script>

<style>
.section-detail-transaction {
  width: 100%;
  min-height: 93vh;
  /* background: chartreuse; */
}

.card-detail {
  margin-bottom: 20px;
  padding: 10px;
  /* height: 250px; */
  /* background: chocolate; */
  display: flex;
  justify-content: center;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.img-card {
  height: 90%;
  width: 20%;
  /* background: red; */
  overflow: hidden;
}

.img-card img {
  width: 100%;
}

.detail-card {
  height: 90%;
  width: 80%;
  /* background: green; */
  padding: 20px;
}

.detail-card p {
  font-size: 23px;
}
</style>
