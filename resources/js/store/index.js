import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {}
    },
    actions: { 
        getUser( {commit} ) {
            axios.get('/api/v1/user/current')
            .then(response => {
                commit('setUser', response.data)
            })
        },
        loginUser( {}, user ){
            axios.post('/api/v1/user/login', {
                email: user.email,
                password: user.password
            })
            .then( response => {
                if( response.data.access_token ){
                    //save token
                    localStorage.setItem('user_token', response.data.access_token)
                    window.location.replace('/home')
                }
            })
        },
        logoutUser() {
            //remove token
            localStorage.removeItem("user_token")
            window.location.replace('/login')
        }
    },
    mutations: {
        setUser( state, data) {
            state.user = data
        }
    }
})

export default store