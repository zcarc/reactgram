import {all, takeLatest, fork, call, put, delay} from 'redux-saga/effects';
import {
    LOG_IN_REQUEST,
    LOG_IN_FAILURE,
    LOG_IN_SUCCESS,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOG_OUT_SUCCESS,
    LOG_OUT_REQUEST,
    USER_EXISTS_REQUEST,
    USER_EXISTS_SUCCESS,
    USER_EXISTS_FAILURE,
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_FAILURE,
    FOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_FAILURE,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_REQUEST,
    LOAD_FOLLOWINGS_SUCCESS,
    LOAD_FOLLOWINGS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWERS_REQUEST,
    REMOVE_FOLLOWER_SUCCESS,
    REMOVE_FOLLOWER_FAILURE,
    REMOVE_FOLLOWER_REQUEST,
    LOAD_OTHER_FOLLOWINGS_REQUEST,
    LOAD_OTHER_FOLLOWINGS_FAILURE,
    LOAD_OTHER_FOLLOWINGS_SUCCESS,
    LOAD_OTHER_FOLLOWERS_SUCCESS,
    LOAD_OTHER_FOLLOWERS_FAILURE,
    LOAD_OTHER_FOLLOWERS_REQUEST,
    UPDATE_USER_PROFILE_IMAGE_SUCCESS, UPDATE_USER_PROFILE_IMAGE_FAILURE, UPDATE_USER_PROFILE_IMAGE_REQUEST
} from "../reducers/user";
import axios from 'axios';
import {UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS} from "../reducers/post";

function updateUserProfileImageAPI(formData) {
    return axios.post('user/profile/image', formData, {
        withCredentials: true,
    });
}

function* updateUserProfileImage(action) {
    // console.log('updateUserProfileImage action: ', action);

    try {
        const result = yield call(updateUserProfileImageAPI, action.data);
        // console.log('updateUserProfileImage result.data: ', result.data);
        yield put({
            type: UPDATE_USER_PROFILE_IMAGE_SUCCESS,
            data: result.data,
        });

    } catch (e) {
        console.error(e);
        yield put({
            type: UPDATE_USER_PROFILE_IMAGE_FAILURE,
            error: e,
        });
    }
}

function* watchUpdateUserProfileImage() {
    yield takeLatest(UPDATE_USER_PROFILE_IMAGE_REQUEST, updateUserProfileImage);
}

function loadOtherFollowersAPI(userId) {

    // console.log('loadOtherFollowersAPI userId: ', userId);

    return axios.get(`/user/${userId || 0}/followers/other`, {
        withCredentials: true,
    });
}

function* loadOtherFollowers(action) {

    try {
        const result = yield call(loadOtherFollowersAPI, action.data);

        // console.log('sagas loadOtherFollowers result: ', JSON.stringify(result));

        yield put({
            type: LOAD_OTHER_FOLLOWERS_SUCCESS,
            data: result.data,
        });

    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_OTHER_FOLLOWERS_FAILURE,
            error: e
        });
    }

}

function* watchLoadOtherFollowers() {
    yield takeLatest(LOAD_OTHER_FOLLOWERS_REQUEST, loadOtherFollowers);
}

function loadOtherFollowingsAPI(userId) {
    // console.log('loadOtherFollowingsAPI userId: ', userId);

    return axios.get(`/user/${userId || 0}/followings/other`, {
        withCredentials: true,
    });
}

function* loadOtherFollowings(action) {

    try {
        const result = yield call(loadOtherFollowingsAPI, action.data);

        // console.log('sagas loadOtherFollowings result: ', JSON.stringify(result));

        yield put({
            type: LOAD_OTHER_FOLLOWINGS_SUCCESS,
            data: result.data,
        });

    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_OTHER_FOLLOWINGS_FAILURE,
            error: e
        });
    }

}

function* watchLoadOtherFollowings() {
    yield takeLatest(LOAD_OTHER_FOLLOWINGS_REQUEST, loadOtherFollowings);
}

function removeFollowerAPI(userId) {

    return axios.delete(`/user/${userId}/follower`, {
        withCredentials: true,
    });
}

function* removeFollower(action) {
    try {

        const result = yield call(removeFollowerAPI, action.data);

        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data,
        });

    } catch (e) {
        console.error(e);
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: e
        });
    }

}

function* watchRemoveFollower() {
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}


function loadFollowersAPI(userId) {

    return axios.get(`/user/${userId || 0}/followers`, {
        withCredentials: true,
    });
}

function* loadFollowers(action) {

    try {
        const result = yield call(loadFollowersAPI, action.data);

        // console.log('sagas loadFollowers result: ', JSON.stringify(result));

        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data,
        });

    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: e
        });
    }

}

