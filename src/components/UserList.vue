<template>
	<v-container class="userlist mt-5">
		<v-layout row wrap>
			<v-flex d-flex="inline-block">
				<v-toolbar dark color="#1c2938">
					<v-toolbar-title class="white--text mr-5">Member</v-toolbar-title>
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
			</v-flex>
		</v-layout>
		<v-layout v-resize="onResize" class="userlist" column style="padding-top:30px;">
			<v-data-table 
				:headers="headers" 
				:items="members" 
				:search="search" 
				:pagination.sync="pagination" 
				:hide-headers="isMobile" 
				:class="{mobile: isMobile}"
			>
				<template slot="items" slot-scope="props">
					<tr v-if="!isMobile" >
						<td class="text-xs-center">{{ props.item.name }}</td>
						<td class="text-xs-center">{{ props.item.email }}</td>
						<td class="text-xs-center px-0 py-0">
							<v-btn-toggle mandatory v-model="props.item.authority">
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
						<td class="text-xs-center">{{ props.item.regdate }}</td>
						<td class="justify-center layout px-0 pt-2">
                <v-icon small @click="deleteItem(props.item)">
                    delete
                </v-icon>
            </td>
					</tr>
					<tr v-else>
						<td>
							<ul class="flex-content">
								<li class="flex-item" data-label="Name">{{ props.item.name }}</li>
								<li class="flex-item" data-label="E-mail">{{ props.item.email }}</li>
								<li class="flex-item" data-label="Authority">{{ props.item.authority }}</li>
								<li class="flex-item" data-label="Regdate">{{ props.item.regdate }}</li>
								<li class="flex-item" data-label="Action">
									<v-icon small @click="deleteItem(props.item)">delete</v-icon>
								</li>
							</ul>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-layout>
	</v-container>
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
					},
        ],
        members: [],
				authorityType: ['master', 'member', 'visitor'],
				isMobile: false,
				pagination: {
          sortBy: 'name'
        },
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
            // console.log(users);
            this.members = users;
        },

        deleteItem(item) {
            const index = this.members.indexOf(item)
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
				},
				onResize() {
          if (window.innerWidth < 769)
            this.isMobile = true;
          else
            this.isMobile = false;
				},
				toggleAll() {
          if (this.selected.length) this.selected = []
          else this.selected = this.members.slice()
        },
        changeSort(column) {
          console.log(column);
          if (this.pagination.sortBy === column) {
            this.pagination.descending = !this.pagination.descending
          } else {
            this.pagination.sortBy = column
            this.pagination.descending = false
          }
        }

    }
}
</script>
<style scoped>

.userlist {
	font-family: 'Literata', 'Noto Serif KR', serif;
	padding: 0 0;
}
.flex-item {
	text-align: center;
	justify-content: center;
}
table.v-table tbody tr {
	background-color: #F4F6F6;
	border-bottom: none;
}
table.v-table tbody td {
	font-size: 14px!important;
}

table.v-table td {
	height: max-content!important;
}
	.mobile {
		color: #333;
	}

	@media screen and (max-width: 768px) {
		.mobile table.v-table tr {
			max-width: 100%;
			position: relative;
			display: block;
		}

		.mobile table.v-table tr:nth-child(odd) {
			border-left: 6px solid deeppink;
		}

		.mobile table.v-table tr:nth-child(even) {
			border-left: 6px solid darkgrey;
		}

		.mobile table.v-table tr td {
			display: flex;
			width: 100%;
			border-bottom: 1px solid #f5f5f5;
			height: auto;
			padding: 10px;
		}

		.mobile table.v-table tr td ul li:before {
			content: attr(data-label);
			padding-right: .5em;
			text-align: center;
			display: block;
			color: #999;

		}
		.v-datatable__actions__select
		{
			width: 50%;
			margin: 0px;
			justify-content: flex-start;
		}
		.mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
			background: transparent;
		}

	}

	.flex-content {
		padding: 0;
		margin: 0;
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		width: 100%;
	}

	.flex-item {
		padding: 5px;
		width: 50%;
		height: 40px;
		font-weight: bold;
	}

</style>
