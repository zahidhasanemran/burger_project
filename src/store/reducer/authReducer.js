import * as actionType from '../actions/actionTypes';


const initialStore = {
    token: null,
    userId: null,
    loading: false,
    error: null
}

const authReducer = (state = initialStore, action) => {
    switch (action.type) {
        case actionType.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
            
        case actionType.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.idToken,
                userId: action.userId,
                error: null
            }
            
        case actionType.AUTH_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            }

        case actionType.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
            
        case actionType.CHECK_LOGGED_IN:
            return {
                ...state,
                loggedIn: true
            }
            
    
        default:
            return state
    }
}

export default authReducer;