function* watchLoadFollowers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function loadFollowingsAPI(userId) {
    // console.log('loadFollowingsAPI userId: ', userId);

    return axios.get(`/user/${userId || 0}/followings`, {
        withCredentials: true,
    });
}

function* loadFollowings(action) {

    try {
        const result = yield call(loadFollowingsAPI, action.data);

        // console.log('sagas loadFollowings result: ', JSON.stringify(result));

        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data,
        });

    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: e
        });
    }

}

function* watchLoadFollowings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function unFollowAPI(postUserId) {

    return axios.delete(`/user/${postUserId}/follow`, {
        withCredentials: true,
    });
}

function* unFollow(action) {
    try {

        // console.log('sagas unFollow result: ', JSON.stringify(action));

        const result = yield call(unFollowAPI, action.data);

        yield put({
            type: UNFOLLOW_USER_SUCCESS,
            data: result.data,
        });

    } catch (e) {
        console.error(e);
        yield put({
            type: UNFOLLOW_USER_FAILURE,
            error: e
        });
    }

}

function* watchUnFollow() {
    yield takeLatest(UNFOLLOW_USER_REQUEST, unFollow);
}

function followAPI(postUserId) {
    return axios.post(`/user/${postUserId}/follow`, {}, {
        withCredentials: true,
    });
}

function* follow(action) {
    try {
        const result = yield call(followAPI, action.data);

        // console.log('sagas follow: ', JSON.stringify(action));

        yield put({
            type: FOLLOW_USER_SUCCESS,
            data: result.data,
        });

    } catch (e) {
        console.error(e);
        yield put({
            type: FOLLOW_USER_FAILURE,
            error: e
        });
    }

}

function* watchFollow() {
    yield takeLatest(FOLLOW_USER_REQUEST, follow);
}

function userExistsAPI() {

    return axios.get('/user/', {
        withCredentials: true,
    });
}

function* userExists() {

    try {
        const result = yield call(userExistsAPI);
        yield put({
            type: USER_EXISTS_SUCCESS,
            data: result.data,
        });

    } catch (e) {
        console.error(e);
        yield put({
            type: USER_EXISTS_FAILURE,
            error: e
        });
    }

}

function* watchUserExists() {
    yield takeLatest(USER_EXISTS_REQUEST, userExists);
}

function logoutAPI() {

    return axios.post('/user/logout', {}, {
        withCredentials: true,
    });

}

function* logout() {

    try {
        yield call(logoutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        });

    } catch (e) {
        console.error(e);
    }

}

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logout);
}

function loadUserAPI(data) {

    // console.log('loadUserAPI data: ', data);

    return axios.get(`/user/${data || 0}/other`, {
        withCredentials: true,
    });
}

function* loadUser(action) {

    try {
        const result = yield call(loadUserAPI, action.data);
        // console.log('loadUser... result: ', result && result.data);
        // yield delay(800);
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
        });

    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_USER_FAILURE,
            error: e
        });
    }

}

function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function signUpAPI(data) {

    // const data2 = {
    //     user: {
    //         id: 1,
    //         nick: 'test01',
    //     }
    // };

    // axios retuns a promise
    return axios.post('/user/', data);
}

function* signUp(action) {

    // console.log('sagas/user... action: ', action);

    try {
        yield delay(1000);
        const result = yield call(signUpAPI, action.data);
        // console.log('result: ', result);

        yield put({
            type: SIGN_UP_SUCCESS,
        });

    } catch (e) {

        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            error: e,
        });
        // console.dir(e);
        alert(e.response.data);
    }
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function loginAPI(data) {
    return axios.post('/user/login', data, {
        withCredentials: true,
    });

    // return axios.post('/user/login', data);
}

function* login(action) {

    try {

        yield delay(1000);
        const result = yield call(loginAPI, action.data);
        // console.log('sagas/user... login axios result: ', result); // user data: result.data
        // console.log('sagas/user... login axios result.data: ', result.data);

        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        });

    } catch (e) {
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
        });

        alert(e.response.data);
    }

}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login);
}

export default function* userSaga() {
    yield all([
        fork(watchUserExists),
        fork(watchLogin),
        fork(watchSignUp),
        fork(watchLoadUser),
        fork(watchLogout),
        fork(watchFollow),
        fork(watchUnFollow),
        fork(watchLoadFollowings),
        fork(watchLoadFollowers),
        fork(watchRemoveFollower),
        fork(watchLoadOtherFollowings),
        fork(watchLoadOtherFollowers),
        fork(watchUpdateUserProfileImage),
    ]);
}