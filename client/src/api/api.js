import axios from "axios"
import { authToken } from "../common/helpers/token.helper";


const instance = axios.create({
    baseURL: "http://localhost:5000/",
})

export const authAPI = {

    async getUserData() {

        try{
            const resp = await instance.get(`api/auth/me`,{
                headers: {
                'auth-token': authToken.getToken(),
                }
            });
            return resp.data;
        }catch(err){
            const data = err?.response?.data
            return data
        }
            
    },

    async register({name,surname, email, password,...other} ) {
            const resp = await instance.post(`api/auth/register`,
            {
                name,
                surname,
                email,
                password
            });
            return resp.data
    },
    async login({email, password}) {
            const resp = await instance.post(`api/auth/login`,
            {
                email,
                password
            });
            debugger
            return resp.data
    },
    async logingoogle(token) {
        try{
            const resp = await instance.post(`api/auth/googlelogin`,
            {
                token
            });
            return resp.data
        }catch(err){
            return err?.response?.data
        }
    },
    async loginfacebook(accessToken,userID) {
        try{
            const resp = await instance.post(`api/auth/facebooklogin`,
            {
                userID,
                accessToken,
            });
            return resp.data
        }catch(err){
            return err?.response?.data
        }
    },

    async forgotPassword(email) {
            const resp = await instance.post(`api/auth/forgotpassword`,
            {
                email,
            });
            return resp.data
    },
    async resetPassword(password,resetToken) {
            const resp = await instance.post(`api/auth/resetpassword/${resetToken}`,
            {
                password,
            });
            return resp.data
    },
    async confirmRegistration(confirmRegisterToken) {
            const resp = await instance.post(`api/auth/confirmRegister/${confirmRegisterToken}`,
            {
            });
            return resp.data
        
    },
}

export const companyAPI = {
    
    async addCompany({imageURL, name, description}) {
        try{
            const resp = await instance.post(`api/companies/add`,
            {
                name,
                imageURL,
                description,
            },
            {
                headers: {
                    'auth-token': authToken.getToken(),
                }
            });
            return resp.data
        }catch(err){
            return err?.response?.data
        }
    },
    async editCompany({imageURL, name, description},companyID) {
        try{
            const resp = await instance.post(`api/companies/edit/${companyID}`,
            {
                name,
                imageURL,
                description,
            },
            {
                headers: {
                'auth-token': authToken.getToken(),
                }
            });
            return resp.data
        }catch(err){
            return err?.response?.data
        }
    },
    async addService({services,companyID, ...props}) {
        try{
            const resp = await instance.post(`api/companies/addService/${companyID}`,
            {
                services: services,
            },
            {
                headers: {
                    'auth-token': authToken.getToken(),
                }
            });
            return resp.data
        }catch(err){
            return err?.response?.data
        }
    },
    async editServices({services,companyID,servicesID, ...props}) {
        try{
            const resp = await instance.post(`api/companies/editServices/${companyID}`,
            {
                services: services,
                servicesID:servicesID,
            },
            {
                headers: {
                'auth-token': authToken.getToken(),
                }
            });
            return resp.data
        }catch(err){
            return err?.response?.data
        }
    },
    async getCompanies() {

        try{
            const resp = await instance.get(`api/companies`);
            return resp.data
        }catch(err){
            return err?.response?.data
        }
    },
    async deleteCompany(companyID) {
        
        try{
            const resp = await instance.delete(`api/companies/delete/${companyID}`,
            {
                headers: {
                'auth-token': authToken.getToken(),
            }
            });
            return resp.data
        }catch(err){
            return err?.response?.data
        }
    },
    async deleteService({serviceID,companyID}) {
        try{
            const resp = await instance.delete(`api/companies/deleteService/${companyID}/${serviceID}`,
            {
                headers: {
                    'auth-token': authToken.getToken(),
                }
            });
            return resp.data
        }catch(err){
            return err?.response?.data
        }
    }
}

    
export const guestAPI = {
    
        async makeReservation({companyID,serviceID,...userData}) {
            try{
                const resp = await instance.post(`api/companies/makeReservation/${companyID}/${serviceID}`,{
                  ...userData,
                });
                return resp.data;
            }catch(err){
                const data = err?.response?.data
                return data
            }
                
        },
    
    }