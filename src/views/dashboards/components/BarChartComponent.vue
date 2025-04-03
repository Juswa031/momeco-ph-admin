<script>
import Chart from 'chart.js/auto';

export default {
  name: 'BarChartComponent',
  props: {
    barchart: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
    };
  },
  methods: {
    initializeChart() {
      const canvas = this.$refs.barChartCanvas;
      if (canvas) {
        this.chart = new Chart(canvas, {
          type: 'bar',
          data: this.barchart.chartData,
          options: this.barchart.chartOptions
        });
      } else {
        console.error('Canvas reference is null or undefined.');
      }
    },
    destroyChart() {
      if (this.chart) {
        this.chart.destroy();
      }
    }
  },
  mounted() {
    this.initializeChart();
  },
  beforeUnmount() {
    this.destroyChart();
  }
};
</script>

<template>
  <canvas ref="barChartCanvas"></canvas>
</template>