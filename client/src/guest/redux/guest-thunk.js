import { guestAPI } from "../../api/api";
import { setCompaniesThunk } from "../../company/redux/company-thunk";

export const makeReservationThunk = (values) => async (dispatch) => {

    const data = await guestAPI.makeReservation(values)
    
    setCompaniesThunk()(dispatch);
    return data;

}