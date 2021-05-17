import { companyAPI } from "../../api/api";
import { getUserThunk } from "../../user/redux/user-thunk";
import { setActiveCompany, setCompaniesAC } from "./company-action-creator";

export const addCompanyThunk = (values,setErrors) => async (dispatch) => {

    const data = await companyAPI.addCompany(values);
    if (data) {
        if (data?.succes) {
            dispatch(setActiveCompany(data.data));
            getUserThunk()(dispatch);
            setCompaniesThunk()(dispatch)
        }else{
            setErrors({name: data.error})
        }
    }
}

export const editCompanyThunk = (values,companyID,setErrors) => async (dispatch) => {

    const data = await companyAPI.editCompany(values,companyID);
    if (data) {

        if (data.succes) {
            setErrors({description: "Company data was changed successful!",succes: true,})
            dispatch(setActiveCompany(data.data));
            getUserThunk()(dispatch);
            setCompaniesThunk()(dispatch)
        }else{
            setErrors({description: "Somthing was wrong!"})
            
        }
    }
}

export const addServiceThunk = (serviceData) => async (dispatch) => {

    const data = await companyAPI.addService(serviceData);
    if (data) {

        if (data.succes) {
            dispatch(setActiveCompany(data.data));
            getUserThunk()(dispatch);
            setCompaniesThunk()(dispatch)
        }
    }
}
export const editServicesThunk = (serviceData) => async (dispatch) => {

    const data = await companyAPI.editServices(serviceData);
    if (data) {

        if (data.succes) {
            dispatch(setActiveCompany(data.data));
            getUserThunk()(dispatch);
            setCompaniesThunk()(dispatch)
        }
    }
}

export const setCompaniesThunk = () => async (dispatch) => {

    const data = await companyAPI.getCompanies();
    if (data) {
        if (data.succes) {
           dispatch(setCompaniesAC(data.companies))
        }
    }
    else {
    }
}
export const deleteCompanyThunk = (companyID) => async (dispatch) => {

    const data = await companyAPI.deleteCompany(companyID);
    if (data) {
        if (data.succes) {
            setCompaniesThunk()(dispatch);
        }
    }
    else {
    }
}
export const deleteServiceThunk = (serviceData) => async (dispatch) => {

    const data = await companyAPI.deleteService(serviceData);
    if (data) {
        if (data.succes) {
            setCompaniesThunk()(dispatch);
        }
    }
    else {
    }
}