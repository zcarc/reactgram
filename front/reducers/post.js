import produce from "immer";

const initialState = {
    isAddingPost: false,
    isPostAdded: false,
    addPostError: '',
    isAddingComment: false,
    isCommentAdded: false,
    mainPosts: '',
    imageNames: '',
    // hasMorePosts: false,
    singlePost: {},
};


export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const WRITE_REDIRECTION = 'WRITE_REDIRECTION';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const CLOSE_IMAGE = 'CLOSE_IMAGE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const BOOKMARK_REQUEST = 'BOOKMARK_REQUEST';
export const BOOKMARK_SUCCESS = 'BOOKMARK_SUCCESS';
export const BOOKMARK_FAILURE = 'BOOKMARK_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';


export default (state = initialState, action) => {


    return produce(state, (draft) => {

        switch (action.type) {

            case ADD_POST_REQUEST: {
                break;
            }

            case ADD_POST_SUCCESS: {
                draft.isAddingPost = false;
                draft.isPostAdded = true;
                draft.mainPosts.unshift(action.data);
                draft.imageNames = '';
                break;
            }

            case ADD_POST_FAILURE:
            case WRITE_REDIRECTION: {
                draft.isAddingPost = false;
                draft.isPostAdded = false;
                break;
            }

            case ADD_COMMENT_REQUEST: {
                break;
            }

            case ADD_COMMENT_SUCCESS: {
                const index = draft.mainPosts.findIndex(e => e.id === action.data.postId);
                draft.mainPosts[index].comments.push(action.data.comment);
                break;
            }

            case ADD_COMMENT_FAILURE: {
                break;
            }

            case LOAD_COMMENTS_SUCCESS: {
                const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
                draft.mainPosts[postIndex].comments = action.data.comments;
                break;
            }

            case LOAD_MAIN_POSTS_REQUEST:
            case LOAD_HASHTAG_POSTS_REQUEST:
            case LOAD_USER_POSTS_REQUEST: {
                draft.mainPosts = action.lastId ? draft.mainPosts : [];
                draft.hasMorePosts = action.lastId ? draft.hasMorePosts : true;
                // console.log('LOAD_MAIN_POSTS_REQUEST: ', draft.mainPosts, draft.hasMorePosts);
                break;
            }

            case LOAD_MAIN_POSTS_SUCCESS:
            case LOAD_HASHTAG_POSTS_SUCCESS:
            case LOAD_USER_POSTS_SUCCESS: {
                action.data.forEach(v => draft.mainPosts.push(v));
                draft.hasMorePosts = action.data.length === 10;
                // console.log('action.data: ', action.data);
                // console.log('LOAD_MAIN_POSTS_SUCCESS: ', draft.mainPosts, draft.hasMorePosts);
                break;
            }

            case LOAD_MAIN_POSTS_FAILURE:
            case LOAD_HASHTAG_POSTS_FAILURE:
            case LOAD_USER_POSTS_FAILURE: {
                break;
            }

            case UPLOAD_IMAGES_REQUEST: {
                break;
            }

            case UPLOAD_IMAGES_SUCCESS: {
                action.data.forEach(p => draft.imageNames.push(p));
                break;
            }

            case UPLOAD_IMAGES_FAILURE: {
                break;
            }

            case CLOSE_IMAGE: {
                const index = draft.imageNames.findIndex((v, i) => i === action.imageIndex);
                draft.imageNames.splice(index, 1);
                break;
            }

            case LIKE_POST_REQUEST:
            case UNLIKE_POST_REQUEST: {
                break;
            }

            case LIKE_POST_SUCCESS: {
                const index = draft.mainPosts.findIndex(p => p.id === action.data.postId);
                draft.mainPosts[index].Likers.unshift({id: action.data.userId});
                break;
            }

            case LIKE_POST_FAILURE:
            case UNLIKE_POST_FAILURE: {
                break;
            }

            case UNLIKE_POST_SUCCESS: {

                const index = draft.mainPosts.findIndex(p => p.id === action.data.postId);
                draft.mainPosts[index].Likers.splice(index, 1);
                break;
            }

            case BOOKMARK_REQUEST: {
                break;
            }

            case BOOKMARK_SUCCESS: {
                draft.mainPosts.unshift(action.data);
                break;
            }

            case BOOKMARK_FAILURE: {
                break;
            }

            case REMOVE_POST_REQUEST: {
                break;
            }

            case REMOVE_POST_SUCCESS: {
                const index = draft.mainPosts.findIndex(v => v.id === action.data);
                draft.mainPosts.splice(index, 1);
                break;
            }

            case REMOVE_POST_FAILURE: {
                break;
            }

            case LOAD_POST_REQUEST: {
                break;
            }

            case LOAD_POST_SUCCESS: {
                draft.singlePost = action.data;
                break;
            }

            case LOAD_POST_FAILURE: {
                break;
            }

            default:
                break;
        }

    });

};