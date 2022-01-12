<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li
        class="page-item"
        :class="{'disabled': pages.has_pre === false}"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="updatePage(1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="item in pages.total_pages"
        :key="item"
        class="page-item"
        :class="{ 'active': item === pages.current_page }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="updatePage(item)"
        >{{ item }}</a>
      </li>
      <li
        class="page-item"
        :class="{'disabled': pages.has_next === false}"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="updatePage(pages.total_pages)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
import { mapState } from 'vuex'
export default {
  // props: {
  //   pages: {
  //     type: Object,
  //     default () { return {} }
  //   }
  // },
  // data () {
  //   return {
  //     temPages: {}
  //   }
  // },
  // computed: {
  //   pages () {
  //     return this.$store.state.pagination
  //   }
  // },
  // watch: {
  //   pages () {
  //     this.temPages = this.pages
  //   }
  // },
  computed: mapState({
    pagination: state => state.pagination,
    pages (state) {
      return state.pagination
    }
  }),
  methods: {
    updatePage (item) {
      /* eslint-disable */
      console.log(item)
      console.log(this.pages)
      this.$store.dispatch('getAccountList',item)
    }
  }
}
</script>
