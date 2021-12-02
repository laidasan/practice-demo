<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{'disabled': pages.has_pre === false}">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="updatePage(item)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="item in pages.total_pages" :key="item" :class="{ 'active': item === pages.current_page }">
        <a class="page-link" href="#" @click.prevent="updatePage(item)" >{{item}}</a>
      </li>
      <li class="page-item" :class="{'disabled': pages.has_next === false}">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="updatePage(item)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  // props: ['pages'],
  props: {
    pages: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    pages () {
      this.temPages = this.pages
    }
  },
  data () {
    return {
      temPages: {}
    }
  },
  methods: {
    updatePage (item) {
      console.log(item)
      this.$emit('emit-pages', item)
    }
  }
}
</script>
