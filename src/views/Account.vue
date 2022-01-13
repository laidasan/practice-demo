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
    :account="editingAccount"
    @onAccountInput="updateAccountEmail"
    @onPasswordInput="updatePassword"
    @onClose="onAccountModalClose"
    @onConfirm="onAccountModalConfirm"
    @onCancel="onAccountModalCancel"
  />
  <pagination
    :pages="pagination"
    @emit-pages="initAccounts"
  />
  <delModal
    ref="delModal"
    :item="deletingAccount"
    @deleteConfirm="delAccount"
  />
</template>
<script>
import { clone } from 'ramda'
import Pagination from '../components/Pagination.vue'
import AccountModal from '@/components/AccountModal.vue'
import DelModal from '@/components/DelModal.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    accountModal: AccountModal,
    pagination: Pagination,
    delModal: DelModal
  },
  data () {
    return {
      isNew: false,
      searchText: '',
      deletingAccount: {}
    }
  },
  computed: {
    ...mapState([
      'isLoading',
      'apiAccount',
      'editingAccount'
    ]),
    pagination () {
      return this.$store.state.pagination
    }
  },
  created () {
    this.initAccounts()
  },
  methods: {
    ...mapActions([
      'showLoading',
      'hideLoading',
      'getAccountList',
      'editAccount',
      'deleteAccount',
      'setEditingAccount'
    ]),

    initAccounts () {
      this.showLoading()
      this.getAccountList()
        .then(() => {
          this.hideLoading()
        })
        .catch((error) => {
          this.hideLoading()
          console.error(error)
        })
    },

    updateAccountEmail ({ event, account }) {
      this.setEditingAccount({ account })
      console.log('editingAccount', this.editingAccount)
    },

    updatePassword ({ event, password }) {
      this.setEditingAccount({ password })
    },

    onAccountModalConfirm () {
      this.editAccount(this.editingAccount)
        .then(() => {
          this.$refs.accountModal.hide()
          this.initAccounts()
        })
        .catch(error => {
          console.error(error)
        })
    },

    onAccountModalCancel (event) {
      this.$refs.accountModal.hide()
    },

    onAccountModalClose (event) {
      this.$refs.accountModal.hide()
    },

    onEdit (item) {
      this.setEditingAccount(clone(item))
      this.$refs.accountModal.show()
    },

    // 開啟刪除的Modal
    onDelete (item) {
      this.$refs.delModal.show()
      this.deleteAccount = item
    },

    delAccount () {
      this.deleteAccount(this.deleteAccount.id)
      this.$refs.delModal.delComponent.hide()
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
