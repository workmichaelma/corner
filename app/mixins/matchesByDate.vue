<script>
import { get, reduce } from "lodash";
import moment from "moment";
export default {
  computed: {
    datePicked() {
      return get(this, "$store.state.header.scheduleData.datePicked");
    },
    data() {
      return reduce(
        this.matches,
        (date, m) => {
          const { matchDate, matchTime, matchDatetime } = m;
          let d = moment(matchDatetime).format("DDMM");
          if (parseInt(matchTime.substr(0, 2)) < 13) {
            d = moment(matchDatetime)
              .subtract(1, "days")
              .format("DDMM");
          }
          date[d] = [...(date[d] || []), m];

          return date;
        },
        {}
      );
    },
    schedule() {
      return this.data[this.datePicked] || [];
    }
  },
  created() {
    this.$store.dispatch("header/setScheduleData", {
      data: this.data
    });
  },
  beforeDestroy() {
    this.$store.dispatch("header/setScheduleData", {});
  }
};
</script>
