import Axios from 'axios';
import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
};

export const logOut = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
};

export const authStatusShow = () => {
    return {
        type: actionTypes.CHECK_LOGGED_IN,
    }
};



export const authTomeoutCheck = (expireTime) => {
    // console.log(expireTime);
    return dispatch => {
       setTimeout(() => {
           dispatch(logOut());
       }, expireTime * 1000);
    }
};


export const auth = (email, password, method) => {
    
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        // const config = {
        //     headers: {
        //       "Content-Type" : "application/json",
        //       "Access-Control-Allow-Origin" : "localhost"
        //     },
        // };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDMQ7SdNGTUVRNeTu-hWi_jh1XnFMYd3uo';
        if(!method){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMQ7SdNGTUVRNeTu-hWi_jh1XnFMYd3uo'
        }
        Axios.post(url, authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                dispatch(authTomeoutCheck(res.data.expiresIn))
                dispatch(authStatusShow())
            })
            .catch(error => {
                // console.log(error);
                
                dispatch(authFailed(error.response.data.error));
            })

    }
}
