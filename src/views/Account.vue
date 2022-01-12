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
              @click.prevent="onEdit(item)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click.prevent="onDelete(item)"
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
    :account="editAccount"
    @onAccountInput="updateAccount"
    @onPasswordInput="updatePassword"
    @onConfirm="onAccountModalConfirm"
  />
  <pagination
    :pages="pagination"
    @emit-pages="getAccountList"
  />
  <delModal
    ref="delModal"
    :item="deleteAccount"
    @deleteConfirm="delAccount"
  />
</template>
<script>
import { clone } from 'ramda'
import Pagination from '../components/Pagination.vue'
import AccountModal from '@/components/AccountModal.vue'
import DelModal from '@/components/DelModal.vue'

export default {
  components: {
    accountModal: AccountModal,
    pagination: Pagination,
    delModal: DelModal
  },
  inject: ['emmiter'],
  data () {
    return {
      // VUEX改寫
      // apiAccount: [],
      // pagination: {},
      // isLoading: false,
      // tempAccount: {},
      isNew: false,
      searchText: '',
      editAccount: {
        id: '',
        account: '',
        password: ''
      },
      deleteAccount: {}
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
    onEdit (item) {
      this.editAccount = clone(item)
      const accountComponent = this.$refs.accountModal
      // this.$store.dispatch('editAccount', item)
      accountComponent.show()
    },

    updateAccount ({ event, account }) {
      this.editAccount.account = account
      console.log(this.editAccount)
    },

    updatePassword ({ event, password }) {
      this.editAccount.password = password
    },

    onAccountModalConfirm () {
      this.$store.dispatch('editAccount', this.editAccount)
    },

    // 開啟刪除的Modal
    onDelete (item) {
      const delComponent = this.$refs.delModal
      delComponent.show()
      this.deleteAccount = item
    },

    delAccount () {
      this.$store.dispatch('deleteAccount', this.deleteAccount.id)
      const delComponent = this.$refs.delModal
      delComponent.hide()
      // const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempAccount.id}`
      // this.$http.delete(url).then((response) => {
      //   const delComponent = this.$refs.delModal
      //   delComponent.hide()
      //   alert('資料已刪除')
      //   this.getAccountList()
      // })
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
