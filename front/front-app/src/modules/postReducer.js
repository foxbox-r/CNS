import produce from "immer";
import {PostLimit} from "../backAddress"
const initialState = {
    posts:[],

    imagePath:[],

    zoomImg:[],
    zoomStatus:"none",

    addPostLoading:false,
    addPostDone:false,
    addPostError:null,

    addCommentLoading:false,
    addCommentDone:false,
    addCommentError:null,

    uploadImageLoading:false,
    uploadImageDone:false,
    uploadImageError:null,

    removeImageLoading:false,
    removeImageDone:false,

    removeAllImageLoading:false,
    removeAllImageDone:false,

    loadPostsLoading:false,
    loadPostsDone:false,
    loadPostsError:null,

    canLoadPosts:true,

    
    likePostLoading:false,
    likePostDone:false,
    likePostError:null,

    unlikePostLoading:false,
    unlikePostDone:false,
    unlikePostError:null,

    editPostLoading:false,
    editPostDone:false,
    editPostError:null,

    removePostLoading:false,
    removePostDone:false,
    removePostError:null,

    prevLoadMode:null,

}

export const ADD_POST_REQUEST = "postReducer/ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "postReducer/ADD_POST_SUCCESS";
export const ADD_POST_ERROR = "postReducer/ADD_POST_ERROR";

export const ADD_COMMENT_REQUEST = "postReducer/ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "postReducer/ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_ERROR = "postReducer/ADD_COMMENT_ERROR";

export const UPLOAD_IMAGE_REQUEST = "postReducer/UPLOAD_IMAGE_REQUEST";
export const UPLOAD_IMAGE_SUCCESS = "postReducer/UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_ERROR = "postReducer/UPLOAD_IMAGE_ERROR";

export const REMOVE_IMAGE_REQUEST = "postReducer/REMOVE_IMAGE_REQUEST";
export const REMOVE_IMAGE_SUCCESS = "postReducer/REMOVE_IMAGE_SUCCESS";

export const REMOVE_ALL_IMAGE_REQUEST = "postReducer/REMOVE_ALL_IMAGE_REQUEST";
export const REMOVE_ALL_IMAGE_SUCCESS = "postReducer/REMOVE_ALL_IMAGE_SUCCESS";

export const LOAD_POSTS_REQUEST = "postReducer/LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "postReducer/LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_ERROR = "postReducer/LOAD_POSTS_ERROR";

export const ZOOM_IMAGE_REQUEST = "postReducer/ZOOM_IMAGE_REQUEST";
export const ZOOM_IMAGE_SUCCESS = "postReducer/ZOOM_IMAGE_SUCCESS";
export const ZOOM_IMAGE_OUT_REQUEST = "postReducer/ZOOM_IMAGE_OUT_REQUEST";
export const ZOOM_IMAGE_OUT_SUCCESS = "postReducer/ZOOM_IMAGE_OUT_SUCCESS";

export const LIKE_POST_REQUEST = "postReducer/LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "postReducer/LIKE_POST_SUCCESS";
export const LIKE_POST_ERROR = "postReducer/LIKE_POST_ERROR";

export const UNLIKE_POST_REQUEST = "postReducer/UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "postReducer/UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_ERROR = "postReducer/UNLIKE_POST_ERROR";

export const EDIT_POST_REQUEST = "postReducer/EDIT_POST_REQUEST";
export const EDIT_POST_SUCCESS = "postReducer/EDIT_POST_SUCCESS";
export const EDIT_POST_ERROR = "postReducer/EDIT_POST_ERROR";

export const REMOVE_POST_REQUEST = "postReducer/REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "postReducer/REMOVE_POST_SUCCESS";
export const REMOVE_POST_ERROR = "postReducer/REMOVE_POST_ERROR";

export const LOAD_MY_POSTS_REQUEST = "postReducer/LOAD_MY_POSTS_REQUEST";
export const LOAD_MY_POSTS_SUCCESS = "postReducer/LOAD_MY_POSTS_SUCCESS";
export const LOAD_MY_POSTS_ERROR = "postReducer/LOAD_MY_POSTS_ERROR";

export const LOAD_HASHTAG_POSTS_REQUEST = "postReducer/LOAD_HASHTAG_POSTS_REQUEST";
export const LOAD_HASHTAG_POSTS_SUCCESS = "postReducer/LOAD_HASHTAG_POSTS_SUCCESS";
export const LOAD_HASHTAG_POSTS_ERROR = "postReducer/LOAD_HASHTAG_POSTS_ERROR";

