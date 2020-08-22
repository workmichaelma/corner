<script>
import pickBy from 'lodash/pickBy'
import head from 'lodash/head'
import last from 'lodash/last'
import get from 'lodash/get'
export default {
  computed: {
    HADs () {
      return get(this.match, 'odds.HAD', [])
    },
    HAD1 () {
      return head(this.HADs)
    },
    HAD_1 () {
      return last(this.HADs)
    },
    CHLs () {
      return get(this.match, 'odds.CHL', [])
    },
    CHL1 () {
      return head(this.CHLs)
    },
    CHL_1 () {
      return last(this.CHLs)
    },
    HHAs () {
      return get(this.match, 'odds.HHA', [])
    },
    HHA1 () {
      return head(this.HHAs)
    },
    HHA_1 () {
      return last(this.HHAs)
    },
    HILs () {
      return get(this.match, 'odds.HIL', [])
    },
    HIL1 () {
      return head(this.HILs)
    },
    HIL_1 () {
      return last(this.HILs)
    },
  },
  methods: {
    noTime (arr) {
      return pickBy(arr, (v, k) => k !== 'time')
    }
  }
}
</script>