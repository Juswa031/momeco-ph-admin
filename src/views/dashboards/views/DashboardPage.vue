<script>
import BarChartComponent from '../components/BarChartComponent.vue';
import CalculationChartComponent from '../components/CalculationChartComponent.vue';
import LineChartComponent from '../components/LineChartComponent.vue';

export default {
    components: {
        BarChartComponent,
        CalculationChartComponent,
        LineChartComponent
    },
    data() {
        return {
            calculations: [
                {
                    icon: 'bag',
                    label: 'Total Number of Orders',
                    value: 300,
                    type: 'numeric'
                },
                {
                    icon: 'bag',
                    label: 'Pending Orders',
                    value: 50,
                    type: 'numeric'
                },
                {
                    icon: 'cash',
                    label: 'Revenue',
                    value: 5000,
                    type: 'currency'
                }
            ],
            barcharts: [
                {
                    chartData: {
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
                        datasets: [{
                        label: 'Top 5 Products',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                        }]
                    },
                    chartOptions: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    },
                },
                {
                    chartData: {
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
                        datasets: [{
                        label: 'Top 5 Categories',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                        }]
                    },
                    chartOptions: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    },
                }
            ],
            linecharts: [
                {
                    chartData: {
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
                        datasets: [{
                        label: 'Daily Reports',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                        }]
                    },
                    chartOptions: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    },
                },
                {
                    chartData: {
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
                        datasets: [{
                        label: 'Monthly Reports',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                        }]
                    },
                    chartOptions: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    },
                },
                {
                    chartData: {
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
                        datasets: [{
                        label: 'Yearly Reports',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                        }]
                    },
                    chartOptions: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    },
                },
            ]
        }
    }
}
</script>
<template>
    <h1 class="g-heading-1 mb-4">Dashboard</h1>
    <div class="d-flex flex-wrap justify-content-between gap-3">
        <div class="col" v-for="calculation in calculations" :key="calculation">
             <CalculationChartComponent :calculation="calculation"/>
        </div>
    </div>
    <div class="d-flex flex-wrap justify-content-center align-items-center gap-3 mt-5">
        <div class="col-6 card p-2 w-auto" v-for="barchart in barcharts" :key="barchart">
            <BarChartComponent :barchart="barchart"/>
        </div>
    </div>
    <div class="d-flex flex-wrap justify-content-center align-items-center gap-3 mt-5">
        <div class="col-auto card p-2 w-auto" v-for="linechart in linecharts" :key="linechart">
            <LineChartComponent :linechart="linechart"/>
        </div>
    </div>

</template>