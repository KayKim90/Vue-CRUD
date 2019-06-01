<template>
  <div class="userView">
    <h1>User details</h1>
    <strong v-for="user in users" :key="user.id">{{user.name}},{{user.age}}</strong>
  </div>
</template>

<script>
export default {
  created: function () {
    var id = this.$route.params.id
    this.$http.get(`/api/users/${id}`)
    .then ((response) => {        
      this.users = response.data 
    })
  },    
  data: function () {
    return {
      users: []
    }
  }
} // eslint-disable-next-line
</script>