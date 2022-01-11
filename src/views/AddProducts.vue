<template>
  <Loading :active="isLoading" />
  <h3>新增產品頁面</h3>
  <form class="addproducts">
    <label class="mb-2 mt-2 dish-input"><span>名稱</span><input
      ref="productName"
      v-model="newProducts.title"
      class="ms-3"
      type="text"
      required
    ></label>
    <label class="mb-2 mt-2 dish-input"><span>價格</span><input
      v-model="newProducts.percent"
      class="ms-3"
      type="number"
      required
      placeholder="只需填寫金額"
    ></label>
    <label class="mb-2 mt-2"><span>菜單料理</span><button
      class="ms-3 btn btn-primary btn-sm"
      type="submit"
      @click.prevent="addtempProducts"
    >新增</button></label>
  </form>
  <div
    v-if="showTempProducts.length === 0"
    class="noInfo"
  >
    <p>目前還沒新增資料唷！</p>
  </div>
  <table class="table border rounded-3 table-hover">
    <tbody>
      <tr
        v-for="(item,index) in showTempProducts"
        :key="item.title"
      >
        <td>{{ item.title }}</td>
        <td>
          <button
            type="text"
            @click.prevent="dataUp(item,index)"
          >
            ↑
          </button>
          <button
            type="text"
            @click.prevent="dataDown(item,index)"
          >
            ↓
          </button>
        </td>
        <td>
          <div class="btn-group">
            <button
              class="btn btn-outline-primary btn-sm"
              @click.prevent="openProductModal(false, item)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click.prevent="openDelProductModal(item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <button
    class="btn btn-sm btn-outline-primary btn-block"
    type="submit"
    @click.prevent="addProductsToList"
  >
    送出
  </button>
  <productsModal
    ref="productsModal"
    :products="tempProduct"
    @update-products="updateProducts"
  />
  <delModal
    ref="delModal"
    :item="tempProduct"
    @del-item="delProduct"
  />
</template>

<script>
import productsModal from '@/components/ProductsModal.vue'
import delModal from '@/components/DelModal.vue'
export default {
  components: {
    productsModal,
    delModal
  },
  data () {
    return {
      products: [],
      pagination: {},
      newProducts: {
        title: '',
        is_enabled: 1,
        percent: 0,
        due_date: 1555459200,
        code: 'testCode',
        id: ''
      },
      isLoading: false,
      isNew: false,
      tempProduct: {},
      newData: {},
      newData2: {},
      showTempProducts: [{
        title: '預設資料',
        is_enabled: 1,
        percent: 100,
        due_date: 1555459200,
        code: 'testCode',
        id: 'june0601'
      }],
      tempAddProducts: JSON.parse(localStorage.getItem('tempProducts')) || []
    }
  },
  mounted () {
  },
  methods: {
    addtempProducts () {
      if (this.newProducts.title === '' || this.newProducts.percent <= 0) {
        alert('請正確輸入商品資訊')
        this.isLoading = false
      } else {
        const timestamp = new Date().getTime()
        this.newProducts.id = timestamp
        this.isLoading = false
        this.showTempProducts.unshift({ ...this.newProducts })
        this.newProducts.title = ''
        this.newProducts.percent = ''
        alert('已完成新增')
        this.$refs.productName.focus()
      }
    },
    addProductsToList () {
      console.log(
        '舊的清單',
        this.tempAddProducts,
        '新的清單',
        this.showTempProducts
      )
      const getTogether = this.showTempProducts.concat(this.tempAddProducts)

      console.log(getTogether)
      const tempProductString = JSON.stringify(getTogether)
      localStorage.setItem('tempProducts', tempProductString)
      alert('已送出所有菜單囉!')
      this.showTempProducts = []
      this.tempAddProducts = getTogether
    },
    openProductModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      const productComponent = this.$refs.productsModal
      productComponent.show()
    },
    updateProducts (item) {
      this.tempProducts = item
      console.log('修改後的item', item, item.id)
      this.showTempProducts.forEach(function (i) {
        if (item.id === i.id) {
          i.title = item.title
          i.percent = item.percent
        }
      })
      const productComponent = this.$refs.productsModal
      productComponent.hide()
    },
    // 開啟刪除的Modal
    openDelProductModal (item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.show()
    },
    delProduct () {
      const delComponent = this.$refs.delModal
      const delProduct = this.tempProduct.id
      const delIndex = this.showTempProducts.findIndex(function (item) {
        return delProduct === item.id
      })
      this.showTempProducts.splice(delIndex, 1)
      delComponent.hide()
    },
    // 調整順序(往上){
    dataUp (item, index) {
      this.tempData = item
      if (index === 0) {
        alert('已經是最上筆資料囉')
        return
      }
      this.newData = this.showTempProducts.splice(index, 1)
      this.newData2 = this.showTempProducts.splice([index - 1], 0, item)
    },
    // 調整順序(往下){
    dataDown (item, index) {
      this.tempData = item
      if (index === this.showTempProducts.length - 1) {
        alert('已經是最末筆資料囉')
        return
      }
      this.newData = this.showTempProducts.splice(index, 1)
      this.newData2 = this.showTempProducts.splice([index + 1], 0, item)
    }
  }
}
</script>

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
.noInfo{
    color: #AAA;
    text-align: center;
    border-radius: 5px;
    width: 100%;
    padding: 5px 25px;
    border: 1px solid;
    p {
    margin-top: 0;
    margin-bottom: 0;
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
