<script>
import Chart from 'chart.js/auto';

export default {
  name: 'LineChartComponent',
  props: {
    linechart: {
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
      const canvas = this.$refs.lineChartCanvas;
      if (canvas) {
        this.chart = new Chart(canvas, {
          type: 'line',
          data: this.linechart.chartData,
          options: this.linechart.chartOptions
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
  <canvas ref="lineChartCanvas"></canvas>
</template>