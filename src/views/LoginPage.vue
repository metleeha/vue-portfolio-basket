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
            <v-card-text>
                <!-- Login with E-mail -->
                <v-form>
                    <v-container grid-list-md text-xs-center>

                        <v-layout wrap row>
                            <v-text-field class="input-with-icon" label="E-mail" prepend-icon="face" type="text" required></v-text-field>
                            <v-text-field class="input-with-icon" label="Password" prepend-icon="lock" type="password" required></v-text-field>
                        </v-layout>
                        <v-layout wrap row>
                            <v-flex>
                                <small>ID/PW 찾기</small>
                            </v-flex>
                        </v-layout>
                        <v-layout wrap row>
                            <v-flex>
                                <v-btn round color="info" style="width:100%;">Login</v-btn>
                                <v-btn round color="success" style="width:100%;">SignUp</v-btn>
                            </v-flex>
                        </v-layout>

                    </v-container>
                </v-form>
                <!-- /Login with E-mail -->

                <!-- Login without E-mail -->
                <v-container grid-list-md text-xs-center>
                    <h4>Sign in with</h4>
                    <v-layout justify-center>
                        <v-btn round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:100%;">
                            <v-icon size="25" class="mr-2">fa-google</v-icon>Google
                        </v-btn>
                    </v-layout>
                    <v-layout justify-center>
                        <v-btn round color="blue" dark v-on:click="loginWithFacebook" style="width:100%;">
                            <v-icon size="25" class="mr-2">fa-facebook</v-icon>Facebook
                        </v-btn>
                    </v-layout>
                </v-container>
            </v-card-text>
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
.input-with-icon {
    display: inline-flex;
}
</style>
