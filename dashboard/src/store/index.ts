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
      const response = await axios.delete(`/orders/${id}`)
      return response
    },
    async getStatus (){
      const status = await axios.get(`/statuses`)
      return status.data
    },
 
    async getRoads (){
      const response = await axios.get(`/roads`)
      return response.data
    },
    async deleteRoad (context,id){
      const response = await axios.delete(`/roads/${id}`)
      return response.data
    },
    async addRoad (context, data){
      try {
        await axios.post('/roads/', data)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
      }
      catch (err) {
        console.log(err)
      }
    },
    async getStatusbyName (context,value){
      const status = await axios.get(`/statuses/name=${value}`)
      return status.data
    },
  },
  modules: {
  }
})