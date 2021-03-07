import produce from "immer"

const initialState = {
    me:null,

    logInLoading:false,
    logInDone:false,
    logInError:null,

    logOutLoading:false,
    logOutDone:false,
    logOutError:null,

    signUpLoading:false,
    signUpDone:false,
    signUpError:null,

    loadMyInfoLoading:false,
    loadMyInfoDone:false,
    loadMyInfoError:null,
    
}

export const LOG_IN_REQUEST = "userReducer/LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "userReducer/LOG_IN_SUCCESS";
export const LOG_IN_ERROR = "userReducer/LOG_IN_ERROR";

export const LOG_OUT_REQUEST = "userReducer/LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "userReducer/LOG_OUT_SUCCESS";
export const LOG_OUT_ERROR = "userReducer/LOG_OUT_ERROR";

export const SIGN_UP_REQUEST = "userReducer/SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "userReducer/SIGN_UP_SUCCESS";
export const SIGN_UP_ERROR = "userReducer/SIGN_UP_ERROR";

export const ADD_POST_TO_ME = "userReducer/ADD_POST_TO_ME";
export const REMOVE_POST_TO_ME = "userReducer/REMOVE_POST_TO_ME";


export const LOAD_MY_INFO_REQUEST = "userReducer/LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "userReducer/LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_ERROR = "userReducer/LOAD_MY_INFO_ERROR";


function userReducer(state=initialState,action){
    return produce(state,(draft)=>{
        switch(action.type){
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInDone = false;
                draft.logInError = null;
                break;
            case LOG_IN_SUCCESS: // {data:logInApi().data}
                draft.logInLoading = false;
                draft.logInDone = true;
                draft.me = action.data;
                break;
            case LOG_IN_ERROR:
                draft.logInLoading = false;
                draft.logInError = action.data;
                break;

            case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                draft.logOutDone = false;
                draft.logOutError = null;
                break;
            case LOG_OUT_SUCCESS: // 
                draft.logOutLoading = false;
                draft.logOutDone = true;
                draft.me = null;
                break;
            case LOG_OUT_ERROR:
                draft.logOutLoading = false;
                draft.logOutError = action.data;
                break;

            case SIGN_UP_REQUEST:
                draft.signUpLoading = true;
                draft.signUpDone = false;
                draft.signUpError = null;
                break;
            case SIGN_UP_SUCCESS: // {data:signUpApi().data}
                draft.signUpLoading = false;
                draft.signUpDone = true;
                break;
            case SIGN_UP_ERROR:
                draft.signUpLoading = false;
                draft.signUpError = action.data;
                break;

            case ADD_POST_TO_ME: // {data:{id}}
                draft.me.Posts.push(action.data);
                break;
            
            case REMOVE_POST_TO_ME: // {data:{id}}
                draft.me.Posts = draft.me.Posts.filter(post=>post.id !== action.data);
                break;

            case LOAD_MY_INFO_REQUEST:
                draft.loadMyInfoLoading = true;
                draft.loadMyInfoDone = false;
                draft.loadMyInfoError = null;
                break;  
            case LOAD_MY_INFO_SUCCESS:{ // {data:loadMyInfoApi().data}
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoDone = true;
                draft.me = action.data;
                break;}
            case LOAD_MY_INFO_ERROR:
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoError = action.data;
                break;

            default :
                break;
        }
    })
}

export default userReducer;