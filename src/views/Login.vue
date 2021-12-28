<template>
  <Loading :active="isLoading" />
  <div class="container mt-5 ">
    <form
      class="row justify-content-center"
      @submit.prevent="signIn"
    >
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">
          請先登入
        </h1>
        <div class="mb-2">
          <label
            for="inputEmail"
            class="sr-only"
          >Email address</label>
          <input
            id="inputEmail"
            v-model="user.username"
            type="email"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
          >
        </div>
        <div class="mb-2">
          <label
            for="inputPassword"
            class="sr-only"
          >Password</label>
          <input
            id="inputPassword"
            v-model="user.password"
            type="password"
            class="form-control"
            placeholder="Password"
            required
          >
        </div>
        <div class="text-end mt-4">
          <button
            class="btn btn-sm btn-primary btn-block"
            type="submit"
          >
            Sign in
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from) {
    this.signIn()
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    signIn () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data)
            const { token, expired } = res.data
            document.cookie = `juneToken=${token}; expires=${new Date(expired)}`
            this.isLoading = false
            this.$router.push('/dashboard/account')
          } else {
            console.log(res.data)
            this.isLoading = false
            alert('登入錯誤，請重新輸入')
          }
        })
    }
  }
}
</script>
