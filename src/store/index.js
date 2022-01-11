import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    apiAccount: [],
    isLoading: false,
    pagination: {}
  },
  mutations: {
    setAccountData (state, arr) {
      state.apiAccount = arr
      console.log('正常運作mutations')
    },
    isLoadingTrue (state) {
      state.isLoading = true
      console.log('現在是true')
    },
    isLoadingFalse (state) {
      state.isLoading = false
      console.log('現在是false')
    },
    setPagination (state, pageData) {
      state.pagination = pageData
    }
  },
  actions: {
    getAccountList ({ commit }, page) {
      console.log('正常運作actions')
      commit('isLoadingTrue')
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      axios.get(api)
        .then((res) => {
          commit('isLoadingFalse')
          if (res.data.success) {
            // this.apiAccount = res.data.products
            const arr = res.data.products.map(({ category: account, content: password, id }) => ({
              account,
              password,
              id
            }))
            commit('setAccountData', arr)
            const pageData = res.data.pagination
            commit('setPagination', pageData)
          } else {
            console.error(res.data)
          }
        })
    }
  },
  modules: {
  }
})
