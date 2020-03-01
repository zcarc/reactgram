import {
    BottomIcons, Comment, CommentContainer, CommentDetail, CommentField, CommentFieldInput,
    Contents,
    ContentsBox, ImgSection,
    Inner, LeftIcons, Reactions, Nickname,
    ProfileImg, ProfileUser, SpriteBookmarkOutline, SpriteBubbleIcon, SpriteHeartIconOutline,
    SpriteMoreIcon, SpriteShareIcon, SpriteSmallHeartIconOutline, Timer,
    ToggleBox,
    ToggleBoxLi, LiInput,
    Top, UploadBtn,
    UserContainer
} from "./style/content";

const ContentLayout = ({dummyPost}) => {
    // console.log('dummy:', dummy);

    return (
        <>
            <Inner>
                <ContentsBox>

                    {dummyPost.mainPosts.map((v) => {
                        return (
                                <Contents>
                                <Top>
                                    <UserContainer>
                                        <ProfileImg>
                                            <img src="/img/profile_photo.jpg" alt="프로필이미지"/>
                                        </ProfileImg>
                                        <ProfileUser>
                                            <div>{v.User.nickname}</div>
                                        </ProfileUser>

                                        <div>
                                            <form action="#" method="post">
                                                <input type="submit" value="삭제"/>
                                            </form>
                                        </div>

                                    </UserContainer>

                                    <SpriteMoreIcon>
                                        <ToggleBox>
                                            <ToggleBoxLi>
                                                <LiInput type="submit" value="팔로우"/>
                                            </ToggleBoxLi>
                                        </ToggleBox>
                                    </SpriteMoreIcon>
                                </Top>

                                <ImgSection>
                                    <div>
                                        <img src={v.img ? v.img : "/img/post_photo_01.jpg"} alt="post_img"/>
                                    </div>
                                </ImgSection>

                                <BottomIcons>
                                    <LeftIcons>
                                        <div>
                                            <SpriteHeartIconOutline/>
                                        </div>
                                        <div>
                                            <a href="#">
                                                <SpriteBubbleIcon/>
                                            </a>
                                        </div>

                                        <SpriteShareIcon/>
                                    </LeftIcons>

                                    <div>
                                        <SpriteBookmarkOutline/>
                                    </div>
                                </BottomIcons>

                                <Reactions>
                                    <span>좋아요 1개</span>
                                    <span>북마크 0개</span>
                                </Reactions>

                                <CommentContainer>
                                    <Comment>
                                        <CommentDetail>
                                            <Nickname>{v.User.nickname}</Nickname>
                                            {/* desc */}
                                            <div>
                                                {v.content}
                                            </div>
                                        </CommentDetail>
                                    </Comment>
                                </CommentContainer>


                                <CommentContainer>
                                    <Comment>
                                        <CommentDetail>
                                            <Nickname>username</Nickname>
                                            <div>description1</div>
                                        </CommentDetail>
                                    </Comment>
                                    <div>
                                        <SpriteSmallHeartIconOutline/>
                                    </div>
                                </CommentContainer>

                                <Timer>5일, 23시간</Timer>

                                <CommentField>
                                    <CommentFieldInput type="text" size="70px" placeholder="댓글 달기..." maxLength="40"/>
                                    <UploadBtn>게시</UploadBtn>
                                </CommentField>
                            </Contents>
                            );
                    })}


                </ContentsBox>
            </Inner>

        </>

);
};

export default ContentLayout;