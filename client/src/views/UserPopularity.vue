<template>
    <div>
        <h3 style="font-family: 'Lobster', cursive;">User Popularity</h3>
        <hr>
        <table class="table">
            <thead class="thead-light">
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Popularity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in users" :key="index">
                    <th scope="row"></th>
                    <td>{{ data.name }}</td>
                    <td>{{ data.email }}</td>
                    <td>{{ data.popularity }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import apiHacktiv from '@/config/api-hacktivoverflow.js';
    
    export default {
        name: 'UserPopularity',
        data() {
            return {
                users: [],
            };
        },
        watch: {
            $route: function() {
                this.getSearch();
            },
        },
        methods: {
            getSearch() {
                apiHacktiv.get(`/users/popularity`)
                    .then(result => {
                        this.users = result.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
        },
        created() {
            this.getSearch();
        },
    };
</script>
