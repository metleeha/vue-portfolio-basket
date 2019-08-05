<template>
<v-card flat>
    <v-toolbar flat color="white">
        <v-toolbar-title>멤버 관리</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-flex xs3>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details xs-4></v-text-field>
        </v-flex>
    </v-toolbar>
    <v-data-table :headers="headers" :items="members" class="elevation-1" prev-icon="chevron_left" next-icon="chevron_right" sort-icon="sort" :search="search">
        <template v-slot:items="props">
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
</v-card>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'

export default {
    data: () => ({
        search: '',
        headers: [{
                text: 'name',
                align: 'center',
                value: 'name',
                width: "20%"
            },
            {
                text: 'E-mail',
                align: 'center',
                value: 'email',
                width: "30%"
            },
            {
                text: 'Authority',
                align: 'center',
                value: 'authority',
                width: "20%"
            },
            {
                text: 'Regdate',
                align: 'center',
                value: 'regdate',
                width: "20%"
            },
            {
                text: 'Action',
                align: 'center',
                sortable: false,
                width: "10%"
            }
        ],
        members: [{}],
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
