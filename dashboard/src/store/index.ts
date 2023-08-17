import { createStore } from 'vuex'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL  || 'http://localhost:3000'

export default createStore({
  state: {
    token : "",
    firebaseApiKey: "AIzaSyDrK7fGyYE9-Suspe8wC63Iy_BNjQF3_hE",
  },
  getters: {
    isAuthenticated (state){
      return state.token !== ""
    }
  },
  mutations: {
    setToken (state, token){
      state.token = token
    },
    clearToken (state){
      state.token = ""
    }
  },
  actions: {
    login ({ commit, dispatch, state }, authData){

     return axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrK7fGyYE9-Suspe8wC63Iy_BNjQF3_hE",
      { email : authData.email, password : authData.password, returnSecureToken: true }
      ).then(response => {
        commit("setToken", response.data.idToken)
      }).catch((err) => {
        console.log(err);
      });
    },
    logout ({ commit, dispatch, state }){

    },
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
    async getPrice (){
      const response = await axios.get(`/pricing/first`)
      return response.data
    },
    async updatePrice (context,obj){
      const { data, id } = obj
      await axios.put(`/pricing/${id}`, data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
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