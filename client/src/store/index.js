import { createStore } from 'vuex'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL  || 'http://localhost:3000'
import { getRoadLength,filterRoads } from '../helpers/roads'
import { calculatePayment } from '../helpers/payments'

export default createStore({
  state: {
    // bu state admin panel və email bildirisleri ucundu
    Route: '',
    Origin: '',
    Destination: '',
    // bu state ride dan geden melumati mapda render elemek ucundu
    OriginAndDestinationPlace: '',
    propasalpayment: false, //müştərinin təklif etdiyi qiymət
    payments: {},
    // aşağıdakılar müştəri tərəfdən rəy və yükün ağırlığnı bildirir
    weight: '',
    feedback: '',
    // bu state masinin tipini secir misal tentli soyuduculu
    trucktype: 'standart'
  },
  getters: {
  },
  mutations: {
    setRoute(state, data) {
      state.Route = data
    },
    setOrigin(state, data) {
      state.Origin = data
    },
    setDestination(state, data) {
      state.Destination = data
    },
    setOriginAndDestinationPlace(state, data) {
      state.OriginAndDestinationPlace = data
    },
    setPayments(state, payments) {
      state.payments = payments
    },
    setPropasalPayment(state, payment){
      state.propasalpayment = payment
    },
    setWeight(state, weight) {
      state.weight = weight
    },
    setFeedback(state, feedback) {
      state.feedback = feedback
    },
    setTrucktype(state, type) {
      state.trucktype = type
    }

  },
  actions: {

    async confirmOrder(context, value){
      const date = Date()
      const data = {
        number:value.PhoneNumber,
        payment: this.state.payments.standart,
        created_at: date.toString(),
        minpayment: this.state.payments.minimum,
        maxpayment: this.state.payments.maximum,
        trucktype: this.state.trucktype,
        propasalpayment: this.state.propasalpayment,
        route: this.state.Route,
        weight: this.state.weight,
        feedback: this.state.feedback,
        status: 'Sifariş verilib',
        origin: this.state.Origin,
        status: value.status,
        destination: this.state.Destination
      }
      axios.post(`/app/confirmorder`, data)
    },

    async getOrderPrice(context, value) {
      const roads = await axios.get(`/app/getroads`)
      const price = await axios.get(`/pricing/first`)
      const obj = {
        steps: value.Steps,
        roads: roads.data
      }
      console.log(roads.data)
      const data = {
        distance: getRoadLength(value.Distance),
        extraRoads: filterRoads(obj),
        price: price.data[0]
      }
      const payments = calculatePayment(data)
      context.commit('setPayments', payments)
 },
    async getStatusbyName (context,value){
      const status = await axios.get(`/statuses/name=${value}`)
      return status
    },
  },
  modules: {
  }
})
