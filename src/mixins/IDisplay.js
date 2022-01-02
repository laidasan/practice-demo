export default {

  data () {
    return {
      isShow: false
    }
  },

  methods: {
    // 命名應該
    show () {
      this.isShow = true
    },

    hide () {
      this.isShow = false
    }
  }

}
