const initialState = {
    isAddingPost: false,
    isPostAdded: false,
    addPostError: '',
    isAddingComment: false,
    isCommentAdded: false,
    mainPosts: '',
    imageNames: '',
    // hasMorePosts: false,
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



export default (state = initialState, action) => {

    // console.log('reducers/post... state:', state);

    switch (action.type) {

        case ADD_POST_REQUEST: {
            return {
                ...state,
                isAddingPost: true,
            }
        }

        case ADD_POST_SUCCESS: {
            return {
                ...state,
                isAddingPost: false,
                isPostAdded: true,
                mainPosts: [action.data, ...state.mainPosts],
                imageNames: '',
            }
        }

        case ADD_POST_FAILURE:
        case WRITE_REDIRECTION:{
            return {
                ...state,
                isAddingPost: false,
                isPostAdded: false,
            }
        }

        case ADD_COMMENT_REQUEST: {
            return {
                ...state,
            }
        }

        case ADD_COMMENT_SUCCESS: {

            console.log('reducers/post... ADD_COMMENT_SUCCESS... action.data.postId:', action.data);

            const index =  state.mainPosts.findIndex(e => e.id === action.data.postId);
            const post = state.mainPosts[index];
            console.log('reducers/post... ADD_COMMENT_SUCCESS... post:', post);
            const comments = [...post.comments, action.data.comment];
            const mainPosts = [...state.mainPosts];
            mainPosts[index] = {...post, comments};

            return {
                ...state,
                mainPosts,
            }
        }

        case ADD_COMMENT_FAILURE: {
            return {
                ...state,
            }
        }

        case LOAD_COMMENTS_SUCCESS: {
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const comments = action.data.comments;
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = { ...post, comments };
            return {
                ...state,
                mainPosts,
            };
        }

        case LOAD_MAIN_POSTS_REQUEST:
        case LOAD_HASHTAG_POSTS_REQUEST:
        case LOAD_USER_POSTS_REQUEST: {
            return {
                ...state,
                mainPosts: action.lastId ? state.mainPosts : [],
                hasMorePosts: action.lastId ? state.hasMorePosts : true,
            }
        }

        case LOAD_MAIN_POSTS_SUCCESS:
        case LOAD_HASHTAG_POSTS_SUCCESS:
        case LOAD_USER_POSTS_SUCCESS: {

            return {
                ...state,
                mainPosts: state.mainPosts.concat(action.data),
                hasMorePosts: action.data.length === 10,
            }
        }

        case LOAD_MAIN_POSTS_FAILURE:
        case LOAD_HASHTAG_POSTS_FAILURE:
        case LOAD_USER_POSTS_FAILURE: {
            return {
                ...state,
            }
        }

        case UPLOAD_IMAGES_REQUEST: {

            return {
                ...state,
            };
        }

        case UPLOAD_IMAGES_SUCCESS: {

            console.log('UPLOAD_IMAGES_SUCCESS: ', action.data);

            return {
                ...state,
                imageNames: [...state.imageNames, ...action.data],
            };
        }

        case UPLOAD_IMAGES_FAILURE: {

            return {
                ...state,
            };
        }

        case CLOSE_IMAGE: {

            return {
                ...state,
                imageNames: state.imageNames.filter( (v, i) => action.imageIndex !== i ),
            };
        }

        case LIKE_POST_REQUEST:
        case UNLIKE_POST_REQUEST: {

            return {
                ...state,
            };
        }

        case LIKE_POST_SUCCESS: {

            const index = state.mainPosts.findIndex(p => p.id === action.data.postId);
            const post = state.mainPosts[index];
            const Likers = [ { id: action.data.userId }, ...post.Likers ];
            const mainPosts = [...state.mainPosts];
            mainPosts[index] = {...post, Likers};

            return {
                ...state,
                mainPosts,
            };
        }

        case LIKE_POST_FAILURE:
        case UNLIKE_POST_FAILURE: {

            return {
                ...state,
            };
        }

        case UNLIKE_POST_SUCCESS: {

            const index = state.mainPosts.findIndex(p => p.id === action.data.postId);
            const post = state.mainPosts[index];
            const Likers = post.Likers.filter(v => v.id !== action.data.userId);
            const mainPosts = [...state.mainPosts];
            mainPosts[index] = {...post, Likers};

            return {
                ...state,
                mainPosts,
            };
        }

        case BOOKMARK_REQUEST: {

            return {
                ...state,
            };
        }

        case BOOKMARK_SUCCESS: {

            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
            };
        }

        case BOOKMARK_FAILURE: {

            return {
                ...state,
            };
        }

        case REMOVE_POST_REQUEST: {
            return {
                ...state,
            };
        }

        case REMOVE_POST_SUCCESS: {
            return {
                ...state,
                mainPosts: state.mainPosts.filter(v => v.id !== action.data),
            };
        }

        case REMOVE_POST_FAILURE: {
            return {
                ...state,
            };
        }


        default:
            return state;
    }
};