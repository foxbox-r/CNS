import {takeLatest,fork,call,all, put, takeEvery} from "redux-saga/effects"
import {
    ADD_POST_REQUEST,ADD_POST_SUCCESS,ADD_POST_ERROR,
    ADD_COMMENT_REQUEST,ADD_COMMENT_SUCCESS,ADD_COMMENT_ERROR,
    UPLOAD_IMAGE_REQUEST,UPLOAD_IMAGE_SUCCESS,UPLOAD_IMAGE_ERROR,
    REMOVE_IMAGE_REQUEST,REMOVE_IMAGE_SUCCESS,
    REMOVE_ALL_IMAGE_REQUEST,REMOVE_ALL_IMAGE_SUCCESS,
    LOAD_POSTS_REQUEST,LOAD_POSTS_SUCCESS,LOAD_POSTS_ERROR,
    ZOOM_IMAGE_REQUEST,ZOOM_IMAGE_SUCCESS,ZOOM_IMAGE_OUT_REQUEST,ZOOM_IMAGE_OUT_SUCCESS,
    LIKE_POST_REQUEST,LIKE_POST_SUCCESS,LIKE_POST_ERROR,
    UNLIKE_POST_REQUEST,UNLIKE_POST_SUCCESS,UNLIKE_POST_ERROR,
    EDIT_POST_REQUEST,EDIT_POST_SUCCESS,EDIT_POST_ERROR,
    REMOVE_POST_REQUEST,REMOVE_POST_SUCCESS,REMOVE_POST_ERROR,
    LOAD_MY_POSTS_REQUEST,LOAD_MY_POSTS_SUCCESS,LOAD_MY_POSTS_ERROR,
    LOAD_HASHTAG_POSTS_REQUEST,LOAD_HASHTAG_POSTS_SUCCESS,LOAD_HASHTAG_POSTS_ERROR,
} from "../modules/postReducer"

import {
    ADD_POST_TO_ME,REMOVE_POST_TO_ME,
} from "../modules/userReducer"

import axios from "axios"

import {PostLimit} from "../backAddress"

function addPostApi(data){
    return axios.post("/post",data);
}

function* addPost(action){//{data:{title,description,images}}
    try{
        const result = yield call(addPostApi,action.data);
        yield put({
            type:ADD_POST_SUCCESS,
            data:result.data,
        });
        yield put({
            type:ADD_POST_TO_ME,
            data:{id:result.data.id},
        })
    } catch(error){
        console.error(error);
        yield put({
            type:ADD_POST_ERROR,
            data:error.response.data,
        });
    }
}

function addCommentApi(data){
    return axios.post(`/post/${data.PostId}/comment`,{description:data.comment});
}

function* addComment(action){//{data:{PostId,comment}}
    try{
        const result = yield call(addCommentApi,action.data);
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data:result.data,
        });
    } catch(error){
        console.error(error);
        yield put({
            type:ADD_COMMENT_ERROR,
            data:error.response.data,
        });
    }
}

function uploadImageApi(data){
    return axios.post(`/post/images`,data);
}

function* uploadImage(action){//{data:new FormData()}
    try{
        const result = yield call(uploadImageApi,action.data);
        yield put({
            type:UPLOAD_IMAGE_SUCCESS,
            data:result.data,
        });
    } catch(error){
        console.error(error);
        yield put({
            type:UPLOAD_IMAGE_ERROR,
            data:error.response.data,
        });
    }
}

function loadPostsApi(data){
    return axios.get(`/posts?lastId=${data || 0}&limit=${PostLimit}`);
}

function* loadPosts(action){ // {data:undefined or number}
    try{
        const result = yield call(loadPostsApi,action.data);
        yield put({
            type:LOAD_POSTS_SUCCESS,
            data:result.data,
        });
    } catch(error){
        console.error(error);
        yield put({
            type:LOAD_POSTS_ERROR,
            data:error.response.data,
        });
    }
}

function* removeImage(action){//{data:nowIndex}
    yield put({
        type:REMOVE_IMAGE_SUCCESS,
        data:action.data,
    })
}

function* removeAllImage(action){//
    yield put({
        type:REMOVE_ALL_IMAGE_SUCCESS,
    })
}

function* zoomImg(action){//{data:[img..]}
    yield put({
        type:ZOOM_IMAGE_SUCCESS,
        data:action.data,
    })
}

function* zoomImgOut(action){//
    yield put({
        type:ZOOM_IMAGE_OUT_SUCCESS,
    })
}

function unlikePostApi(data){
    return axios.patch(`/post/${data}/unlike`);
}

