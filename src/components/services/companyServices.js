import { AxiosInstanc } from "../axios/AxiosInstance"

const companyServices={
    getAllCompanies:async()=>{
     let data=await AxiosInstanc.get("/companies")
     return data
    }
}


export default companyServices