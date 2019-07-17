<template>
    
    <v-dialog v-model="dialog" max-width="400px">
        <!-- Login Button -->
        <template v-slot:activator="{ on }">
            <v-btn flat v-on="on" v-show="!isLogin">
                <v-icon left>input</v-icon>
                Login
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
                <!-- Login with E-mail -->
                <v-form>
                    <v-container grid-list-md text-xs-center>

                        <v-layout wrap row>
                            <v-text-field class="input-with-icon" name='email' label='E-Mail' id='email' v-model='email' type='email' prepend-icon="face" required></v-text-field>
                            <v-text-field class="input-with-icon" name='password' label='Password' id='password' v-model='password' type='password' prepend-icon="lock" required></v-text-field>
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
                            <v-text-field class="input-with-icon" name='email' label='E-Mail' id='email' v-model='email' type='email' prepend-icon="face" required></v-text-field>
                            <v-text-field class="input-with-icon" name='password' label='Password' id='password' v-model='password' type='password' prepend-icon="lock" required></v-text-field>
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
    name: 'LoginPage',
    store,
    data() {
        return {
			dialog: false,
			name: '',
            email: '',
            password: '',
			confirmPassword: '',
			confirmRule: false,
			isLogin: false,
			isSignUp: false
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
                this.$store.state.accessToken = result.user.accessToken;
                this.$store.state.user = result.user.email;
                console.log(this.$store);
                this.dialog = false;
                this.isLogin = true;
            }
        }
    },
    mounted: function () {
        console.log(this.$store.state)
    },
    computed: {
        comparePasswords() {
            return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
        },
        loginCheck() {
            return this.$store.state.accessToken;
		}
	},
	watch:{
		dialog: function(val){
			if(val == false){
				this.isSignUp = false;
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
