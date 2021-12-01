<template>
  <Loading :active="isLoading"></Loading>
    <nav class="navbar navbar-light bg-light mb-2 search_box">
      <div class="container-fluid">
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="xxx@example.com" aria-label="Search" v-model="searchText">
          <button class="btn btn-outline-success" type="submit" @click.prevent="searchAccount">搜尋</button>
        </form>
      </div>
    </nav>
    <table class="table border rounded-3 table-hover">
        <tbody >
            <tr v-for="item in apiAccount" :key="item.id">
            <td>{{item.category}}</td>
            <td>
                <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" @click.prevent="openModal(false, item)">編輯</button>
                <button class="btn btn-outline-danger btn-sm">刪除</button>
                </div>
            </td>
            </tr>
        </tbody>
    </table>
    <accountModal
    ref="accountModal" :account="tempAccount" @update-account="updateAccount"
    ></accountModal>
    <pagination :pages="pagination" @emit-pages="getAccountList"></pagination>
</template>

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

<script>
import accountModal from '../components/AccountModal.vue'
import pagination from '../components/Pagination.vue'
export default {
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
      filterAccount: []
    }
  },
  components: {
    accountModal,
    pagination
  },
  methods: {
    getAccountList (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.apiAccount = res.data.products
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
      accountComponent.showModal()
    },
    updateAccount (item) {
      this.tempAccount = item
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
        accountComponent.hideModal()
        this.getAccountList()
      })
    },
    searchAccount () {
      console.log('搜尋')
      if (this.searchText === '') {
        alert('請輸入搜尋內容')
        return
      }
      this.filterAccount = this.apiAccount.filter(function (item) {
        if (item.category) {
          return item.category.match(this.searchText)
        }
        return false
      })
      if (this.filterAccount.length === 0) {
        alert('糟糕，好像沒有你要找的帳號!')
      } else {
        this.getAccountList()
      }
    }
  },
  created () {
    this.getAccountList()
  }
}
</script>
