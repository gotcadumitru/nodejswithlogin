export const SET_USER = 'SET_USER';
const initialState = {
    user: {},
    isAuth: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: { ...action.user },
                isAuth: action.user ? true : false,
            }
        default:
            return {
                ...state
            }
    }
}

export default userReducer;