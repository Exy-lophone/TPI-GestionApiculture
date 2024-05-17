export const BASE_URL = "http://localhost:3000"
export const getToken = () => {
    const token = window.localStorage.getItem('token')
    if(!token) {
        throw new Error('[config] token is missing !')
    }
    return token
}