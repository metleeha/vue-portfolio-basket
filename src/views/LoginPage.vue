<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" max-width="400px">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Login</v-btn>
            </template>
            <!-- modal -->
            <v-card>
                <!-- header -->
                <v-toolbar tabs color="secondary">
                    <v-toolbar-title><span class="headline">Login</span></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>

                <!-- contents -->
                <v-form>
                <v-container grid-list-md>
                    <!-- Login with E-mail -->
                    <v-layout row wrap>
                        
                            <v-flex xs12 >
                                <v-text-field class="please" label="E-mail" prepend-icon="face" type="text" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Password" prepend-icon="lock" type="password" required></v-text-field>
                            </v-flex>

                            <v-layout wrap row>
                                <v-btn>Login</v-btn>
                            </v-layout>

                                
                            <v-layout wrap row>
                                <v-flex xs4><small>회원가입</small></v-flex>
                                <v-flex xs4><small>ID&PW 찾기</small></v-flex>
                            </v-layout>
                                              
                    </v-layout>

                    <!-- Login without E-mail -->
                    <v-layout>

                    </v-layout>
                </v-container>
                </v-form>
            </v-card>
            <!-- end modal -->
        </v-dialog>
    </v-layout>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import store from '../store'

export default {
    name: 'LoginPage',
    store,
    data() {
        return {
            dialog: false,
            signInDialog: false,
            signUpDialog: false,
            email: '',
            password: '',
            confirmPassword: '',
        }
    },
    components: {},
    methods: {
        async loginWithGoogle() {
            const result = await FirebaseService.loginWithGoogle()
            this.$store.state.accessToken = result.accessToken
            this.$store.state.user = result.user
            this.$router.replace('/')
        },
        async loginWithFacebook() {
            const result = await FirebaseService.loginWithFacebook()
            this.$store.state.accessToken = result.credential.accessToken
            this.$store.state.user = result.user
            this.$router.replace('/')
        },
        async signUp() {
            const result = await FirebaseService.signUp(this.email, this.password)
            if (result) {
                alert("가입완료!");
                this.email = "";
                this.password = "";
                this.confirmPassword = "";
                this.signUpDialog = false;
            }
        },
        async signIn() {
            const result = await FirebaseService.signIn(this.email, this.password)
            if (result) {
                alert("로그인!");
                this.$store.state.accessToken = result.accessToken;
                this.$store.state.user = result.user;
                this.$router.replace('/');
            }
        }
    },
    mounted: function () {
        console.log(this.$store.state)
    },
    computed: {
        comparePasswords() {
            return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
        }
    }
}
</script>
<style scoped>
.please{
    display: inline-flex;
}
</style>
