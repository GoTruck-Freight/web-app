import { createStore } from 'vuex'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL  || 'http://localhost:3000'

export default createStore({
  state: {
    // bu state admin panel və email bildirisleri ucundu
    Route: '',
    Origin: '',
    Destination: '',
    // bu state ride dan geden melumati mapda render elemek ucundu
    OriginAndDestinationPlace: '',
    payment: false, //sistemin təklif etdiyi qiymət
    min_payment: 'hesablanır..',
    max_payment: 'hesablanır..',
    propasalpayment: false, //müştərinin təklif etdiyi qiymət
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
      console.log(state.Origin)
    },
    setDestination(state, data) {
      state.Destination = data
    },
    setOriginAndDestinationPlace(state, data) {
      state.OriginAndDestinationPlace = data
    },
    setPayment(state, payment) {
      state.payment = payment
    },
    setminPayment(state, min_payment) {
      state.min_payment = min_payment
    },
    setmaxPayment(state, max_payment) {
      state.max_payment = max_payment
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
        payment: this.state.payment,
        created_at: date.toString(),
        minpayment: this.state.min_payment,
        maxpayment: this.state.max_payment,
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
    async getOrder(context, value) {
      // buraya melumda ride.vue dan gelir  
      const roads = await axios.get(`/app/getroads`)
      const obj = {
        steps: value.Steps,
        roads: roads.data
      }
      const data = {
        Distance: value.Distance,
        extraRoads: await context.dispatch('filterRoads', obj)
      }
      await context.dispatch('CalculatePayment', data)
      // console.log(await context.dispatch('getRoadsLength', value.Distance))

      return roads.data
      // google maps api den yol uzunluğu text halında gəlir misal:120 km 180 m və s. burada split ilə parçalasaqda bəzən kilometr yerine metr də çıxa bilər belə olan halda ödənişdə səf olacaq.Bu funksiya ona görə yazılıb
    },
    async getStatusbyName (context,value){
      const obj = {
            name: value
      }
      const status = await axios.get(`/statuses/name=${value}`)
      return status
    },
    async getRoadsLength(context, value) {
      let length = value
      length = length.split(" ")
      if (length[1] == "m") {
        length = length[0] * 0.001
      }
      else {
        length = length[0]
      }
      length = parseInt(length)
      return length;
    },
    // bu funksiya əsasən dağ yollarında əlavə pulu hesablamaq üçün yazılmışdır funksiya gələn məlumatlardan yolları seçib bazadan seçilmiş qiymətə vurur və geriye pul dönderir
    async filterRoads(context, data) {
      // default yollar
      // const roads = [
      //   { number: 'M4', name: 'Bakı-Şamaxı-Yevlax', factor: 0.37 },
      //   { number: 'R22', name: 'Şəmkir-Gədəbəy', factor: 0.37 },
      //   { number: 'R-8', name: 'Muğanlı-İsmayıllı', factor: 0.37 },
      // ]
      const { roads, steps } = data
      let results = 0;
      steps.forEach(async item => {
        for (let index = 0; index < roads.length; index++) {
          if (item.instructions.search(roads[index].number) > -1 || item.instructions.search(roads[index].name) > -1) {
            let roadlength = item.distance.text.split(" ")
            roadlength = parseInt(roadlength[0])
            // ** context.dispatch('getRoadsLength')
            results += roadlength * roads[index].factor
          }
        }
      });
      return results;
    },
    async CalculatePayment (context, data) {
      // l deyişəni yolun uzuluğudur (km-lə)
      let l = await context.dispatch('getRoadsLength', data.Distance)
      // fix ən aşşağı halda gediş haqqıdır
      const arr = [
        {
          distance: 50,
          price: 1
        },
        {
          distance: 100,
          price: 1
        },
        {
          distance: 200,
          price: 0.9
        },
        {
          distance: 300,
          price: 0.8
        },
        {
          distance: 400,
          price: 0.7
        },
        {
          distance: 500,
          price: 0.7
        }
      ]
      const fix = 150
      let payment = 0
      for (let index = 0; index < arr.length; index++) {

        if (l < arr[0].distance){
          //əgər mesafə 50 km dən azdırsa l < 50
          payment += l * arr[0].price  
          break
        }
        else if (l > arr[index].distance) {
          if (index == arr.length - 1) {
            //əgər məsafə 500 km dan çoxdursa l > 500
            payment+= ( arr[index].distance - arr[index - 1].distance + l - arr[index].distance) * arr[index].price
            break
          }
          else if (index > 0) {
            // misal 453 bu kod bu kod 400 -ü hesablayır
            payment+= (arr[index].distance - arr[index - 1].distance) * arr[index].price
            if (l < arr[index + 1].distance) {
              // misal 453 bu kod 53 -ü hesablayır 
              payment += (l - arr[index].distance) * arr[index].price
              break
            }
          }
          else {
            payment+= arr[index].distance * arr[index].price
          } 
        }

      }
      payment += fix + data.extraRoads
      let min_payment = payment - (payment / 100) * 7
      let max_payment = payment + (payment / 100) * 7
      min_payment = Math.round(min_payment / 10) * 10
      max_payment = Math.round(max_payment / 10) * 10
      const payments = [min_payment,max_payment]
      // payment = Math.round(payment / 10) * 10
      context.commit('setPayment', payment)
      context.commit('setminPayment', min_payment)
      context.commit('setmaxPayment', max_payment)
      return payments

    },
  },
  modules: {
  }
})
