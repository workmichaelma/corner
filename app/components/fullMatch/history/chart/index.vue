<template>
  <div>
    <line-chart :data="chartData" :options="chartOptions" :height="200" />
  </div>
</template>

<script>
import map from "lodash/map";
import get from "lodash/get";
export default {
  name: "history-charts",
  props: {
    matches: {
      default: [],
      required: true
    },
    teamId: {
      default: "",
      required: true
    }
  },
  computed: {
    chartData() {
      return {
        labels: map(this.matches, "matchDate"),
        datasets: [
          {
            type: "line",
            label: "總數",
            data: map(this.matches, m => {
              return get(m, "result.corner.full.total", -1);
            }),
            // borderColor: "rgb(75, 192, 192)",
            borderColor: "#fff",
            yAxisID: "y",
            stepped: true
          },
          {
            type: "bar",
            label: "排名",
            data: map(this.matches, m => {
              const isHome = get(m, "homeTeam.teamId", "") === this.teamId;
              return isHome
                ? get(m, "awayTeam.rank", "")
                : get(m, "homeTeam.rank", "");
            }),
            borderColor: "#F44336",
            backgroundColor: "#F4433680",
            yAxisID: "y1",
            stepped: true
          }
        ]
      };
    }
  },
  data() {
    return {
      // chartData: {
      //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      //   datasets: [
      //     {
      //       label: "Dataset 1",
      //       data: [12, 19, 3, 5, 2, 3],
      //       borderColor: "rgb(75, 192, 192)",
      //       yAxisID: "y"
      //     },
      //     {
      //       label: "Dataset 2",
      //       data: [1, 2, 3, 4, 5, 6],
      //       borderColor: "#ffffff",
      //       yAxisID: "y1"
      //     }
      //   ]
      // },
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
