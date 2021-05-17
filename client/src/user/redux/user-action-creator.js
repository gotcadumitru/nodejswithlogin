import { SET_USER } from "./user-reducer"

export const setUserAction = (user) => {
    return {
        type: SET_USER,
        user,
    }
}
