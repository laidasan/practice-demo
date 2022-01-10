<template>
  <div
    id="exampleModal"
    ref="modal"
    class="modal fade"
    :class="{'show d-block': isShow}"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            id="exampleModalLabel"
            class="modal-title"
          >
            產品編輯
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="onClose"
          />
        </div>
        <div class="modal-body">
          <label class="productName">產品名稱：<input
            type="text"
            :value="products.title"
            required
            name="productName"
            @input="onProductInput"
          >
            <label class="productPrice">價格：<input
              :value="products.percent"
              type="number"
              required
              @input="onPriceInput"
            ></label>
          </label>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="onCancel"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="onConfirm"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IDisplay from '@/mixins/IDisplay'

export const Event = Object.freeze({
  AccountInput: 'onAccountInput',
  PasswordInput: 'onPasswordInput',
  Close: 'onClose',
  Confirm: 'onConfirm',
  Cancel: 'onCancel'

})

export default {
  extends: IDisplay,
  props: {
    products: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      isShow: false,
      modal: {},
      tempProducts: {}
    }
  },
  watch: {
    products () {
      this.tempProducts = this.products
    }
  },
  mounted () {
  },
  methods: {
    onProductInput (event) {
      this.$emit(Event.AccountInput, event)
      this.tempProducts.title = event.target.value
      this.tempProducts.percent = this.products.percent
      this.tempProducts.id = this.products.id
    },
    onPriceInput (event) {
      console.log(event.target.value)
      this.$emit(Event.PasswordInput, event)
      this.tempProducts.percent = event.target.value
      this.tempProducts.title = this.products.title
      this.tempProducts.id = this.products.id
    },
    onClose (event) {
      this.hide()
      this.$emit(Event.Close, event)
    },

    onConfirm (event) {
      console.log(event.target.value)
      this.hide()
      this.$emit(Event.Confirm, event)
      this.$emit('update-products', this.tempProducts)
    },

    onCancel (event) {
      this.hide()
      this.$emit(Event.Cancel, event)
    }
  }
}
</script>
<style lang="scss">
.modal-body{
    .productName{
        input{
            width: 150px;
        }
    }
    .productPrice{
        padding-left: 5px;
        input{
            max-width: 150px;
        }
    }
}
</style>
