<template>
  <div class="home">
    <div class="search">
      <input v-model="searchTerm" type="text" name="search">
      <img src="~/assets/icons/Search.png" alt="Search" class="search-icon">
    </div>
    <div>
      <div v-for="(currency, index) in currencies" :key="index">
        <NuxtLink to="/Portfolio" class="crypto">
          <div class="cryptocurrency">
            <img :src="getImgUrl(currency.symbol)" :alt="currency.symbol" class="coin-icon">
            <div class="price">
              <div class="coin">
                {{ currency.name }}
              </div>
              <div class="coin-color coin-amount">
                {{ currency.amount }} BTC
              </div>
            </div>
          </div>
          <div class="eur-money">
            <div>{{ currency.amountEur }}<sup class="coin-color">EUR</sup></div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $http }) {
    const list = await $http.$get('/api/list')
    return {
      currencie: list
    }
  },
  data () {
    return {
      searchTerm: ''
    }
  },
  computed: {
    currencies () {
      return this.currencie.filter(this.searchResources)
    }
  },
  methods: {
    getImgUrl (img) {
      return require('../assets/icons/' + img + '.png')
    },
    searchResources (resource) {
      const lowerSearchTerm = this.searchTerm.toLowerCase()
      return (
        resource.name?.toLowerCase().includes(lowerSearchTerm)
      )
    }
  }
}
</script>

<style scoped>
.home {
  padding: 10px;
}
.search {
  position: relative;
  display: flex;
}
input {
  background-color: black;
  padding: 15px 10px 15px 40px;
  border-radius: 10px;
  border-color: #A09FC3;
  color: white;
  width: 100%;
}
.search-icon {
  position: absolute;
  left: 10px;
  top: 15px;
}
.crypto {
  display: flex;
  border-radius: 10px;
  background-color: #20242D;
  justify-content: space-between;
  padding: 20px;
  margin: 10px 0;
}
.cryptocurrency {
  display: flex;
  align-items: center;
}
.price {
 margin-left: 20px;
}
.coin {
  color: white;
  font-size: 20px;
}
.coin-icon {
  width: 32px;
  height: 32px;
}
.coin-color {
  color: #A09FC3;
}
.eur-money {
  display: flex;
  align-items: center;
  color: white;
}
.coin-amount {
  font-size: 14px;
}
</style>
