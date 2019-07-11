<template>
    <v-dialog v-model="dialog" max-width="450">
    <v-container>
        <v-layout row justify-content>
            <v-flex xs12 sm6 offset-sm3>
                <v-card-text>
                    <v-container>
                        <form @submit.prevent="">
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                        name='email'
                                        label='Mail'
                                        id='email'
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
                            <v-layout row>
                                <v-flex xs6 offset-xs6 align-end>
                                    <v-btn type='submit'>Sign Up</v-btn>
                                </v-flex>
                            </v-layout>
                        </form>
                    </v-container>
                </v-card-text>
            </v-flex>
        </v-layout>
    </v-container>
    </v-dialog>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'

export default {
    data(){
        return {
            eamil: '',
            password: '',
            confirmPassword: '',
            dialog: false
        }
    },
    computed: {
        comparePasswords () {
            return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
        }
    },
    methods: {

    },
    created() {
        var vm = this
        bus.$on('dialog', function(value){
            vm.dialog = value
        })
    }
    }

</script>
