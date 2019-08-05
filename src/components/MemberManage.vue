<template>
<div>
    <v-toolbar flat color="white">
        <v-toolbar-title>멤버 관리</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
    </v-toolbar>
    <v-data-table :headers="headers" :items="members" class="elevation-1" prev-icon="chevron_left" next-icon="chevron_right" sort-icon="sort">
        <template v-slot:items="props">
            <td width="20%">{{ props.item.name }}</td>
            <td width="20%">{{ props.item.email }}</td>
            <td width="20%" class="pa-0">
                <v-btn-toggle v-model="props.item.authority" >
                    <v-btn flat value="master">
                        master
                    </v-btn>
                    <v-btn flat value="member">
                        member
                    </v-btn>
                    <v-btn flat value="visitor">
                        visitor
                    </v-btn>
                </v-btn-toggle>
            </td>
            <td width="20%">{{ props.item.regdate }}</td>
        </template>
    </v-data-table>
</div>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'

export default {
    data: () => ({
        dialog: false,
        headers: [{
                text: 'name',
                align: 'center',
                value: 'name'
            },
            {
                text: 'E-mail',
                align: 'center',
                value: 'email'
            },
            {
                text: 'Authority',
                align: 'center',
                value: 'authority'
            },
            {
                text: 'Regdate',
                align: 'center',
                value: 'regdate'
            }
        ],
        members: [{
        }],
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
            console.log("================================");
            console.log(users);
            console.log("================================");
            this.members = users;
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
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
        }
    }
}
</script>
