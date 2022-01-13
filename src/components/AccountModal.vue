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
            帳號編輯
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
          <label class="account">帳號：<input
            type="email"
            :value="account.account"
            name="account"
            @input="onAccountInput"
          >
            <label class="code">密碼：<input
              :value="account.password"
              type="text"
              @input="onPasswordInput"
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
    account: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    onAccountInput (event) {
      const { target: { value: account } } = event
      this.$emit(Event.AccountInput, { event, account })
    },

    onPasswordInput (event) {
      const { target: { value: password } } = event
      this.$emit(Event.PasswordInput, { event, password })
    },

    onClose (event) {
      this.$emit(Event.Close, event)
    },

    onConfirm (event) {
      this.$emit(Event.Confirm, event)
    },

    onCancel (event) {
      this.$emit(Event.Cancel, event)
    }
  }
}
</script>
<style lang="scss">
.modal-body{
    .account{
        input{
            width: 200px;
        }
    }
    .code{
        padding-left: 5px;
        input{
            max-width: 150px;
        }
    }
}
</style>
