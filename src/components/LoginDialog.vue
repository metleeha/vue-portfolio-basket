<template>
<v-dialog v-model="dialog" max-width="400px">
    <!-- signIn Button -->
    <template v-slot:activator="{ on }">
        <v-btn flat v-on="on" v-show="!isSignIn">
            <v-icon left>input</v-icon>
            Sign In
        </v-btn>
        <v-btn flat v-show="isSignIn" v-on:click="signOut">
            <v-icon left>cancel</v-icon>
            Logout
        </v-btn>
    </template>

    <!-- Sign In modal -->
    <v-card v-show="!isSignUp">
        <!-- header -->
        <v-toolbar tabs color="secondary">
            <v-toolbar-title><span class="headline">Sign in</span></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>

        <!-- contents -->
        <v-card-text>
            <!-- signIn with E-mail -->
            <v-form>
                <v-container grid-list-md text-xs-center>

                    <v-layout wrap row>
                        <v-text-field class="input-with-icon" name='email' label='E-Mail' id='email' v-model='email' type='email' prepend-icon="face" required></v-text-field>
                        <v-text-field class="input-with-icon" name='password' label='Password' id='password' v-model='password' type='password' prepend-icon="lock" v-on:keyup.enter="signIn" required></v-text-field>
                    </v-layout>
                    <v-layout wrap row>
                        <v-flex>
                            <small>ID/PW 찾기</small>
                        </v-flex>
                    </v-layout>
                    <v-layout wrap row>
                        <v-flex>
                            <v-btn round color="info" style="width:100%;" @click="signIn">SignIn</v-btn>
                            <v-btn round color="success" style="width:100%;" @click="isSignUp=true">SignUp</v-btn>
                        </v-flex>
                    </v-layout>

                </v-container>
            </v-form>
            <!-- /signIn with E-mail -->

            <!-- signIn without E-mail -->
            <v-container grid-list-md text-xs-center>
                <h4>Sign in with</h4>
                <template v-for="service in socialServices">
                    <v-layout justify-center :key="service.name">
                        <v-btn round :color="service.color" dark v-on:click="socialLogin(service.name)" style="width:100%;">
                            <v-icon size="25" class="mr-2">{{service.icon}}</v-icon>{{service.name}}
                        </v-btn>
                    </v-layout>
                </template>
            </v-container>
        </v-card-text>
    </v-card>

    <v-card v-show="isSignUp">
        <!-- header -->
        <v-toolbar tabs color="secondary">
            <v-toolbar-title><span class="headline">Sign Up</span></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>

        <!-- contents -->
        <v-card-text>
            <!-- sign up -->
            <v-form>
                <v-container grid-list-md text-xs-center>

                    <v-layout wrap row>
                        <v-text-field class="input-with-icon" name='name' label='Name' id='name' v-model='name' type='text' prepend-icon="insert_emoticon" required></v-text-field>
                        <v-text-field class="input-with-icon" name='signUpEmail' label='E-Mail' id='signUpEmail' v-model='signUpEmail' type='email' prepend-icon="face" required></v-text-field>
                        <v-text-field class="input-with-icon" name='signUpPassword' label='Password' id='signUpPassword' v-model='signUpPassword' type='password' prepend-icon="lock" required></v-text-field>
                        <v-text-field class="input-with-icon" name='confirmPassword' label='confirmPassword' id='confirmPassword' v-model='confirmPassword' type='password' prepend-icon="check_circle" required></v-text-field>

                    </v-layout>
                    <v-layout wrap row>
                        <v-flex>
                            <v-btn round color="info" style="width:100%;" @click="signUp">Sign Up</v-btn>
                            <v-btn round color="success" style="width:100%;" @click="isSignUp = false">Back</v-btn>
                        </v-flex>
                    </v-layout>

                </v-container>
            </v-form>
            <!-- /sign up -->

        </v-card-text>
    </v-card>
    <!-- end modal -->
