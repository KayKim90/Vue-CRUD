
<template>
<v-app class="grey -lighten-4">
  <Navbar />
  <v-content>
    <router-view></router-view>
  </v-content>
</v-app>

</template>
<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: { Navbar } ,
  data () {
    return {
      //
    }
  }
}
</script>


<!-- 수정 3
<template>
<div id='app'>
  <router-view/>
</div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
-->
<!-- 수정 2
<template>
<div id='app'>
  <router-view/>
</div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>

-->
<!-- 수정 1
<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>

      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
// import UserIndex from './components/UserIndex'

// export default {
//   name: 'App',
//   components: {
//     HelloWorld
//   },
//   data () {
//     return {
//       //
//     }
//   }
// }
// </script>
