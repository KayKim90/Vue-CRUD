<template>
  <v-footer
    dark
    height="auto"
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <!-- <v-card-title class="grey">
        <strong class="subheading">Get connected with me on social networks!</strong>

        <v-spacer></v-spacer>
        <v-list>
            <v-list-tile v-for="link in links" :key="link.text" :to="link.route">
                <v-list-tile-action>
                    <v-icon>{{ link.icon}}</v-icon>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-3"
          dark
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title> -->

      <v-card-actions class="grey darken-3 justify-center">
        &copy;2019 — <strong>Kay Kyungah Kim</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
export default {
    data() {
        return {
            links: [
                { icon: 'fab fa-facebook', text: 'Home', route: '/'}
            ],
            icons: [
                'fab fa-facebook',
                'fab fa-twitter',
                'fab fa-google-plus',
                'fab fa-linkedin',
            ]
        }
    }
}
</script>

