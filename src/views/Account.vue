<template>
  <Loading :active="isLoading" />
  <nav class="navbar navbar-light bg-light mb-2 search_box">
    <div class="container-fluid">
      <form class="d-flex">
        <button
          class="btn btn-success me-2"
          type="button"
          disabled
        >
          搜尋
        </button>
        <input
          v-model="searchText"
          class="form-control "
          type="search"
          placeholder="xxx@example.com"
          aria-label="Search"
        >
      </form>
    </div>
  </nav>
  <table class="table border rounded-3 table-hover">
    <tbody>
      <tr
        v-for="item in filterData"
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
      account: [
        {
          email: 'nick@104.com.tw',
          password: 'test01'
        },
        {
          email: 'ocean@104.com.tw',
          password: 'test02'
        },
        {
          email: 'joe@104.com.tw',
          password: 'test03'
        },
        {
          email: 'shine@104.com.tw',
          password: 'test04'
        },
        {
          email: 'leo@104.com.tw',
          password: 'test05'
        },
        {
          email: 'jane@104.com.tw',
          password: 'test06'
        },
        {
          email: 'bob@104.com.tw',
          password: 'test07'
        },
        {
          email: 'wang@104.com.tw',
          password: 'test08'
        },
        {
          email: 'jay@104.com.tw',
          password: 'test09'
        },
        {
          email: 'riven@104.com.tw',
          password: 'test10'
        },
        {
          email: 'otis@104.com.tw',
          password: 'test11'
        },
        {
          email: 'ruby@104.com.tw',
          password: 'test12'
        },
        {
          email: 'ellis@104.com.tw',
          password: 'test13'
        },
        {
          email: 'nicole@104.com.tw',
          password: 'test14'
        },
        {
          email: 'phoebe@104.com.tw',
          password: 'test15'
        }
      ],
      apiAccount: [],
      pagination: {},
      tempAccount: {},
      isNew: false,
      isLoading: false,
      searchText: '',
      filterAccount: ''
    }
  },
  computed: {
    filterData () {
      return this.apiAccount.filter(item => {
        return item.account.match(this.searchText)
      })
    }
  },
  created () {
    this.getAccountList()
  },
  methods: {
    getAccountList (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            // this.apiAccount = res.data.products
            console.log(res.data.products)
            this.apiAccount = res.data.products.map(({ category: account, content: password, id }) => ({
              account,
              password,
              id
            }))
            console.log(this.apiAccount)
            this.pagination = res.data.pagination
          } else {
            console.error(res.data)
          }
        })
    },
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
        console.log(response)
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
        console.log(response.data)
        const delComponent = this.$refs.delModal
        delComponent.hide()
        this.getAccountList()
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
