<template>
  <div class="users">
    <h1>User list</h1>
    <div v-for="user in users" :key="user" class="user">
        <strong>{{user.name}}</strong>
        <router-link :to="{ name: 'userView', params: { id: user.id }}">More</router-link>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/api/users')
    .then((response) => {
      this.users = response.data
    })
  },
  data () {
    return {
      users: []
    }
  }
}
</script>