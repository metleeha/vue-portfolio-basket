<template>
<div>
    <!-- #112d4e-->
    <!-- navbar -->
    <v-toolbar color='#248ea9' fixed app temporary dark scroll-off-screen>
        <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up">
            <v-icon>fa-bars</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title>
            <router-link to="/" tag="span" style="cursor: pointer">
                <v-icon class="mr-1">free_breakfast</v-icon>TEN
            </router-link>
        </v-toolbar-title>
        <TranslateBtn></TranslateBtn>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
<<<<<<< HEAD
            <v-btn flat to="/portfolio">
                <v-icon left>assessment</v-icon>Portfolio</v-btn>
            <LoginDialog></LoginDialog>
=======
            <v-btn flat to="portfolio">
                <v-icon left>assessment</v-icon>Portfolio
            </v-btn>
            <UserMenu v-if="this.isSignined"></UserMenu>
            <SignInMenu v-else></SignInMenu>
>>>>>>> d218576... Add: divide signin button/userInfo
            

        </v-toolbar-items>
    </v-toolbar>
    <!-- end navbar -->
    <!-- sidebar -->
    <v-navigation-drawer v-model="drawer" app fixed temporary>
        <v-list>
            <v-container justify-center>
                <v-btn flat to="/" style="cursor: pointer">
                    <v-icon class="mr-1">free_breakfast</v-icon>TEN
                </v-btn>
                <v-flex>
                    <v-btn flat to="portfolio" style="cursor: pointer">
                        <v-icon left>assessment</v-icon>Portfolio
                    </v-btn>
                </v-flex>
                <v-flex v-show="!this.isSignined">
                    <SignInMenu></SignInMenu>
                </v-flex>
            </v-container>
        </v-list>
    </v-navigation-drawer>
    <!-- end sidebar -->
    <!-- backTotop button -->
    <v-fab-transition>
        <v-btn id="totop-button" v-show="fab" v-scroll="onScroll" class="md-5 mr-3 elevation-21" fab fixed bottom right color="#aee7e8" @click="toTop">
            <v-icon color="#248ea9">keyboard_arrow_up</v-icon>
        </v-btn>
    </v-fab-transition>
    <!-- end backTotop button -->
</div>
</template>

<script>
import TranslateBtn from './TranslateBtn'
import SignInMenu from './SignInMenu'
import UserMenu from './UserMenu'

export default {
    name: 'Header',
    data() {
        return {
            fab: false,
            drawer: false
        }
    },
    components: {
        TranslateBtn,
        SignInMenu,
        UserMenu
    },
    methods: {
        onScroll() {
            if (typeof window === 'undefined') return
            const top = window.pageYOffset ||
                document.documentElement.offsetTop ||
                0
            this.fab = top > 300
        },
        toTop() {
            this.$router.push({
                hash: ''
            })
            this.$vuetify.goTo(0)
            behavior: "smooth"
        }
    },
    computed: {
        isSignined: function () {
            return this.$store.getters.getuser=="" ? false : true;
        }
    }

}
</script>

<style scoped>
#totop-button{
    position: fixed;
    right: 5px; 
    bottom: 100px;
}
</style>