function* unlikePost(action){ // {data:PostId}
    try{
        const result = yield call(unlikePostApi,action.data);
        yield put({
            type:UNLIKE_POST_SUCCESS,
            data:result.data,
        });
    } catch(error){
        console.error(error);
        yield put({
            type:UNLIKE_POST_ERROR,
            data:error.response.data,
        });
    }
}

function likePostApi(data){
    return axios.patch(`/post/${data}/like`);
}

function* likePost(action){ // {data:PostId}
    try{
        const result = yield call(likePostApi,action.data);
        yield put({
            type:LIKE_POST_SUCCESS,
            data:result.data,
        });
    } catch(error){
        console.error(error);
        yield put({
            type:LIKE_POST_ERROR,
            data:error.response.data,
        });
    }
}

function editPostApi(data){
    const {title,description} = data;
    return axios.put(`/post/${data.PostId}/edit`,{title,description});
}

function* editPost(action){ // {data:{PostId,title,description}}
    try{
        const result = yield call(editPostApi,action.data);
        yield put({
            type:EDIT_POST_SUCCESS,
            data:result.data,
        });
    } catch(error){
        console.error(error);
        yield put({
            type:EDIT_POST_ERROR,
            data:error.response.data,
        });
    }
}

function removePostApi(data){
    return axios.delete(`/post/${data}/delete`);
}

function* removePost(action){ // {data:PostId}
    try{
        const result = yield call(removePostApi,action.data);
        yield put({
            type:REMOVE_POST_SUCCESS,
            data:result.data,
        });
        yield put({
            type:REMOVE_POST_TO_ME,
            data:action.data,
        })
    } catch(error){
        console.error(error);
        yield put({
            type:REMOVE_POST_ERROR,
            data:error.response.data,
        });
    }
}

function loadMyPostsApi(){
    return axios.get("/posts/myPosts");
}

function* loadMyPosts(action){//
    try{
        const result = yield call(loadMyPostsApi);
        yield put({
            type:LOAD_MY_POSTS_SUCCESS,
            data:result.data,
        })
    } catch(error){
        yield put({
            type:LOAD_MY_POSTS_ERROR,
            data:error.response.data,
        });
    }
}

function loadHashtagPostsApi(data){
    return axios.get(`/posts/hashtag/${data}`);
}

function* loadHashtagPosts(action){//{data:tag}
    try{
        const result = yield call(loadHashtagPostsApi,action.data);
        yield put({
            type:LOAD_HASHTAG_POSTS_SUCCESS,
            data:result.data,
        })
    } catch(error){
        yield put({
            type:LOAD_HASHTAG_POSTS_ERROR,
            data:error.response.data,
        });
    }
}

function* addPostWatch(){
    yield takeLatest(ADD_POST_REQUEST,addPost);
}

function* addCommentWatch(){
    yield takeLatest(ADD_COMMENT_REQUEST,addComment);
}

function* uploadImageWatch(){
    yield takeLatest(UPLOAD_IMAGE_REQUEST,uploadImage);
}

function* removeImageWatch(){
    yield takeLatest(REMOVE_IMAGE_REQUEST,removeImage);
}

function* removeAllImageWatch(){
    yield takeLatest(REMOVE_ALL_IMAGE_REQUEST,removeAllImage);
}

function* loadPostsWatch(){
    yield takeEvery(LOAD_POSTS_REQUEST,loadPosts);
}

function* zoomImgWatch(){
    yield takeEvery(ZOOM_IMAGE_REQUEST,zoomImg);
}

function* zoomImgOutWatch(){
    yield takeEvery(ZOOM_IMAGE_OUT_REQUEST,zoomImgOut);
}

function* likePostWatch(){
    yield takeEvery(LIKE_POST_REQUEST,likePost);
}

function* unlikePostWatch(){
    yield takeEvery(UNLIKE_POST_REQUEST,unlikePost);
}

function* editPostWatch(){
    yield takeEvery(EDIT_POST_REQUEST,editPost);
}

function* removePostWatch(){
    yield takeEvery(REMOVE_POST_REQUEST,removePost);
}
function* loadMyPostsWatch(){
    yield takeLatest(LOAD_MY_POSTS_REQUEST,loadMyPosts);
}
function* loadHashtagPostsWatch(){
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST,loadHashtagPosts);
}
export default function* userSaga(){
    yield all([
        call(addPostWatch),
        call(addCommentWatch),
        call(uploadImageWatch),
        call(removeImageWatch),
        call(removeAllImageWatch),
        call(loadPostsWatch),
        call(zoomImgWatch),
        call(zoomImgOutWatch),
        call(likePostWatch),
        call(unlikePostWatch),
        call(editPostWatch),
        call(removePostWatch),
        
        call(loadMyPostsWatch),
        call(loadHashtagPostsWatch),
    ])
} 