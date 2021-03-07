import {all,fork} from "redux-saga/effects"
import axios from "axios";

import userSaga from "./userSaga";
import postSaga from "./postSaga"

axios.defaults.baseURL = "http://localhost:3060";
axios.defaults.withCredentials = true; 

export default function* rootSaga(){
    yield all([
        fork(userSaga),
        fork(postSaga),
    ])
}