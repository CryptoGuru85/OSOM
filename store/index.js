import Vuex from 'vuex'

const createStore = () => {
  // eslint-disable-next-line import/no-named-as-default-member
  return new Vuex.Store({
    state: () => ({
      counter: 0,
      chartData: null
    }),
    mutations: {
      increment (state) {
        state.counter++
      },
      graph (state, payload) {
        const xValue = []
        const yValue = []
        // eslint-disable-next-line array-callback-return
        payload.map((data) => {
          xValue.push(data[0])
          yValue.push(data[1])
        })
        state.chartData = {
          labels: xValue,
          datasets: [
            {
              label: 'PriceHistory',
              data: yValue,
              backgroundColor: 'transparent',
              borderColor: 'rgba(1, 116, 188, 0.50)',
              pointBackgroundColor: 'rgba(171, 71, 188, 1)'
            }
          ]
        }
      }
    }
  })
}

export default createStore