function postReducer(state=initialState,action){
    return produce(state,(draft)=>{
        switch(action.type){
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS: // {data:addPostApi().data}
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.posts.unshift(action.data);
                break;
            case ADD_POST_ERROR:
                draft.addPostLoading = false;
                draft.addPostError = action.data;
                break;
        
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:{ // {data:addCommentApi().data}
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                var post = draft.posts.find(post=>post.id === action.data.PostId);
                post.Comments.unshift(action.data);
                break;
            }
            case ADD_COMMENT_ERROR:
                draft.addCommentLoading = false;
                draft.addCommentError = action.data;
                break;  

            case UPLOAD_IMAGE_REQUEST:
                draft.uploadImageLoading = true;
                draft.uploadImageDone = false;
                draft.uploadImageError = null;
                break;
            case UPLOAD_IMAGE_SUCCESS:{ // {data:uploadImageApi().data}
                draft.uploadImageLoading = false;
                draft.uploadImageDone = true;
                draft.imagePath = draft.imagePath.concat(action.data);
                break;
            }
            case UPLOAD_IMAGE_ERROR:
                draft.uploadImageLoading = false;
                draft.uploadImageError = action.data;
                break;  

            case REMOVE_IMAGE_REQUEST:
                draft.removeImageLoading = true;
                draft.removeImageDone = false;
                draft.removeImageError = null;
                break;
            case REMOVE_IMAGE_SUCCESS:{ // {data:nowIndex}
                draft.removeImageLoading = false;
                draft.removeImageDone = true;
                draft.imagePath = draft.imagePath.filter((v,i)=> i !== action.data);
                break;
            }

            case REMOVE_ALL_IMAGE_REQUEST:
                draft.removeImageLoading = true;
                draft.removeImageDone = false;
                break;
            case REMOVE_ALL_IMAGE_SUCCESS:{ // 
                draft.removeImageLoading = false;
                draft.removeImageDone = true;
                draft.imagePath = [];
                break;
            }

            case LOAD_POSTS_REQUEST:
            case LOAD_MY_POSTS_REQUEST:
            case LOAD_HASHTAG_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS:
            case LOAD_MY_POSTS_SUCCESS:
            case LOAD_HASHTAG_POSTS_SUCCESS:{ // {data:loadPostsApi().data}
                draft.loadPostsLoading = false;
                draft.loadPostsDone = true;
                
                    
                
                if(draft.prevLoadMode !== action.type ){
                    draft.posts = action.data;
                    draft.prevLoadMode = action.type;
                } else {
                    if(action.type === LOAD_POSTS_SUCCESS)
                        draft.posts = draft.posts.concat(action.data);
                    else
                        draft.posts = action.data;
                }

                if(action.type === LOAD_POSTS_SUCCESS && action.data.length - PostLimit < 0){
                    draft.canLoadPosts = false;
                }


                break;
            }
            case LOAD_POSTS_ERROR:
            case LOAD_MY_POSTS_ERROR:
            case LOAD_HASHTAG_POSTS_ERROR:
                draft.loadPostsLoading = false;
                draft.loadPostsError = action.data;
                break; 
     
            case ZOOM_IMAGE_SUCCESS:{ // {data:[img...]}
                draft.zoomImg = action.data;
                draft.zoomStatus = "flex";
                break;
            }
            case ZOOM_IMAGE_OUT_SUCCESS:
                draft.zoomImg = [];
                draft.zoomStatus = "none";
                break; 
                    
            case LIKE_POST_REQUEST:
                draft.likePostLoading = true;
                draft.likePostDone = false;
                draft.likePostError = null;
                break;
            case LIKE_POST_SUCCESS:{ // {data:{UserId,PostId}}
                draft.likePostLoading = false;
                draft.likePostDone = true;
                var post = draft.posts.find(post=>post.id === action.data.PostId);
                post.Likers.push({id:action.data.UserId});
                break;}
            case LIKE_POST_ERROR:
                draft.likePostLoading = false;
                draft.likePostError = action.data;
                break;

            case UNLIKE_POST_REQUEST:
                draft.unlikePostLoading = true;
                draft.unlikePostDone = false;
                draft.unlikePostError = null;
                break;  
            case UNLIKE_POST_SUCCESS:{ // {data:{UserId,PostId}}
                draft.unlikePostLoading = false;
                draft.unlikePostDone = true;
                var post = draft.posts.find(post=>post.id === action.data.PostId);
                post.Likers = post.Likers.filter(user=>user.id !== action.data.UserId);
                break;}
            case UNLIKE_POST_ERROR:
                draft.unlikePostLoading = false;
                draft.unlikePostError = action.data;
                break;

            case EDIT_POST_REQUEST:
                draft.editPostLoading = true;
                draft.editPostDone = false;
                draft.editPostError = null;
                break;  
            case EDIT_POST_SUCCESS:{ // {data:{PostId,title,description}}
                draft.editPostLoading = false;
                draft.editPostDone = true;
                var post = draft.posts.find(post=>post.id === action.data.PostId);
                post.title = action.data.title;
                post.description = action.data.description;
                break;}
            case EDIT_POST_ERROR:
                draft.editPostLoading = false;
                draft.editPostError = action.data;
                break;

            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;  
            case REMOVE_POST_SUCCESS:{ // {data:{PostId}}
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.posts = draft.posts.filter(post=>post.id !== action.data.PostId);
                break;}
            case REMOVE_POST_ERROR:
                draft.removePostLoading = false;
                draft.removePostError = action.data;
                break;


            default:
                break;
        }
    });
}

export default postReducer;