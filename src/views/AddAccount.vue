<template>
  <Loading :active="isLoading" />
  <h5 class="bg-light mb-2 p-2 rounded-1 fw-bold">
    新增帳號
  </h5>
  <form class="addAccount p-3">
    <label class="AccSingle rounded-3 mb-3">Email
      <input
        id="inputEmail"
        v-model="newUser.category"
        type="email"
        class="form-control"
        placeholder="xxx@example.com"
        required
        autofocus
      ></label>
    <label class="AccSingle rounded-3 mb-3">密碼<input
      v-model="newUser.content"
      type="password"
      required
    ></label>
    <label class="AccSingle rounded-3 mb-5">確認密碼<input
      v-model="newUser.contentRecheck"
      type="password"
      required
    ></label>
    <div class="mt-4">
      <button
        class="btn btn-sm btn-outline-primary btn-block"
        type="submit"
        @click="addUser"
      >
        送出
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      newUser: {
        title: 'new',
        category: '',
        content: '',
        contentRecheck: '',
        unit: 'new',
        origin_price: 66,
        price: 66
      },
      isLoading: false
    }
  },
  mounted () {

  },
  methods: {
    addUser () {
      const reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%]")
      const result = reg.test(this.newUser.content)
      const reEmail = /\S+@\S+.\S+/
      const resultEmail = reEmail.test(this.newUser.category)
      if (this.newUser.category === '') {
        alert('使用者帳號不得為空，請重新填寫')
      } else if (!resultEmail) {
        alert('Email格式不正確')
      } else if (this.newUser.content === '' || this.newUser.contentRecheck === '') {
        alert('密碼不得為空，請重新填寫')
      } else if (this.newUser.content !== this.newUser.contentRecheck) {
        alert('確認密碼不符合，請重新輸入')
      } else if (this.newUser.content.length < 8) {
        alert('密碼長度請設定至少8個字元')
      } else if (result) {
        alert('密碼僅接受英文與數字')
      } else {
        this.postNewUser()
      }
    },
    postNewUser () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      this.$http.post(api, { data: this.newUser })
        .then((response) => {
          this.isLoading = false
          console.log(response)
          alert('已完成新增')
          this.newUser.category = ''
          this.newUser.content = ''
          this.newUser.contentRecheck = ''
        })
    }
  }
}
</script>

<style lang="scss">
    .addAccount{
        max-width:350px;
        .AccSingle{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            input{
                width: 200px;
            }
        }
    }
</style>
