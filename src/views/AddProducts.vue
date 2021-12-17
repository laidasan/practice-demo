<template>
    <Loading :active="isLoading"></Loading>
    <h3>新增產品頁面</h3>
    <form class="addproducts">
        <label class="mb-2 mt-2 dish-input"><span>名稱</span><input class="ms-3" type="text" v-model="newProducts.title" required></label>
        <label class="mb-2 mt-2 dish-input"><span>價格</span><input class="ms-3" type="number" required v-model="newProducts.percent" placeholder="只需填寫金額"></label>
        <label class="mb-2 mt-2"><span>菜單料理</span><button class="ms-3 btn btn-primary btn-sm" type="submit" @click.prevent="addProducts">新增</button></label>
    </form>
    <table class="table border rounded-3 table-hover">
        <tbody >
            <tr v-for="(item,index) in products" :key="item.title">
            <td>{{item.title}}</td>
            <td>
                <button type="text" @click.prevent="dataUp(item,index)">↑</button>
                <button type="text" @click.prevent="dataDown(item,index)">↓</button>
            </td>
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
.addproducts{
    display: flex;
    flex-direction: column;
}
.dish-input{
    width: 350px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input{
        width: 250px;
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
      newProducts: {
        title: '',
        is_enabled: 1,
        percent: 0,
        due_date: 1555459200,
        code: 'testCode'
      },
      isLoading: false,
      isNew: false,
      tempProduct: {},
      newData: {},
      newData2: {}
    }
  },
  components: {
    productsModal
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.products = res.data.coupons
            this.pagination = res.data.pagination
          } else {
            console.error(res.data)
          }
        })
    },
    addProducts () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      if (this.newProducts.title === '' || this.newProducts.percent === 0) {
        alert('請正確輸入商品資訊')
        this.isLoading = false
      } else {
        this.$http.post(api, { data: this.newProducts })
          .then((res) => {
            this.isLoading = false
            alert('已完成新增')
            this.newProducts.title = ''
            this.newProducts.percent = ''
            this.getProducts()
          })
      }
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
    },
    // 調整順序(往上){
    dataUp (item, index) {
      console.log('往上')
      this.tempData = item
      if (index === 0) {
        alert('已經是最上筆資料囉')
        return
      }
      this.newData = this.products.splice(index, 1)
      this.newData2 = this.products.splice([index - 1], 0, item)
      console.log(this.products)
    },
    // 調整順序(往下){
    dataDown (item, index) {
      console.log('往上')
      this.tempData = item
      if (index === this.products.length - 1) {
        alert('已經是最末筆資料囉')
        return
      }
      this.newData = this.products.splice(index, 1)
      this.newData2 = this.products.splice([index + 1], 0, item)
      console.log(this.products)
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
