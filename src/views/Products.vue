<template>
    <Loading :active="isLoading"></Loading>
    <table class="table border rounded-3 table-hover">
        <tbody >
            <tr v-for="item in products" :key="item.id">
            <td>{{item.category}}</td>
            <td>
                <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" @click.prevent="openModal(false, item)">編輯</button>
                <button class="btn btn-outline-danger btn-sm" @click.prevent="openDelAccountModal(item)">刪除</button>
                </div>
            </td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="scss">
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
export default {
  data () {
    return {
      products: [
        {
          category: 'yeah',
          id: 'yeah'
        }
      ],
      isLoading: false
    }
  },
  methods: {
    getAccountList (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.$http.get(api)
        .then((res) => {
          console.log(res)
          this.isLoading = false
          if (res.data.success) {
            this.apiAccount = res.data.products
            this.pagination = res.data.pagination
          } else {
            console.error(res.data)
          }
        })
    }
  }
}
</script>
