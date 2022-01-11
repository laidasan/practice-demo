<template>
  <Loading :active="isLoading" />
  <nav class="navbar navbar-light bg-light mb-2 search_box">
    <div class="container-fluid">
      <form class="d-flex">
        <input
          :value="searchText"
          class="form-control me-2"
          type="search"
          placeholder="xxx@example.com"
          aria-label="Search"
          @input="setSearchText"
        >
        <button
          class="btn btn-success me-2"
          type="button"
          @click.prevent="filterAccount"
        >
          搜尋
        </button>
      </form>
    </div>
  </nav>
  <table class="table border rounded-3 table-hover">
    <tbody>
      <tr
        v-for="item in apiAccount"
        :key="item.id"
      >
        <td>{{ item.account }}</td>
        <td>
          <div class="btn-group">
            <button
              class="btn btn-outline-primary btn-sm"
              @click.prevent="openModal(false, item)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click.prevent="openDelAccountModal(item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <accountModal
    ref="accountModal"
    :account="tempAccount"
    @update-account="updateAccount"
  />
  <pagination
    :pages="pagination"
    @emit-pages="getAccountList"
  />
  <delModal
    ref="delModal"
    :item="tempAccount"
    @del-item="delAccount"
  />
</template>
<script>
import pagination from '../components/Pagination.vue'
import accountModal from '@/components/AccountModal.vue'
import delModal from '@/components/DelModal.vue'

export default {
  components: {
    accountModal,
    pagination,
    delModal
  },
  inject: ['emmiter'],
  data () {
    return {
      // VUEX改寫
      // apiAccount: [],
      // pagination: {},
      // isLoading: false,
      tempAccount: {},
      isNew: false,
      searchText: ''
    }
  },
  computed: {
    apiAccount () {
      return this.$store.state.apiAccount
    },
    isLoadingStatus () {
      return this.$store.state.isLoading
    },
    pagination () {
      return this.$store.state.pagination
    }
  },
  created () {
    // this.getAccountList()
    this.$store.dispatch('getAccountList')
  },
  methods: {
    // getAccountList (page = 1) {
    //   this.isLoading = true
    //   const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
    //   this.$http.get(api)
    //     .then((res) => {
    //       this.isLoading = false
    //       if (res.data.success) {
    //         // this.apiAccount = res.data.products
    //         this.apiAccount = res.data.products.map(({ category: account, content: password, id }) => ({
    //           account,
    //           password,
    //           id
    //         }))
    //         this.pagination = res.data.pagination
    //       } else {
    //         console.error(res.data)
    //       }
    //     })
    // },
    openModal (isNew, item) {
      if (isNew) {
        this.tempAccount = {}
      } else {
        this.tempAccount = { ...item }
      }
      this.isNew = isNew
      const accountComponent = this.$refs.accountModal
      accountComponent.show()
    },
    updateAccount (item) {
      this.tempAccount = {
        title: 'new',
        category: item.account,
        content: item.password,
        id: item.id,
        contentRecheck: '',
        unit: 'new',
        origin_price: 66,
        price: 66
      }
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'

      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      const accountComponent = this.$refs.accountModal
      this.$http[httpMethod](api, { data: this.tempAccount }).then((response) => {
        accountComponent.hide()
        this.getAccountList()
      })
    },
    // 開啟刪除的Modal
    openDelAccountModal (item) {
      this.tempAccount = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.show()
    },
    delAccount () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempAccount.id}`
      this.$http.delete(url).then((response) => {
        const delComponent = this.$refs.delModal
        delComponent.hide()
        alert('資料已刪除')
        this.getAccountList()
      })
    },
    // 搜尋
    setSearchText (e) {
      this.searchText = e.target.value
      if (this.searchText === '') {
        this.getAccountList()
      }
    },
    filterAccount () {
      if (this.searchText === '') {
        alert('搜尋資料不得為空')
      }
      this.apiAccount = this.apiAccount.filter(item => {
        return item.account.match(this.searchText)
      })
    }
  }
}
</script>

<style lang="scss">
.search_box{
  .btn{
    width: 100px;
  }
}
table{
    border-collapse: separate;
    border-spacing: 0;
    td{
        vertical-align: middle;
    }
    td:nth-child(2){
        text-align: right;
    }
}
</style>
