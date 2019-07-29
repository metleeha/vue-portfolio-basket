<template>
<v-dialog v-model="dialog" max-width="400px">
    <!-- signIn Button -->
    <template v-slot:activator="{ on }">
        <v-btn flat v-on="on">
            <v-icon left>input</v-icon>Sign In
        </v-btn>
    </template>
    <v-card>
        <!-- header -->
        <v-toolbar color="primary" dark>
            <v-toolbar-title><span class="headline">{{ title }}</span></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>

        <v-responsive v-show="isSignIn">
            <!-- contents -->
            <!-- signIn with E-mail -->
            <v-form>
                <v-container grid-list-md text-xs-center>

                    <v-layout wrap row>
                        <v-text-field class="input-with-icon" name='email' label='E-Mail' id='email' v-model='email' type='email' prepend-icon="mail_outline" required></v-text-field>
                        <v-text-field class="input-with-icon" name='password' label='Password' id='password' v-model='password' type='password' prepend-icon="lock" v-on:keyup.enter="signIn" required></v-text-field>
                    </v-layout>

                    <v-layout wrap row>
                        <v-flex>
                            <v-btn round color="primary" block @click="signIn">Sign In</v-btn>
                        </v-flex>
                    </v-layout>
                    <v-layout wrap row>
                        <v-flex xs6>
                            <a @click="isForgot=true"><small>Forgot your password?</small></a>
                        </v-flex>
                        <v-flex xs6>
                            <a @click="isSignUp=true"><small>Sign Up</small></a>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-form>
            <!-- /signIn with E-mail -->

            <!-- signIn without E-mail -->
            <v-container grid-list-md text-xs-center>
                <h4>Sign in with</h4>
                <v-layout row wrap justify-center>
                    <!-- circle-button -->
                    <template v-for="(service) in socialServices">
                        <v-btn fab :color="service.color" dark class="hidden-md-and-up" :key="service.icon">
                            <v-icon size="25" v-on:click="socialLogin(service.name)">{{service.icon}}</v-icon>
                        </v-btn>

                        <v-flex :key="service.name" xs6 class="hidden-sm-and-down">
                            <!-- bar-button -->
                            <v-btn round :color="service.color" dark v-on:click="socialLogin(service.name)" block>
                                <v-icon size="25" class="mr-2">{{service.icon}}</v-icon>{{service.name}}
                            </v-btn>
                        </v-flex>
                    </template>
                </v-layout>
            </v-container>
        </v-responsive>
        <!-- /Sign In -->
        <!-- sign up -->
        <v-responsive v-show="isSignUp">
            <v-form>
                <v-container grid-list-md text-xs-center>

                    <v-layout wrap row>
                        <v-text-field class="input-with-icon" name='email' label='E-Mail' id='signUpEmail' v-model='email' type='email' prepend-icon="mail_outline" required></v-text-field>
                        <v-text-field class="input-with-icon" name='name' label='Name' id='name' v-model='name' type='text' prepend-icon="face" required></v-text-field>
                        <v-text-field class="input-with-icon" name='password' label='Password' id='signUpPassword' v-model='password' type='password' prepend-icon="lock" required></v-text-field>
                        <v-text-field class="input-with-icon" name='confirmPassword' label='confirmPassword' id='confirmPassword' v-model='confirmPassword' type='password' prepend-icon="check_circle" :rules="[comparePasswords]" required></v-text-field>
                    </v-layout>
                    <v-layout wrap row>
                        <v-flex xs6>
                            <v-btn round color="primary" block @click="signUp">Sign Up</v-btn>
                        </v-flex>
                        <v-flex xs6>
                            <v-btn round color="secondary" block @click="isSignUp = false">Back</v-btn>
                        </v-flex>
                    </v-layout>

                </v-container>
            </v-form>
        </v-responsive>
        <!-- /sign up -->

        <!-- Forgot ID/PW -->
        <v-responsive v-show="isForgot">
            <v-form>
                <v-container grid-list-md text-xs-left>
                    <h4>가입시 사용하였던 이메일을 입력하시면, 패스워드 리셋 메일을 보내드립니다.</h4>
                    <v-layout wrap row>
                        <v-text-field class="input-with-icon" name='Email' label='E-Mail' id='forgot_Email' v-model='email' type='email' prepend-icon="mail_outline" required></v-text-field>
                    </v-layout>
                    <v-subheader>(5-10분정도 시간이 소요될 수 있습니다.)</v-subheader>
                    <v-layout wrap row>
                        <v-flex xs6>
                            <v-btn round color="primary" block @click="resetPW">reset</v-btn>
                        </v-flex>
                        <v-flex xs6>
                            <v-btn round color="secondary" block @click="isForgot = false">Back</v-btn>
                        </v-flex>
                    </v-layout>

                </v-container>
            </v-form>
        </v-responsive>
    </v-card>
    <!-- end modal -->
</v-dialog>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import store from '../store'

export default {
    name: 'signInMenu',
    store,
    data() {
        return {
            dialog: false,
            title: 'Sign In',
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            confirmRule: false,
            isSignIn: true,
            isSignUp: false,
            isForgot: false,
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
        async socialLogin(service) {
            FirebaseService.setAuthPersistence();
            let result = null;
            switch (service) {
                case "Google":
                    result = await FirebaseService.signInWithGoogle()
                    break;
                case "Facebook":
                    result = await FirebaseService.signInWithFacebook()
                    break;
                case "Github":
                    result = await FirebaseService.signInWithGithub();
                    break;
                case "Anonymous":
                    result = await FirebaseService.signInAnonymously();
                    break;
            }
            this.$store.state.user = result.user;
            this.dialog = false;
        },
        async signUp() {
            const result = await FirebaseService.signUp(this.email, this.password, this.name)
            if (result) {
                alert("Sign up Completed!");
                this.isSignUp = false;
                this.dialog = false;
                this.isSignedIn = true;
                this.clear()
            }
        },
        async signIn() {
            FirebaseService.setAuthPersistence();
            const result = await FirebaseService.signIn(this.email, this.password)
            if (result) {
                alert("Sign in with E-mail!");
                this.$store.state.user = result.user;
                this.dialog = false;
            }
        },
        async signOut() {
            const result = await FirebaseService.signOut();
            if (result) {
                this.$store.state.accessToken = '';
                this.$store.state.user = '';
                alert("Sign out completed!");
                this.clear()
            }
        },
        async resetPW() {
            const result = await FirebaseService.resetPW(this.email);
            if (result) {
                alert("이메일 전송 완료.");
                this.clear();
                this.isForgot = false;
            }
        },
        clear() {
            this.name = '';
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
            this.confirmRule = false;
        }
    },
    mounted: function () {},
    computed: {
        comparePasswords() {
            return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
        }
    },
    watch: {
        dialog: function (val) {
            if (val == false) {
                this.isSignUp = false;
                this.clear()
            }
        },
        isSignIn: function (val) {
            if (val == true) {
                this.title = "Sign In";
                this.isSignUp = false;
                this.isForgot = false;
            }
        },
        isForgot: function (val) {
            if (val == true) {
                this.title = "Forget Password?";
                this.isSignUp = false;
                this.isSignIn = false;
            } else {
                this.isSignIn = true;
            }
        },
        isSignUp: function (val) {
            if (val == true) {
                this.title = "Sign Up";
                this.isSignIn = false;
                this.isForgot = false;
            } else {
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
