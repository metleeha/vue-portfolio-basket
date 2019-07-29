<template>
<v-menu transition="slide-y-transition" bottom offset-y>
    <template v-slot:activator="{ on }">
        <v-btn flat dark v-on="on">
            <v-icon left>account_circle</v-icon>
        {{ userName }}
        </v-btn>
    </template>
    <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" @click="userMenu(item.method)">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
    </v-list>
</v-menu>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import store from '../store'

export default {
    name: 'userMenu',
    store,
    data() {
        return {
            items: [{
                    title: 'My Info',
                    method: 'myInfo'
                },
                {
                    title: 'Sign Out',
                    method: 'signOut'
                }
            ]
        }
    },
    methods: {
        userMenu(menu) {
            switch (menu) {
                case 'myInfo':
                    break;
                case 'signOut':
                    this.signOut();
                    break;
            }
        },
        async signOut() {
            const result = await FirebaseService.signOut();
            if (result) {
                this.$store.commit("setUser", '');
                alert("Sign out completed!");

            }
        }
    },
    computed: {
        userName: function () {
            let user = this.$store.getters.getUser;
            console.log("================================");
            console.log(user);
            console.log("================================");
            return user.name;
        }
    }
}
</script>
