import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    apiAccount: [],
    isLoading: false,
    pagination: {},
    editingAccount: {}
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
    setEditingAccount (state, account) {
      console.log('把資料寫入editAccount', account)
      state.editingAccount = {
        ...state.editingAccount,
        ...account
      }
    }
  },
  actions: {
    setEditingAccount ({ commit }, account) {
      commit('setEditingAccount', account)
    },

    showLoading ({ commit }) {
      console.log('showLoading')
      commit('updateLoading', true)
    },

    hideLoading ({ commit }) {
      commit('updateLoading', false)
    },

    getAccountList ({ commit, dispatch }, page) {
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
        .catch(error => {
          console.error(error)
        })
    },

    editAccount (context, account) {
      // 把資料編輯回六角要的格式
      const editedData = {
        title: 'new',
        category: account.account,
        content: account.password,
        id: account.id,
        contentRecheck: '',
        unit: 'new',
        origin_price: 66,
        price: 66
      }

      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${account.id}`
      axios.put(api, { data: editedData }).then((response) => {
        console.log(response)
        context.dispatch('getAccountList')
      })
    },
    deleteAccount (context, id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${id}`
      axios.delete(url).then((response) => {
        alert('資料已刪除')
        context.dispatch('getAccountList')
      })
    }
  },
  modules: {
  }
})
