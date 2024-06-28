<template>
    <div>
        <sidebar></sidebar>


        <div class="container mt-5" dir="rtl">
            <h2 class="text-center mb-4 text-primary">مدریت کاربران</h2>

            <!-- Display existing users in a table -->
            <h3 class="text-center mb-4 text-secondary">کاربران موجود</h3>
            <b-table striped hover :items="users" :fields="fields" class="shadow-sm bg-light rounded border">
                <template #cell(actions)="row">
                    <b-button @click="viewProfile(row.item.username)" variant="success" size="sm"
                        class="mr-2">پروفایل</b-button>
                    <b-button @click="editUser(row.item.username)" variant="primary" size="sm"
                        class="mr-2">ویرایش</b-button>
                    <b-button @click="deleteUser(row.index, row.item.username)" variant="danger" class="mr-2"
                        size="sm">حذف</b-button>
                </template>
            </b-table>

            <!-- Modal for showing user profile -->
            <b-modal id="user-profile-modal" v-if="selectedUser" title="User Profile" @hide="selectedUser = null">
                <p><strong>Name:</strong> {{ selectedUser.name }}</p>
                <p><strong>Email:</strong> {{ selectedUser.email }}</p>
            </b-modal>

            <!-- Modal for editing user -->
            <b-modal id="edit-user-modal" title="Edit User" @hide="resetEditUser" v-if="editingUser !== null">
                <b-form @submit.prevent="updateUser">
                    <b-form-group label="User Name" label-for="edit-user-name">
                        <b-form-input id="edit-user-name" v-model="editingUser.name" required></b-form-input>
                    </b-form-group>
                    <b-form-group label="User Email" label-for="edit-user-email">
                        <b-form-input id="edit-user-email" v-model="editingUser.email" type="email"
                            required></b-form-input>
                    </b-form-group>
                    <b-button type="submit" variant="success">Save Changes</b-button>
                    <b-button variant="secondary" @click="resetEditUser">Cancel</b-button>
                </b-form>
            </b-modal>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie';
import Sidebar from './sideBar.vue';
import { getSession } from '../utils/sessionUtils'
/* eslint-disable */
export default {
    data() {
        return {
            selectedUser: null,
            editingUser: null,
            editingUserIndex: null,
            users: [
                { name: 'John Doe', email: 'john@example.com' },
                { name: 'Jane Smith', email: 'jane@example.com' }
            ], // Initial users data (replace with your data)
            fields: [
                { key: 'first_name', label: 'نام  ', class: 'text-right' },
                { key: 'last_name', label: 'نام خانوادگی', class: 'text-right' },
                { key: 'username', label: 'نام کاربری', class: 'text-right' },
                { key: 'role', label: ' سطح دسترسی', class: 'text-right' },
                { key: 'actions', label: 'عملیات', class: 'text-right ' }
            ],
            token: Cookies.get('token'),
        };
    },
    methods: {
        makeToast(variant = null, message) {
            this.$bvToast.toast(message, {
                title: ``,
                variant: variant,
                solid: true
            })
        },
        async fetchUsers() {
            try {

                // const query = this.$router.history.current.query
                let config = {
                    method: 'GET',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:3000/admin/users/',
                    headers: { token: this.token }
                };

                // axios.request(config)
                const response = await axios.request(config)
                console.log('response is ')
                console.log(response.data)
                console.log(response.data.users)
                this.users = response.data.users
            } catch (err) {
                console.log(err)
                this.users = []
            }

        },

        async deleteUser(index, username) {
            try {

                // const query = this.$router.history.current.query
                let config = {
                    method: 'DELETE',
                    maxBodyLength: Infinity,
                    url: `http://localhost:3000/admin/users/${username}`,
                    headers: { token: this.token }
                };

                await axios.request(config)

                this.makeToast("success","کاربر با موفقیت حذف شد")
                this.users.splice(index, 1);
            } catch (err) {
                console.log(err)
                this.makeToast("danger","حذف کاربر با خطا مواجه شد")
            }
        },
        viewProfile(username) {
            console.log('this is username')
            console.log(username)
            this.$router.push(`/profile/${username}`);
            // Handle profile view logic here
        },
        editUser(username) {
            this.$router.push(`/admin/edit-user/${username}`);

            // this.editingUser = { ...user };
            // this.editingUserIndex = index;
            // this.$bvModal.show('edit-user-modal');
        },
        updateUser() {
            if (this.editingUserIndex !== null) {
                this.$set(this.users, this.editingUserIndex, this.editingUser);
                this.resetEditUser();
            }
        },
        resetEditUser() {
            this.editingUser = null;
            this.editingUserIndex = null;
            this.$bvModal.hide('edit-user-modal');
        }
    },
    created() {
        this.user = getSession(this.token)
        if (this.user.role != "admin")
            this.$router.push('/404');
        this.fetchUsers()

    },
    components: {
        Sidebar
    }
};
</script>

<style scoped>
.container {
    margin-top: 10% !important;
    margin-bottom: 5% !important;
    max-width: 900px;
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.text-center {
    text-align: center;
}

.mb-4,
.mt-5 {
    margin-bottom: 1.5rem;
}

.shadow-sm {
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
}

.bg-light {
    background-color: #f0f0f0 !important;
}

.rounded {
    border-radius: .25rem !important;
}

.border {
    border: 1px solid #dee2e6;
}

.table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
}

.table-hover tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.text-primary {
    color: #007bff !important;
}

.text-secondary {
    color: #6c757d !important;
}
</style>