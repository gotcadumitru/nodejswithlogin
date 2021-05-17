export const authToken = {
    getToken: () =>{
        return localStorage.getItem("auth-token");
    },
    removeToken: () =>{
        localStorage.removeItem('auth-token');
    },
    setToken: (token) =>{
        localStorage.setItem("auth-token", token);
    }
}
