<template>
    <div class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">產品編輯</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <label class="account">產品名稱：<input v-model="tempProducts.title"></label>
            <label class="code mt-3">產品價格：<input type="text" v-model="tempProducts.percent"></label>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button"
            class="btn btn-primary" @click="$emit('update-products', tempProducts)"
            >Save changes</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: {
    products: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    products () {
      this.tempProducts = this.products
    }
  },
  data () {
    return {
      modal: {},
      tempProducts: {}
    }
  },
  methods: {
  },
  mounted () {
    console.log('驗證資料傳遞', this.tempProducts)
  },
  mixins: [modalMixin]
}
</script>
