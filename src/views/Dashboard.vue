/* eslint-disable vue/component-tags-order */
<template>
  <div class="all_box">
    <Navbar />
    <div class="container-fluid col-10 ">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import emitter from '@/methods/emitter'
export default {
  components: {
    Navbar
  },
  provide () {
    return {
      emitter
    }
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

<style lang="scss">
    .all_box{
        display: flex;
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
    }
</style>
