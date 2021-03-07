import {takeLatest,fork,call,all, put} from "redux-saga/effects"
import {
    LOG_IN_REQUEST,LOG_IN_SUCCESS,LOG_IN_ERROR,
    LOG_OUT_REQUEST,LOG_OUT_SUCCESS,LOG_OUT_ERROR,
    SIGN_UP_REQUEST,SIGN_UP_SUCCESS,SIGN_UP_ERROR,
    LOAD_MY_INFO_REQUEST,LOAD_MY_INFO_SUCCESS,LOAD_MY_INFO_ERROR,
} from "../modules/userReducer"
import axios from "axios"

function logInApi(data){
    console.log("api");
    return axios.post("/user/login",data);
}

function* logIn(action){//{data:{mail,password}}
    try{
        const result = yield call(logInApi,action.data);
        yield put({
            type:LOG_IN_SUCCESS,
            data:result.data,
        });
    } catch(error){
        console.error(error);
        yield put({
            type:LOG_IN_ERROR,
            data:error.response.data,
        });
    }
}

function logOutApi(data){
    return axios.post("/user/logout",data)
}

function* logOut(action){
    try{
        const result = yield call(logOutApi,action.data)
        yield put({
            type:LOG_OUT_SUCCESS,
        })
    } catch(error){
        yield put({
            type:LOG_OUT_ERROR,
            data:error.response.data,
        });
    }
}

function signUpApi(data){
    return axios.post("/user/signup",data);
}

function* signUp(action){//{data:{mail,password,name,color,backgroundColor}}
    try{
        const result = yield call(signUpApi,action.data);
        yield put({
            type:SIGN_UP_SUCCESS,
            data:result.data,
        })
    } catch(error){
        yield put({
            type:SIGN_UP_ERROR,
            data:error.response.data,
        });
    }
}

function loadMyInfoApi(){
    return axios.get("/user");
}

function* loadMyInfo(action){//
    try{
        const result = yield call(loadMyInfoApi);
        yield put({
            type:LOAD_MY_INFO_SUCCESS,
            data:result.data,
        })
    } catch(error){
        yield put({
            type:LOAD_MY_INFO_ERROR,
            data:error.response.data,
        });
    }
}


function* logInWatch(){
    yield takeLatest(LOG_IN_REQUEST,logIn);
}
function* logOutWatch(){
    yield takeLatest(LOG_OUT_REQUEST,logOut);
}
function* signUpWatch(){
    yield takeLatest(SIGN_UP_REQUEST,signUp);
}
function* loadMyInfoWatch(){
    yield takeLatest(LOAD_MY_INFO_REQUEST,loadMyInfo);
}

export default function* userSaga(){
    yield all([
        call(logInWatch),
        call(logOutWatch),
        call(signUpWatch),
        call(loadMyInfoWatch),
    ])
} 