<template>
    <div class="all_box">
        <Navbar></Navbar>
        <div class="container-fluid col-10 ">
            <router-view/>
        </div>
     </div>
</template>

<style lang="scss">
    .all_box{
        display: flex;
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
    }
</style>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)juneToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = `${token}`
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api, this.user)
      .then((res) => {
        if (!res.data.success) {
          this.$router.push('/login')
        }
      })
  }
}
</script>
