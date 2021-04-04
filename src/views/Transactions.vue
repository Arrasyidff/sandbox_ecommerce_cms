<template>
  <div>
    <table class="table table-striped">
      <thead class="table-primary">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Customer Name</th>
          <th scope="col">Date</th>
          <th scope="col">Total Price</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in fetchTransactions" :key="index">
          <th class="row-table">{{index + 1}}</th>
          <td class="name">{{item.User.firstName +' '+ item.User.lastName}}</td>
          <td class="name">{{item.createdAt.split("T")[0]}}</td>
          <td class="name">{{item.total_price}}</td>
          <td class="actions">
              <button type="button" class="btn btn-warning" @click="toDetailTransaction(item.id)">Detail</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Transactions',
  computed: {
    fetchTransactions () {
      return this.$store.state.transactions
    }
  },
  methods: {
    fecthAllTransactions () {
      this.$store.dispatch('fetchTransactions')
    },
    toDetailTransaction (id) {
      this.$router.push('/transaction-' + id)
    }
  },
  mounted () {
    this.fecthAllTransactions()
  }
}
</script>

<style>
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
  text-align: center;
}

.actions {
  text-align: center;
  width: 200px;
}

</style>
