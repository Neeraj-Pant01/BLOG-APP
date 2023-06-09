export const LoginStart = (userCredentials)=>({
    type:"LOGIN_START"
})

export const LoginSucess = (user) =>({
    type:"LOGIN_SUCCESS",
    payload: user,
})

export const LoginFailure = () =>({
    type:"LOGIN_FAILURE"
})

export const LogOut = () =>({
    type:"LOGOUT"
})

export const updateStart = (userCredentials)=>({
    type:"UPDATE_START"
})

export const updateSucess = (user) =>({
    type:"UPDATE_SUCCESS",
    payload: user,
})

export const updateFailure = () =>({
    type:"UPDATE_FAILURE"
})