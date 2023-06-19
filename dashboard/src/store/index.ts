import { createStore } from 'vuex'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL  || 'http://localhost:3000'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async getOrders (){
      const orders = await axios.get(`/orders`)
      return orders
    },
    async updateOrder (context,data){
        const { id ,status } = data
        try {
          const order = await axios.put(`/orders/${id}`,status)
          return order.data
        }
        catch(err){
          return false
          // console.log(err)
        }

    },
    async deleteOrder (context,id){
      const orders = await axios.delete(`/orders/${id}`)
      return orders
    },
    async getStatus (){
      const status = await axios.get(`/statuses`)
      return status.data
    },
    async getStatusbyName (context,value){
      const status = await axios.get(`/statuses/name=${value}`)
      return status.data
    },
  },
  modules: {
  }
})