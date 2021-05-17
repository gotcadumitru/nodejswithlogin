export const SET_COMPANIES = 'SET_COMPANIES';
export const SET_ACTIVE_COMPANY = 'SET_ACTIVE_COMPANY';
export const SET_SERVER_RESPONSE= 'SET_SERVER_RESPONSE';
const initialState = {
    companies: [],
    selectedCompany : {},
    serverResponse: '',
}

const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANIES:
            return {
                ...state,
                companies: [...action.companies]
            }
        case SET_ACTIVE_COMPANY:
            return {
                ...state,
                selectedCompany: action.company,
            }
        case SET_SERVER_RESPONSE:
            return {
                ...state,
                serverResponse: action.serverResponse,
            }
        default:
            return {
                ...state
            }
    }
}
export default companyReducer;