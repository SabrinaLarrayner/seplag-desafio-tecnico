import axios from 'axios'

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: 'https://abitus-api.geia.vip'
  })

  return {
    provide: {
      api
    }
  }
})
