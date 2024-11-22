import axios from 'axios'
import { store } from 'store'

store.subscribe(listener)


function listener() {
    let { token } = select(store.getState())

    Api.defaults.headers.common['Authorization'] = `Bearer ${token?.token}`

}

function select(state: any) {

    return {
        token: state.user,
    }
}

// Create axios client, pre-configured with baseURL
const Api = axios.create({
    baseURL: 'https://iq.allenhark.com/v1/',
    timeout: 10000,
})

export default Api
