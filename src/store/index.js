import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    apiAccount: [],
    isLoading: false,
    pagination: {},
    editAccount: {}
  },
  mutations: {
    setAccountData (state, accountData) {
      state.apiAccount = accountData
    },
    updateLoading (state, status) {
      state.isLoading = status
    },
    setPagination (state, pageData) {
      state.pagination = pageData
    },
    setEditAccount (state, itemDeepClone) {
      console.log('把資料寫入editAccount', itemDeepClone)
      state.editAccount = itemDeepClone
    }
  },
  actions: {
    getAccountList ({ commit }, page) {
      commit('updateLoading', true)
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      axios.get(api)
        .then((res) => {
          commit('updateLoading', false)
          if (res.data.success) {
            // this.apiAccount = res.data.products
            const accountData = res.data.products.map(({ category: account, content: password, id }) => ({
              account,
              password,
              id
            }))
            commit('setAccountData', accountData)
            const pageData = res.data.pagination
            commit('setPagination', pageData)
          } else {
            console.error(res.data)
          }
        })
    },
    editAccount (context, item) {
      // 把資料編輯回六角要的格式
      const editedData = {
        title: 'new',
        category: item.account,
        content: item.password,
        id: item.id,
        contentRecheck: '',
        unit: 'new',
        origin_price: 66,
        price: 66
      }
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
      axios.put(api, { data: editedData }).then((response) => {
        console.log(response)
        context.dispatch('getAccountList')
      })
    }
  },
  modules: {
  }
})
