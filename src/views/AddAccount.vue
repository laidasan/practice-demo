<template>
    <Loading :active="isLoading"></Loading>
    <h5 class="bg-light mb-2 p-2 rounded-1 fw-bold">新增帳號</h5>
    <form class="addAccount p-3">
        <label class="AccSingle rounded-3 mb-3">Email
            <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="xxx@example.com"
        required
        autofocus
        v-model="newUser.category"></label>
        <label class="AccSingle rounded-3 mb-3">密碼<input type="password"
                required v-model="newUser.content"></label>
        <label class="AccSingle rounded-3 mb-5">確認密碼<input type="password"
                required v-model="newUser.contentRecheck"></label>
        <div class="mt-4">
            <button class="btn btn-sm btn-outline-primary btn-block" type="submit" @click="addUser">送出</button>
        </div>
    </form>
</template>

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
  methods: {
    addUser () {
      if (this.content === this.contentRecheck) {
        this.postNewUser()
      } else {
        alert('確認密碼不符合')
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
        })
    }
  },
  mounted () {

  }
}
</script>
