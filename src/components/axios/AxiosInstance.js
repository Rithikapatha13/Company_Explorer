import axios from "axios"

const BaseURl="https://backend-uq4u.onrender.com/companies"


export const AxiosInstanc=axios.create({
baseURL:BaseURl
})