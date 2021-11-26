import Vue from "vue";
import VueFusionCharts from "vue-fusioncharts";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";

// register VueFusionCharts component
if (process.client) {
  Vue.use(VueFusionCharts, FusionCharts, TimeSeries);
}
