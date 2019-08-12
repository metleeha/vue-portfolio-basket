
<template>
    <v-layout grid-list-md class="dashboard">
        <v-layout wrap row justify-space-around>
            <v-flex xs6 text-xs-center>
                <v-btn @click="navToggle" block large :flat="logToggle" :dark="!logToggle" 
                :text--white="!logToggle" :color="logToggle? '#3a718c':'#f0bebe'">Log Info</v-btn>
            </v-flex>
            <v-flex xs6 text-xs-center>
                <v-btn @click="navToggle" block large :flat="adminToggle" :dark="!adminToggle" 
                :text--white="!adminToggle" :color="adminToggle? '#3a718c':'#f0bebe'">Membership</v-btn>
            </v-flex>
        </v-layout>
        <v-layout column v-if="!logToggle">
            <v-flex xs12>
                <v-card flat class="dashboard-visits mx-auto my-2" color="#F4F6F6">
                    <v-card-text>TODAY: {{ todayView }} </v-card-text>
                    <v-card-text>TOTAL: {{ totalView }}</v-card-text>
                </v-card>
                <PageViewChart></PageViewChart>
            </v-flex>
        </v-layout>
        <v-layout v-if="!adminToggle" mt-3 >
            <v-flex xs12 justify-center>   
                <UserList></UserList>
            </v-flex>
        </v-layout>
    </v-layout>

</template>

<script>
import FirebaseService from '../services/FirebaseService'
import UserList from '../components/UserList'
import PageViewChart from '../components/PageViewChart'

export default {
    data() {
        return {
            logToggle: true,
            adminToggle: false,
            todayView: 0,
			totalView: 0
        }
    },
    components: {
        UserList,
        PageViewChart
    },
    methods: {
        navToggle(){
            this.logToggle = !this.logToggle
            this.adminToggle = !this.adminToggle
        },
        async initViewLog() {
			this.todayView = await FirebaseService.getTodayView()
			this.totalView = await FirebaseService.getTotalView()
			this.totalView += this.todayView
		}
    },
    created() {
		this.initViewLog();		
    }
}
</script>


<style scoped>
.dashboard {
    display: block;
    margin: 5vh 0;
    padding: 0 10vw;
    font-family: 'Lato', sans-serif;
}
.dashboard-visits{
    text-align: center;
    font-family: 'Literata', 'Noto Serif KR', serif;
    font-size: 1.5em;
}
.dashboard-members{
    text-align: center;
}
</style>
