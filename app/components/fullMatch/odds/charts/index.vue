<template>
  <div>
    <line-chart :data="chartData" :options="chartOptions" :height="200" />
  </div>
</template>

<script>
export default {
  name: "history-charts",
  props: {
    matches: {
      default: [],
      required: true
    }
  },
  data() {
    return {
      chartData: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "Dataset 1",
            data: [12, 19, 3, 5, 2, 3],
            borderColor: "rgb(75, 192, 192)",
            yAxisID: "y"
          },
          {
            label: "Dataset 2",
            data: [1, 2, 3, 4, 5, 6],
            borderColor: "#ffffff",
            // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
            yAxisID: "y1"
          }
        ]
      },
      chartOptions: {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false
        },
        stacked: false,
        scales: {
          yAxes: [
            {
              type: "linear",
              display: true,
              position: "left",
              id: "y"
            },
            {
              type: "linear",
              display: true,
              position: "right",

              // grid line settings
              grid: {
                drawOnChartArea: false // only want the grid lines for one axis to show up
              },
              id: "y1"
            }
          ]
        }
      }
    };
  }
};
</script>
