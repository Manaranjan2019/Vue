import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: false,
  state: {
    token: localStorage.getItem('token') || '',
    status: '',
    userid: localStorage.getItem('userid') || '',
    addUsers: '',
    users: []
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    token: state => state.token,
    userid: state => state.userid,
    users: state => state.users,
    addUsers: state => state.addUsers
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
      //asdhasdsaj dsajkhdsa dlkjh
    },
    auth_success (state, data) {
      state.status = 'success'
      state.token = data.token
      state.userid = data.userid
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    },
    addRequest (state, user) {
      state.status = 'loading'
    },
    addUsers (state, status) {
      state.addUsers = 'success'
    },
    fetchUsers (state, users) {
      state.users = users
    }
  },
  actions: {
    AUTH_REQUEST ({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
          url: 'http://10.195.37.114:8000/api/login',
          data: user,
          method: 'POST'
        })
          .then(resp => {
            const token = resp.data.token
            const userid = resp.data.userid
            const role = resp.data.role
            const err = ''
            if (role !== 'Admin') {
              reject(err)
            }
            localStorage.setItem('token', token)
            localStorage.setItem('userid', userid)
            commit('auth_success', { 'token': token, 'userid': userid })
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            localStorage.removeItem('userid')
            reject(err)
          })
      })
    },
    logout ({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('userid')
        resolve()
      })
    },
    fetchUsers ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        const token = this.getters.token
        axios({
          url: 'http://10.195.37.114:8000/api/users',
          params: {role: 'Student'},
          method: 'GET',
          headers: {
            Authorization: 'Token ' + token
          }
        })
          .then((response) => {
            commit('fetchUsers', response)
            resolve(response)
          })
          .catch(err => {
            commit('auth_error', err)
            reject(err)
          })
      })
    },
    addStudentStore ({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('addRequest', user)
        axios({url: 'http://10.195.37.114:8000/api/users',
          data: user,
          method: 'POST',
          headers: {
            Authorization: 'Token ' + user.token
          }
        })
          .then(resp => {
            const status = resp.status
            commit('addUsers', { 'status': status })
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            reject(err)
          })
      })
    }
  }
})
