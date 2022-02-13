<template>
  <div class="portfolio">
    <NuxtLink to="/" class="">
      <div class="text-white nav-title">
        <img src="~/assets/icons/Union.png" alt="Union" class="union-icon">
        <div>
          {{ assetsData[0].name }}
        </div>
      </div>
    </NuxtLink>
    <div class="part-panel">
      <div class="back-purple border-style">
        <div class="trend-display">
          <div class="eth-price">
            <img :src="getImgUrl(assetsData[0].symbol)" :alt="assetsData[0].symbol" class="eth-icon">
            <div class="eth-text">
              <div class="text-white trend-price">
                {{ assetsData[0].price }} <sup class="text-purple">EUR</sup>
              </div>
              <div class="coin-trend">
                <span v-if="periodValue.isUptrend">&#8593;</span><span v-else>&#8594;</span> {{ periodValue.amount }} EUR ({{ periodValue.percents }}%)
              </div>
            </div>
          </div>
          <div class="text-purple">
            {{ periodValue.period }}
          </div>
        </div>
        <line-chart :chart-data="chart" />
        <div class="btn-panel">
          <button v-for="(state, i) in picked" :key="i" class="select-btn" :class="picked[i].state?'select-active':'select-inactive'" @click="selectDay(i) ">
            {{ state.name }}
          </button>
        </div>
      </div>
    </div>
    <div class="part-panel">
      <div class="text-purple item-title">
        Alerts
      </div>
      <div class="back-purple border-style">
        <div class="alerts-panel">
          <div class="eth-price">
            <img src="~/assets/icons/eth.png" alt="ETH" class="eth-icon">
            <div class="eth-text">
              <div class="text-white alert-price">
                10 400<sup class="text-purple">EUR</sup>
              </div>
              <div class="text-purple">
                ( &#8593; 102.99%)
              </div>
            </div>
          </div>
          <div class="trash">
            <img src="~/assets/icons/Squircle.png" alt="Squircle" class="Squircle-icon">
            <img src="~/assets/icons/trash.png" alt="trash" class="trash-icon">
          </div>
        </div>
      </div>
    </div>
    <div class="part-panel">
      <div class="text-purple item-title">
        Info
      </div>
      <div class="back-purple border-style">
        <div class="cal-item-b">
          <div class="text-purple cal-title">
            Circulating Supply
          </div>
          <div class="text-white">
            {{ numberWithCommas(assetsData[0].circulatingSupply) }}
          </div>
        </div>
        <div class="cal-item">
          <div class="text-purple cal-title">
            Max Supply
          </div>
          <div class="text-white">
            {{ numberWithCommas(assetsData[0].maxSupply) }}
          </div>
        </div>
        <div class="cal-item">
          <div class="text-purple cal-title">
            Market Cap
          </div>
          <div class="text-white ">
            &#8364;{{ numberWithCommas(assetsData[0].marketCap) }}
          </div>
        </div>
        <div class="cal-item-t">
          <div class="text-purple cal-title">
            All-Time High • May 12 2021
          </div>
          <div class="text-white ">
            &#8364;{{ numberWithCommas(assetsData[0].allTimeHigh) }}
          </div>
        </div>
      </div>
    </div>
    <div class="part-panel">
      <div class="text-purple item-title">
        About
      </div>
      <div class="back-purple border-style text-white">
        {{ assetsData[0].description }}
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from '../components/LineChart.vue'
export default {
  components: {
    LineChart
  },
  async asyncData ({ $http }) {
    const assets = await $http.$get('/api/assets')
    return {
      assetsData: assets
    }
  },
  data () {
    return {
      periodValue: {
        period: '1day',
        amount: '1905',
        percents: '5.4',
        isUptrend: true
      },
      picked: [
        { name: '1D', state: true },
        { name: '7D', state: false },
        { name: '1M', state: false },
        { name: '3M', state: false },
        { name: 'YTD', state: false },
        { name: 'All', state: false }
      ]
    }
  },
  computed: {
    chart () {
      return this.$store.state.chartData
    }
  },
  mounted () {
    this.$store.commit('graph', this.assetsData[0].priceHistory.day.priceData)
  },
  methods: {
    getImgUrl (img) {
      return require('../assets/icons/' + img + '.png')
    },
    numberWithCommas (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    selectDay (day) {
      switch (day) {
        case 0:
          // eslint-disable-next-line array-callback-return
          this.$store.commit('graph', this.assetsData[0].priceHistory.day.priceData)
          this.periodValue = {
            period: '1day',
            ...this.assetsData[0].priceHistory.day.change
          }
          // eslint-disable-next-line array-callback-return
          this.picked.map((pick, i) => {
            if (i === 0) {
              this.picked[i].state = !this.picked[i].state
            } else {
              this.picked[i].state = false
            }
          })
          break
        case 1:
          this.$store.commit('graph', this.assetsData[0].priceHistory.week.priceData)
          this.periodValue = {
            period: '7days',
            ...this.assetsData[0].priceHistory.week.change
          }
          // eslint-disable-next-line array-callback-return
          this.picked.map((pick, i) => {
            if (i === 1) {
              this.picked[i].state = !this.picked[i].state
            } else {
              this.picked[i].state = false
            }
          })
          break
        case 2:
          this.$store.commit('graph', this.assetsData[0].priceHistory.month.priceData)
          this.periodValue = {
            period: '1month',
            ...this.assetsData[0].priceHistory.month.change
          }
          // eslint-disable-next-line array-callback-return
          this.picked.map((pick, i) => {
            if (i === 2) {
              this.picked[i].state = !this.picked[i].state
            } else {
              this.picked[i].state = false
            }
          })
          break
        case 3:
          this.$store.commit('graph', this.assetsData[0].priceHistory.quarter.priceData)
          this.periodValue = {
            period: '3months',
            ...this.assetsData[0].priceHistory.quarter.change
          }
          // eslint-disable-next-line array-callback-return
          this.picked.map((pick, i) => {
            if (i === 3) {
              this.picked[i].state = !this.picked[i].state
            } else {
              this.picked[i].state = false
            }
          })
          break
        case 4:
          this.$store.commit('graph', this.assetsData[0].priceHistory.ytd.priceData)
          this.periodValue = {
            period: 'YTD',
            ...this.assetsData[0].priceHistory.ytd.change
          }
          // eslint-disable-next-line array-callback-return
          this.picked.map((pick, i) => {
            if (i === 4) {
              this.picked[i].state = !this.picked[i].state
            } else {
              this.picked[i].state = false
            }
          })
          break
        case 5:
          this.$store.commit('graph', this.assetsData[0].priceHistory.all.priceData)
          this.periodValue = {
            period: 'ALL',
            ...this.assetsData[0].priceHistory.all.change
          }
          // eslint-disable-next-line array-callback-return
          this.picked.map((pick, i) => {
            if (i === 5) {
              this.picked[i].state = !this.picked[i].state
            } else {
              this.picked[i].state = false
            }
          })
          break
      }
    }
  }
}
</script>
<style scoped>
.portfolio {
  padding: 10px;
}
.text-white {
  color: #E8EAF4;
}
.text-purple {
  color: #7E83A6;
}
.back-purple {
  background-color: #20242D;
}
.border-style {
  border-radius: 10px;
  padding: 10px;
}
.trash {
  position: relative;
  display: flex;
  align-items: center;
}
.eth-icon {
  width: 40px;
  height: 40px;
}
.coin-trend {
  color: #30D158;
}
.trash-icon {
  position: absolute;
  left: 27px;
  top: 25px;
}
.alerts-panel {
  display: flex;
  justify-content: space-between;
}
.eth-price {
  display: flex;
  align-items: center;
}
.eth-text {
  margin-left: 10px;
}
.select-btn {
  border-radius: 5px;
  padding: 10px 15px;
  outline: none;
  border: none;
  cursor: pointer;
}
.select-active {
  background-color:#0A84FF;
}
.select-inactive {
background-color: #20242D;
}
.btn-panel {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.trend-display {
  display: flex;
  justify-content: space-between;
}
.part-panel {
  padding: 10px 0
}
.item-title {
  padding-bottom: 20px;
  font-size: 20px;
}
.cal-item {
  padding: 10px 0;
}
.cal-item-b{
  padding-bottom: 10px;
}
.cal-item-t {
  padding-top: 10px;
}
.cal-title {
  font-size: 14px;
}
.nav-title {
 font-size: 24px;
 display: flex;
 align-items: center;
}
.union-icon {
  width: 15px;
  height: 14px;
  margin-right: 10px;
}
.alert-price {
  font-size: 24px;
}
sup {
  font-size: 16px;
  font-weight: 400;
}
.trend-price {
  font-size: 30px;
  font-weight: bold;
}
</style>
