import { SET_ACTIVE_COMPANY, SET_COMPANIES } from "./company-reducer"

export const setCompaniesAC = (companies) => {
    return {
        type: SET_COMPANIES,
        companies,
    }
}
export const setActiveCompany = (company) => {
    return {
        type: SET_ACTIVE_COMPANY,
        company,
    }
}
export const setServerResponse = (serverResponse) => {
    return {
        type: SET_ACTIVE_COMPANY,
        serverResponse,
    }
}