import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../config/axiosInstance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    transactions: []
  },
  mutations: {
    fetchProducts (state, payload) {
      state.products = payload
    },
    fetchTransactions (state, payload) {
      state.transactions = payload
    }
  },
  actions: {
    fetchProducts (context) {
      Axios({
        url: 'products',
        method: 'GET'
      })
        .then(res => {
          console.log(res.data)
          context.commit('fetchProducts', res.data)
        })
        .catch(err => {
          context.commit('fetchProducts', err)
          console.log(err)
        })
    },
    fetchTransactions (context) {
      Axios({
        url: 'transactions',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('fetchTransactions', data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  },
  modules: {
  }
})
