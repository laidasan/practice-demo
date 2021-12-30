export default {

  data () {
    return {
      isShow: false,
      name: 'YOHO'
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
