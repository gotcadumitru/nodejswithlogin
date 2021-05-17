import { combineReducers } from "redux";
import companyReducer from "../../../company/redux/company-reducer";
import guestReducer from "../../../guest/redux/guest-reducer";
import userReducer from "../../../user/redux/user-reducer";

const rootReducer = combineReducers({
    profileInfo: userReducer,
    companies: companyReducer, 
    guest: guestReducer,
});

export default rootReducer
