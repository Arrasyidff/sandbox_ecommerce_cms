import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../config/axiosInstance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    fetchProducts (state, payload) {
      state.products = payload
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
    }
  },
  modules: {
  }
})
