<template>
    <Loading :active="isLoading"></Loading>
    <table class="table border rounded-3 table-hover">
        <tbody>
            <tr v-for="item in products" :key="item.id">
                <td>{{item.title}}</td>
                <td>
                    <div class="btn-group">
                    <button class="btn btn-outline-primary btn-sm" @click.prevent="openProductModal(false, item)">編輯</button>
                <button class="btn btn-outline-danger btn-sm" @click.prevent="openDelAccountModal(item)">刪除</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <productsModal ref="productsModal" :products="tempProduct" @update-products="updateProducts"></productsModal>
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
import productsModal from '@/components/ProductsModal.vue'
export default {
  data () {
    return {
      products: [],
      pagination: {},
      isLoading: false,
      isNew: false,
      tempProduct: {}
    }
  },
  components: {
    productsModal
  },
  methods: {
    getProducts (page = 1) {
      const sendProducts = localStorage.getItem('tempProducts')
      this.products = JSON.parse(sendProducts)
    //   this.isLoading = true
    //   const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
    //   this.$http.get(api)
    //     .then((res) => {
    //       console.log('這是列表', res)
    //       this.isLoading = false
    //       if (res.data.success) {
    //         this.products = res.data.coupons
    //         this.pagination = res.data.pagination
    //       } else {
    //         console.error(res.data)
    //       }
    //     })
    },
    openProductModal (isNew, item) {
      console.log('我打開了~')
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      const productComponent = this.$refs.productsModal
      productComponent.showModal()
    },
    updateProducts (item) {
      this.tempProducts = item
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMethod = 'post'

      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
        httpMethod = 'put'
      }
      const productComponent = this.$refs.productsModal
      this.$http[httpMethod](api, { data: this.tempProducts }).then((response) => {
        productComponent.hideModal()
        this.getProducts()
      })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
