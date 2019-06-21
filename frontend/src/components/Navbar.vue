<template>
    <nav>
        <v-toolbar flat app>
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="text-upbbercase">
                <span class="font-weight-light">Inventory</span>
                <span>Management</span>               
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="blue white--text" flat>
                <span>Login</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
            <v-btn class="pink white--text" flat>
                <span>Email</span>
                <v-icon right>email</v-icon>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer v-model="drawer" app class="white">
            <v-list>
                <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-tile-action class="grey--text">
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="black--text">{{ link.text }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            links: [
                { icon: 'home', text: 'Home', route: '/' },
                { icon: 'perm_identity', text: 'View Users', route: '/user' },
                { icon: 'format_list_bulleted', text: 'Product', route: '/product'},
                { icon: 'folder', text: 'Projects', route: '/' }
            ]
        }
    }
}
</script>

<style scoped>
.btn:focus,.btn:active {
   outline: none !important;
   box-shadow: none;
}
</style>
