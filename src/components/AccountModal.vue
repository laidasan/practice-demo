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
            <h5 class="modal-title" id="exampleModalLabel">帳號編輯</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <label class="account">帳號：<input v-model="tempAccount.category"></label>
            <label class="code">密碼：<input type="text" v-model="tempAccount.content"></label>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button"
            class="btn btn-primary" @click="$emit('update-account', tempAccount)"
            >Save changes</button>
        </div>
        </div>
    </div>
    </div>
</template>

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
<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: {
    account: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    account () {
      this.tempAccount = this.account
    }
  },
  data () {
    return {
      modal: {},
      tempAccount: {}
    }
  },
  methods: {
  },
  mounted () {
  },
  mixins: [modalMixin]
}
</script>
