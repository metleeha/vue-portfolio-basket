
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
                <v-card flat outlined class="dashboard-visits mx-auto">방문기록</v-card>
            </v-flex>
        </v-layout>
        <v-layout v-if="!adminToggle" mt-3 >
            <v-flex xs12>
                <v-card flat outlined class="dashboard-members mx-auto">멤버기록</v-card>
            </v-flex>
        </v-layout>
    </v-layout>

</template>

<script>
export default {
    data() {
        return {
            logToggle: true,
            adminToggle: false,
        }
    },
    methods: {
        navToggle(){
            this.logToggle = !this.logToggle
            this.adminToggle = !this.adminToggle
        }
    }
}
</script>


<style scoped>
.dashboard {
    display: block;
    margin: 5vh 0;
    padding: 0 10vw;
}
.dashboard-visits{
    text-align: center;
}
.dashboard-members{
    text-align: center;
}
</style>
