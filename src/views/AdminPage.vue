
<template>
    <v-layout grid-list-md class="dashboard">
        <v-layout wrap row justify-space-around>
            <v-flex xs6 text-xs-center>
                <v-btn @click="navToggle" block large :flat="logToggle" :dark="!logToggle" 
                :text--white="!logToggle" :color="logToggle? '#3a718c':'#f0bebe'">Log Info</v-btn>
            </v-flex>
            <v-flex xs6 text-xs-center>
                <v-btn @click="navToggle" block large :flat="adminToggle" :dark="!adminToggle" 
                :text--white="!admingToggle" :color="adminToggle? '#3a718c':'#f0bebe'">Membership</v-btn>
            </v-flex>
        </v-layout>
        <v-layout v-if="!logToggle" mt-3 >
            <v-flex xs12>
                <v-card flat outlined class="dashboard-visits mx-auto">방문기록
                    <v-card-text>TODAY: {{ todayView }} </v-card-text>
                    <v-card-text>TOTAL: {{ totalView }}</v-card-text>
                    <v-card-text>일별 방문자수 그래프</v-card-text>
                    <v-card-text>포트폴리오 게시글수, 포스팅 게시글수, 댓글</v-card-text>
                    <v-card-text>방문경로: 직접 url, 검색엔진/ 접근기기: 모바일, 데스크탑</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout v-if="!adminToggle" mt-3 >
            <v-flex xs12>
                <v-card-text>관리자, 팀, 유저 필터바</v-card-text>
                <v-card flat outlined class="dashboard-members mx-auto">멤버기록</v-card>
                <v-card-text>일별 가입자수 그래프</v-card-text>
            </v-flex>
        </v-layout>
    </v-layout>

</template>

<script>
import FirebaseService from '../services/FirebaseService'

export default {
    data() {
        return {
            logToggle: true,
            adminToggle: false,
            todayView: 0,
			totalView: 0
        }
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
		this.initViewLog()		
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
}
.dashboard-members{
    text-align: center;
}
</style>
