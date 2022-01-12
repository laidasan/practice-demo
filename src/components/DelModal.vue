<template>
  <div
    id="delModal"
    ref="modal"
    class="modal fade"
    :class="{'show d-block': isShow}"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>刪除 {{ item.account }}{{ item.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click.prevent="onCancel"
          />
        </div>
        <div class="modal-body">
          是否刪除 <strong class="text-danger">{{ item.account }}{{ item.title }}</strong> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            @click.prevent="onCancel"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="$emit('deleteConfirm')"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IDisplay from '@/mixins/IDisplay'
export default {
  extends: IDisplay,
  props: {
    item: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    onCancel (event) {
      this.hide()
    }
  }
}
</script>
