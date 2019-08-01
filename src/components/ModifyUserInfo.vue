<template>
<v-dialog v-model="dialog" max-width="400px">
    <!-- signIn Button -->
    <template v-slot:activator="{ on }">
        <v-list-tile v-on="on">
            My Info
        </v-list-tile>
    </template>
    <v-card>
        <!-- header -->
        <v-toolbar color="primary" dark>
            <v-toolbar-title><span class="headline">회원 정보 수정</span></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="clear">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-responsive>
            <v-form>
                <v-container grid-list-md text-xs-center>

                    <v-layout wrap row>
                        <v-text-field class="input-with-icon" name='email' label='E-Mail' id='Email' v-model='email' type='email' prepend-icon="mail_outline" required disabled></v-text-field>
                        <v-text-field class="input-with-icon" name='name' label='Name' id='name' v-model='name' type='text' prepend-icon="face"></v-text-field>
                        <v-text-field class="input-with-icon" name='password' label='Recent password' id='Password' v-model='beforePassword' type='password' prepend-icon="lock" required></v-text-field>
                        <v-text-field class="input-with-icon" name='password' label='Password' id='Password' v-model='password' type='password' prepend-icon="lock" required></v-text-field>
                        <v-text-field class="input-with-icon" name='confirmPassword' label='confirmPassword' id='confirmPassword' v-model='confirmPassword' type='password' prepend-icon="check_circle" :rules="[comparePasswords]" required></v-text-field>
                    </v-layout>
                    <v-layout wrap row>
                        <v-flex xs6>
                            <v-btn round color="primary" block @click="modify">Modify</v-btn>
                        </v-flex>
                        <v-flex xs6>
                            <v-btn round color="secondary" block @click="clear">Back</v-btn>
                        </v-flex>
                    </v-layout>

                </v-container>
            </v-form>
        </v-responsive>
        <!-- /sign up -->
    </v-card>
    <!-- end modal -->
</v-dialog>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import store from '../store'

export default {
    name: 'modifyUser',
    store,
    data() {
        return {
            dialog: false,
            name: '',
            email: '',
            beforePassword: '',
            password: '',
            confirmPassword: '',
            confirmRule: false,
        }
    },
    components: {},
    methods: {
        modify(){
            if(firebase.modifyMyInfo(this.name, this.password)){
                alert('변경 완료');
            }
        },
        clear() {
            this.beforePassword= '';
            this.password = '';
            this.confirmPassword = '';
            this.confirmRule = false;
            this.dialog = false;
        }
    },
    mounted: function () {
        let user = this.$store.getters.getUser;
        this.name = user.name;  
        this.email = user.email;
    },
    computed: {
        comparePasswords() {
            return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
        }
    },
    watch: {
    }
}
</script>

<style scoped>
.input-with-icon {
    display: inline-flex;
}
</style>
