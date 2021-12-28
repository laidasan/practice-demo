<template>
    <Loading :active="isLoading"></Loading>
    <table class="table border rounded-3 table-hover">
        <tbody>
            <tr v-for="item in productsList" :key="item.id">
                <td>{{item.title}}</td>
                <td>
                    <div class="btn-group">
                    <button class="btn btn-outline-primary btn-sm" @click.prevent="openProductModal(false, item)">編輯</button>
                <button class="btn btn-outline-danger btn-sm" @click.prevent="openDelProductModal(item)">刪除</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <productsModal ref="productsModal" :products="tempProduct" @update-products="updateProducts"></productsModal>
    <delModal ref="delModal" :item="tempProduct" @del-item="delProduct"></delModal>
    <pagination :pages="pagination" @emit-pages="getProducts"></pagination>
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
import pagination from '../components/Pagination.vue'
import delModal from '@/components/DelModal.vue'
export default {
  data () {
    return {
      products: [],
      productsList: [],
      pagination: {
        current_page: 1,
        has_next: false,
        has_pre: false,
        total_pages: 1
      },
      isLoading: false,
      isNew: false,
      tempProduct: {}
    }
  },
  components: {
    productsModal,
    pagination,
    delModal
  },
  methods: {
    getProducts (page = 1) {
      const sendProducts = localStorage.getItem('tempProducts')
      this.products = JSON.parse(sendProducts)
      this.current_page = page
      const perpage = 10
      const pageIndexStart = (page - 1) * perpage
      const pageIndexEnd = (page * perpage) - 1
      // console.log(this.products[pageIndexStart], this.products[pageIndexEnd])
      this.productsList = []
      this.products.forEach((item, index) => {
        if (index >= pageIndexStart && index <= pageIndexEnd) {
          this.productsList.push(item)
        }
      })
      this.pagination.total_pages = Math.ceil(this.products.length / perpage)
    },
    openProductModal (isNew, item) {
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
      this.tempProduct = item
      console.log('修改後的item', item, item.id)
      this.products.forEach(function (i) {
        if (item.id === i.id) {
          i.title = item.title
          i.percent = item.percent
        }
      })
      const productComponent = this.$refs.productsModal
      productComponent.hideModal()
      const modifiedProductString = JSON.stringify(this.products)
      localStorage.setItem('tempProducts', modifiedProductString)
    },
    // 開啟刪除的Modal
    openDelProductModal (item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    delProduct () {
      const delComponent = this.$refs.delModal
      const delProduct = this.tempProduct.id
      const delIndex = this.products.findIndex(function (item) {
        return delProduct === item.id
      })
      console.log(delIndex)
      this.products.splice(delIndex, 1)
      const modifiedProductString = JSON.stringify(this.products)
      localStorage.setItem('tempProducts', modifiedProductString)
      delComponent.hideModal()
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
