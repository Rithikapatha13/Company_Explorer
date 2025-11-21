import axios from "axios"

const BaseURl="http://localhost:3000/"


export const AxiosInstanc=axios.create({
baseURL:BaseURl
})