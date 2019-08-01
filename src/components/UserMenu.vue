<template>
<v-menu transition="slide-y-transition" bottom offset-y>
    <template v-slot:activator="{ on }">
        <v-btn flat dark v-on="on">
            <v-icon left>account_circle</v-icon>
        {{ userName }}
        </v-btn>
    </template>
    <v-list>
        <ModiUserInfo></ModiUserInfo>
        <v-list-tile @click="signOut()">
            Sign Out
        </v-list-tile>
    </v-list>
</v-menu>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import store from '../store'
import ModiUserInfo from './ModifyUserInfo'

export default {
    name: 'userMenu',
    store,
    data() {
        return {
            
        }
    },
    components: {
        ModiUserInfo
    },
    methods: {
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
            return (this.$store.getters.getUser).name;
        }
    }
}
</script>
