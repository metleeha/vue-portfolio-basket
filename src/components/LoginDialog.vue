<template>
<v-layout row justify-center>
      <v-dialog v-model="loginDialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Legal first name*" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    label="Legal last name*"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Email*" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password*" type="password" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age*"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-autocomplete
                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                    label="Interests"
                    multiple
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
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
