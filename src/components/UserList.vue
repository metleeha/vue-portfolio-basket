<template>
	<v-container class="userlist">
		<v-toolbar dark color="#fe23sd" fixed>
        <v-toolbar-title class="white--text">Member</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <!-- <v-menu offset-y :nudge-left="170" :close-on-content-click="false">
            <v-btn icon slot="activator">
                <v-icon>more_vert</v-icon>
              </v-btn>
            <v-list>
              <v-list-tile  v-for="(item, index) in headers"  :key="item.value"   @click="changeSort(item.value)">
                <v-list-tile-title>{{ item.text }}<v-icon v-if="pagination.sortBy === item.value">{{pagination.descending ? 'arrow_downward':'arrow_upward'}}</v-icon></v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu> -->
		</v-toolbar>
	</v-container>
	<!-- <v-container class="userlist">
		<v-layout row wrap mb-5>
			<v-flex xs12 d-flex="inline-block" justify-center class="mb-3">
				<v-flex xs8 text-xs-center>
					<v-text-field v-model="search" append-icon="search" label="Search"
												single-line hide-details></v-text-field>
				</v-flex>
			</v-flex>
			<v-flex xs12>
				<v-container grid-list-md>
					<v-layout row wrap>
						<v-data-table xs12 sm6 :headers="headers" :items="members" class="elevation-1" prev-icon="chevron_left" next-icon="chevron_right" sort-icon="sort" :search="search">
								<template v-slot:items="props">
											<v-flex xs12 sm6>
												<td>{{ props.item.name }}</td>
											</v-flex>
											<v-flex xs12 sm6>
												<td>{{ props.item.email }}</td>
											</v-flex>
										<td>{{ props.item.name }}</td>
										<td>{{ props.item.email }}</td>
										<td>
												<v-btn-toggle mandatory v-model="props.item.authority" v-if="props.item.name != 'master'">
														<v-btn flat value="master" v-on:click="changeAuthMaster(props.item)">
																master
														</v-btn>
														<v-btn flat value="member" v-on:click="changeAuthMember(props.item)">
																member
														</v-btn>
														<v-btn flat value="visitor" v-on:click="changeAuthVisitor(props.item)">
																visitor
														</v-btn>
												</v-btn-toggle>
										</td>
										<td>{{ props.item.regdate }}</td>
										<td class="justify-center layout px-0">
												<v-icon small @click="deleteItem(props.item)">
														delete
												</v-icon>
										</td>
								</template>
							</v-data-table>
					</v-layout>
				</v-container>
			</v-flex>
		</v-layout>
	</v-container> -->
</template>

<script>
import FirebaseService from '@/services/FirebaseService'

export default {
    data: () => ({
        search: '',
        headers: [
						{
                text: 'name',
                align: 'center',
                value: 'name',
                // width: "20%"
            },
            {
                text: 'E-mail',
                align: 'center',
                value: 'email',
                // width: "30%"
            },
            {
                text: 'Authority',
                align: 'center',
                value: 'authority',
                // width: "20%"
            },
            {
                text: 'Regdate',
                align: 'center',
                value: 'regdate',
                // width: "20%"
            },
            {
                text: 'Action',
                align: 'center',
                sortable: false,
                // width: "10%"
            }
        ],
        members: [],
        authorityType: ['master', 'member', 'visitor']
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        }
    },
    created() {
        this.initialize()
    },

    methods: {
        async initialize() {
            const users = await FirebaseService.getMemberList();
            console.log(users);
            this.members = users;
        },

        deleteItem(item) {
            const index = this.desserts.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
        },

        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
        async changeAuthMaster(item) {
            FirebaseService.changeAuthMaster(item);
        },
        async changeAuthMember(item){
            FirebaseService.changeAuthMember(item);
        },
        async changeAuthVisitor(item){
            FirebaseService.changeAuthVisitor(item);
        }

    }
}
</script>
<style scoped>
.userlist {
	font-family: 'Literata', 'Noto Serif KR', serif;
}

</style>
