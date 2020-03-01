import React from "react";
import FollowLayout from "../components/FollowLayout";
import ProfileLayout from "../components/ProfileLayout";

const dummy = {
    nickname: 'insta',
    post: [],
    follower: [],
    following: [],
};

const follow = '팔로워';

const Followers = () => {

    return (
        <>
            <ProfileLayout dummy={dummy}/>
            <FollowLayout follow={follow}/>
        </>
    );
};

export default Followers;