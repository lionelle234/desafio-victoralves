import axios from 'axios'

export const api = axios.create({
    baseURL: "https://desafio-api-5z2e.onrender.com"
})