</v-dialog>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import store from '../store'

export default {
    name: 'signInPage',
    store,
    data() {
        return {
            dialog: false,
            name: '',
            email: '',
            password: '',
            signUpEmail: '',
            signUpPassword: '',
            confirmPassword: '',
            confirmRule: false,
            isSignIn: false,
            isSignUp: false,
            socialServices: [{
                    name: 'Google',
                    color: '#df4a31',
                    icon: 'fa-google'
                },
                {
                    name: 'Facebook',
                    color: 'blue',
                    icon: 'fa-facebook'
                },
                {
                    name: 'Github',
                    color: 'black',
                    icon: 'fa-github'
                },
                {
                    name: 'Anonymous',
                    color: 'grey',
                    icon: 'fa-user-secret'
                }
            ]
        }
    },
    components: {},
    methods: {
        socialLogin(service) {
            switch (service) {
                case "Google":
                    this.signInWithGoogle();
                    break;
                case "Facebook":
                    this.signInWithFacebook();
                    break;
                case "Github":
                    this.signInWithGithub();
                    break;
                case "Anonymous":
                    this.signInAnonymously();
                    break;
            }
        },
        async signInWithGoogle() {
            const result = await FirebaseService.signInWithGoogle()
            this.$store.state.accessToken = result.accessToken
            this.$store.state.user = result.user
            alert("Sign in with Google!");
            this.dialog = false;
            this.isSignIn = true;
        },
        async signInWithFacebook() {
            const result = await FirebaseService.signInWithFacebook()
            this.$store.state.accessToken = result.credential.accessToken
            this.$store.state.user = result.user
            alert("Sign in with Facebook!");
            this.dialog = false;
            this.isSignIn = true;
        },
        async signInWithGithub() {
            const result = await FirebaseService.signInWithGithub();
            this.$store.state.accessToken = result.credential.accessToken
            this.$store.state.user = result.user
            alert("Sign in with Github!");
            this.dialog = false;
            this.isSignIn = true;
        },
        async signInAnonymously() {
            const result = await FirebaseService.signInAnonymously();
            if (result == true) {
                alert("Sign in Anonymously!");
            }
            this.$store.state.accessToken = "Annonymous"
            this.$store.state.user = "Annonymous"
            this.dialog = false;
            this.isSignIn = true;
        },
        async signUp() {
            const result = await FirebaseService.signUp(this.email, this.password)
            if (result) {
                alert("Sign up Completed!");
                this.isSignUp = false;
                this.clear()
            }
        },
        async signIn() {
            const result = await FirebaseService.signIn(this.email, this.password)
            if (result) {
                alert("Sign in with E-mail!");
                this.$store.state.accessToken = result.user.accessToken;
                this.$store.state.user = result.user.email;
                this.dialog = false;
                this.isSignIn = true;
            }
        },
        async signOut() {
            const result = await FirebaseService.signOut();
            if (result) {
                this.$store.state.accessToken = '';
                this.$store.state.user = '';
                this.isSignIn = false;
                alert("Sign out completed!");
                this.clear()
            }
        },
        clear() {
            this.name = '';
            this.email = '';
            this.signUpEmail = '';
            this.signUpPassword = '';
            this.password = '';
            this.confirmPassword = '';
            this.confirmRule = false;
        }
    },
    mounted: function () {
        console.log(this.$store.state)
    },
    computed: {
        comparePasswords() {
            return this.signUpPassword !== this.confirmPassword ? 'Passwords do not match' : ''
        },
        signInCheck() {
            return this.$store.state.user;
        }
    },
    watch: {
        dialog: function (val) {
            if (val == false) {
                this.isSignUp = false;
                this.clear()
            }
        },
        signInCheck(val, oldVal){
            if(val){
                this.isSignIn = true;
            }
        }
    }
}
</script>

<style scoped>
.input-with-icon {
    display: inline-flex;
}
</style>
