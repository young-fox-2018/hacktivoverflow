<template>
    <div>
        <div v-show="loading">
            <img src="../assets/loading.gif" alt="loading">
        </div>
        <div v-show="!loading">
            <h1>Top 5 Popular Users</h1>
            <!-- {{top5Users}} -->
            <canvas id="myChart" height="200px" width="500px">
            </canvas>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import Chart from 'chart.js';

export default {
    name: 'Popularity',
    data() {
        return {
            top5Users: [],
            loading: true,
            chartLabels: [],
            chartData: []
        }
    },
    methods: {
        createChart() {
            var ctx = document.getElementById("myChart")
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.chartLabels,
                    datasets: [{
                        label: '# of Upvotes',
                        data: this.chartData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        },
    },
    created: function() {
        this.loading = true
        axios({
            method: "PUT",
            url: "https://xavier-ho-server.thenile.online/ho/users"
        })
        .then(() => {
            return axios({
                method: "GET",
                url: "https://xavier-ho-server.thenile.online/ho/users"
            })
            .then(response => {
                let counter = 0
                response.data.forEach(user => {
                    if(counter < 5) {
                        this.top5Users.push(user)
                        this.chartLabels.push(user.name)
                        this.chartData.push(user.popularity)
                        counter += 1
                    }
                });

                this.loading = false
            })
        })
        .catch(err => {
            console.log(err.response)
        })
    },
    mounted: function() {
        this.createChart()
    }
}
</script>


<style scoped>

</style>
