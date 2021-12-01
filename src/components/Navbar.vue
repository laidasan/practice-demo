<template>
    <ul class="nav flex-column col-2 m-2">
        <li class="nav-item">帳號管理
            <a class="nav-link active" href="#/dashboard/account" >列表</a>
            <a class="nav-link" href="#/dashboard/addAccount">新增</a>
        </li>
        <li class="nav-item">產品管理
            <a class="nav-link" href="#/dashboard/products">列表</a>
            <a class="nav-link" href="#/dashboard/addProducts">新增</a>
        </li>
        <li class="nav-item">登出
            <a class="nav-link" href="#" @click.prevent = "logout">登出</a>
        </li>
    </ul>
</template>

<script>
export default {
  methods: {
    logout () {
      alert('是否確定登出?')
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/login')
          }
        })
    }
  }
}
</script>
