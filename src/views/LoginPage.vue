<template>
	<v-layout align-center justify-center row fill-height>
		<v-flex xs12 sm4 text-xs-center>
			<div>
				<!-- SignIn modal -->
				<v-dialog v-model="signInDialog" row justify-center max-width="500px">
					<template v-slot:activator="{ on }">
						<v-btn round color="#s2s2s2" dark style="width:100%;" v-on="on">SignIn</v-btn>
					</template>
					<v-card>
						<v-card-title primary-title class="layout justify-center"> 
							<h1>Sign In</h1>
						</v-card-title>
						<v-card-text>
							<v-container grid-list-md>
								<form @submit.prevent="">
									<v-layout row>
										<v-flex xs12>
											<v-text-field
												name='email'
												label='Mail'
												id='email'
												v-model='email'
												type='email'
												required>
											</v-text-field>
										</v-flex>
									</v-layout>
									<v-layout row>
										<v-flex xs12>
											<v-text-field
												name='password'
												label='Password'
												id='password'
												v-model='password'
												type='password'
												required>
											</v-text-field>
										</v-flex>
									</v-layout>
									<v-card-actions class='mr-2'>
										<v-spacer></v-spacer>
										<v-btn color="blue darken-1" flat @click="signInDialog = false">Close</v-btn>
										<v-btn color="blue darken-1" flat @click="signIn">Sign In</v-btn>
									</v-card-actions>
								</form>
							</v-container>
						</v-card-text>
					</v-card>
				</v-dialog>	  
			</div>
			<div>
				<!-- Signup modal -->
				<v-dialog v-model="signUpDialog" row justify-center max-width="500px">
					<template v-slot:activator="{ on }">
						<v-btn round color="#s2s2s2" dark style="width:100%;" v-on="on">SignUp</v-btn>
					</template>
					<v-card>
						<v-card-title primary-title class="layout justify-center"> 
							<h1>Sign Up</h1>
						</v-card-title>
						<v-card-text>
							<v-container grid-list-md>
								<form @submit.prevent="">
									<v-layout row>
										<v-flex xs12>
											<v-text-field
												name='email'
												label='Mail'
												id='email'
												v-model='email'
												type='email'
												required>
											</v-text-field>
										</v-flex>
									</v-layout>
									<v-layout row>
										<v-flex xs12>
											<v-text-field
												name='password'
												label='Password'
												id='password'
												v-model='password'
												type='password'
												required>
											</v-text-field>
										</v-flex>
									</v-layout>
									<v-layout row>
										<v-flex xs12>
											<v-text-field
												name='confirmPassword'
												label='Confirm Password'
												id='confirmPassword'
												v-model='confirmPassword'
												type='password'
												:rules="[comparePasswords]">
											</v-text-field>
										</v-flex>
									</v-layout>
									<v-card-actions class='mr-2'>
										<v-spacer></v-spacer>
										<v-btn color="blue darken-1" flat @click="signUpDialog = false">Close</v-btn>
										<v-btn color="blue darken-1" flat @click="signUp">Save</v-btn>
									</v-card-actions>
								</form>
							</v-container>
						</v-card-text>
					</v-card>
				</v-dialog>	  
			</div>
			<div>
				<v-btn round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:100%;"><v-icon size="25" class="mr-2">fa-google</v-icon> Google 로그인</v-btn>
			</div>
			<div>
				<v-btn round color="blue" dark v-on:click="loginWithFacebook" style="width:100%;"><v-icon size="25" class="mr-2">fa-facebook</v-icon> Facebook 로그인</v-btn>
			</div>
			
		</v-flex>

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
			signInDialog: false,
			signUpDialog: false,
			email: '',
            password: '',
            confirmPassword: '',
		}
	},
	components: {
	},
	methods: {
		async loginWithGoogle() {
			const result = await FirebaseService.loginWithGoogle()
			this.$store.state.accessToken = result.accessToken
			this.$store.state.user = result.user
			this.$router.replace('/')
		},
		async loginWithFacebook(){
			const result = await FirebaseService.loginWithFacebook()
			this.$store.state.accessToken = result.credential.accessToken
			this.$store.state.user = result.user
			this.$router.replace('/')
		},
		async signUp(){
			const result = await FirebaseService.signUp(this.email, this.password)
			if(result){
				alert("가입완료!");
				this.email = "";
				this.password = "";
				this.confirmPassword = "";
				this.signUpDialog = false;
			}
		},
		async signIn(){
			const result = await FirebaseService.signIn(this.email, this.password)
			if(result){
				alert("로그인!");
				this.$store.state.accessToken = result.accessToken;
				this.$store.state.user = result.user;
				this.$router.replace('/');
			}
		}
	},
	mounted: function() {
		console.log(this.$store.state)
	},
	computed: {
		comparePasswords () {
            return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
        }
	}
}
</script>
