<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["data", "options"],
  mounted() {
    console.log({ data: this.data, o: this.options });
    this.renderChart(this.data, this.options);
  }
};
</script>
