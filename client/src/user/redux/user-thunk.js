import { authAPI } from "../../api/api";
import { authToken } from "../../common/helpers/token.helper";
import { setUserAction } from "./user-action-creator";

export const SetUserThunk = () => (dispatch) => {
    const user = null
    dispatch(setUserAction(user));
}
export const getUserThunk = () => async (dispatch) => {
    const token = authToken.getToken()
    if(token){

        const data = await authAPI.getUserData();
        if (data?.succes) {
        dispatch(setUserAction(data.user));
        }
        
    }
    else{
        dispatch(setUserAction(null));
        authToken.removeToken()
    }
}
export const registerNewUserThunk = (value) => async (dispatch) => {

    return await authAPI.register(value);

}
export const loginThunk = (value) => async (dispatch) => {

    const response = await authAPI.login(value)
            
    authToken.setToken(response.token);
    getUserThunk()(dispatch); 

    return response
}

export const logingoogleThunk = (token) => async (dispatch) => {
    const response = await authAPI.logingoogle(token);
    if (!response.succes) {

    } else {

        authToken.setToken(response.token);
        getUserThunk()(dispatch);
    }
}
export const loginfacebookThunk = (accesToken,userID) => async (dispatch) => {

    const response = await authAPI.loginfacebook(accesToken,userID);

    if (response.succes) {
        authToken.setToken(response.token);
        getUserThunk()(dispatch);
    }

}
export const forgotPasswordThunk = (email) => async (dispatch) => {
    return await authAPI.forgotPassword(email);
    
}
export const resetPasswordThunk = (password, resetToken) => async (dispatch) => {

    return await authAPI.resetPassword(password, resetToken)

}
export const confirmRegistrationThunk = (confirmRegisterToken) => async (dispatch) => {

    const response = await authAPI.confirmRegistration(confirmRegisterToken)

    authToken.setToken(response.token);
    getUserThunk()(dispatch);

    return response;

}
export const logOutThunk = () => async (dispatch) => {
    authToken.removeToken()
    getUserThunk()(dispatch);

}