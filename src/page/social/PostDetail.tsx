import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import BasicContainer from '../../components/common/BasicContainer';
import BasicHeader from '../../components/common/headers/BasicHeader';
import {fontStyle} from '../../assets/styles/fontStyles';
import {colorStyles} from '../../assets/styles/color';
import CommentIcon from '../../assets/image/icon/social/comment.svg';
import LikeIcon from '../../assets/image/icon/social/like.svg';
import Comment from '../../components/Social/Comment';
import Reply from '../../components/Social/Reply';
import {ScrollView} from 'react-native-gesture-handler';
import BottomNav from '../../components/common/BottomNav';
import {useEffect, useState} from 'react';
import {PostAPI} from '../../api/post';
import useModalData from '../../data/modalData';
import CommentInput from '../../components/Social/post/CommentInput';
import {CommentAPI} from '../../api/comment';

interface PostDetail {
  profile: string;
  username: string;
  createdAt: string;
  title: string;
  contents: string;
  mainImg: string;
  likeCnt: number;
  comments: CommentDetail[];
  replies: ReplyDetail[];
}

interface CommentDetail {
  commentId: string;
  userId: string;
  writer: string;
  profile: string;
  contents: string;
  createdAt: string;
  likeCnt: number;
}

interface ReplyDetail {
  replyId: string;
  commentId: string;
  userId: string;
  writer: string;
  profile: string;
  contents: string;
  createdAt: string;
  likeCnt: number;
}

const PostDetail = ({route}: any) => {
  const postId = route.params.postId;
  const [data, setPostData] = useState<PostDetail>();
  const {modalEnabled} = useModalData();
  const [commentContent, setCommentContent] = useState('');

  const reloadPostData = () => {
    PostAPI.getPostDetail(postId)
      .then(response => {
        setPostData(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    reloadPostData();
  }, []);

  const onChange = (value: string) => {
    setCommentContent(value);
  };

  const handleCreateCommentEvent = () => {
    CommentAPI.createComment(postId, {content: commentContent})
      .then(response => {
        setCommentContent('');
        reloadPostData();
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={{flex: 1}}
      keyboardVerticalOffset={screenSize.getVH(-4)}>
      <BasicContainer paddingTop={screenSize.getVH(9.2)}>
        <BasicHeader text={'글 상세'} />

        {modalEnabled && (
          <View style={transparentBackground.container}>
            <View style={transparentBackground.background} />
          </View>
        )}

        <View style={scrollViewStyles.outerContainer}>
          <ScrollView>
            <View style={scrollViewStyles.innerContainer}>
              {data && (
                <View>
                  <View style={topProfileStyles.container}>
                    <Image
                      style={topProfileStyles.profile}
                      src={data.profile}
                    />
                    <View style={topProfileStyles.innerContainer}>
                      <Text style={topProfileStyles.name}>{data.username}</Text>
                      <Text style={topProfileStyles.createAt}>
                        {data.createdAt}
                      </Text>
                    </View>
                  </View>

                  <Text style={postStyles.title}>{data.title}</Text>

                  {data.mainImg && (
                    <Image style={postStyles.mainImg} src={data.mainImg} />
                  )}

                  <Text style={postStyles.content}>{data.contents}</Text>

                  {/* bottom container */}
                  <View style={bottomBtnStyle.outerContainer}>
                    <TouchableOpacity style={bottomBtnStyle.container}>
                      <LikeIcon
                        width={screenSize.getVH(1.6)}
                        height={screenSize.getVH(1.6)}
                      />
                      <Text style={bottomBtnStyle.text}>{data.likeCnt}</Text>
                    </TouchableOpacity>
                    <View style={bottomBtnStyle.betweenElement} />
                    <View style={bottomBtnStyle.container}>
                      <CommentIcon
                        width={screenSize.getVH(1.6)}
                        height={screenSize.getVH(1.6)}
                      />
                      <Text style={bottomBtnStyle.text}>
                        {data.comments.length + data.replies.length}
                      </Text>
                    </View>
                  </View>

                  {/* comment container */}
                  <View style={bottomLineStyles.line} />
                  {data.comments.length + data.replies.length <= 0 && (
                    <Text style={commentStyles.text}>
                      댓글이 없습니다. 첫 댓글을 작성해보세요!
                    </Text>
                  )}
                  <View>
                    {data.comments.map((comment, idx) => {
                      return (
                        <View
                          style={commentStyles.container}
                          key={`container-${idx}`}>
                          <Comment
                            key={`comment-${idx}`}
                            profile={comment.profile}
                            writer={comment.writer}
                            content={comment.contents}
                            createdAt={comment.createdAt}
                            likeCnt={comment.likeCnt}
                          />
                          {data.replies
                            .filter(
                              reply => reply.commentId === comment.commentId,
                            )
                            .map((reply, idx) => (
                              <Reply
                                key={`reply-${idx}`}
                                profile={reply.profile}
                                writer={reply.writer}
                                content={reply.contents}
                                createdAt={reply.createdAt}
                                likeCnt={reply.likeCnt}
                              />
                            ))}
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </View>

        <CommentInput
          value={commentContent}
          onChange={e => onChange(e.nativeEvent.text)}
          onPress={handleCreateCommentEvent}
        />

        <BottomNav pageName={'Social'} />
      </BasicContainer>
    </KeyboardAvoidingView>
  );
};

const scrollViewStyles = StyleSheet.create({
  outerContainer: {
    width: screenSize.width,
    height: screenSize.getVH(64.5),
  },
  innerContainer: {
    alignItems: 'center',
    paddingBottom: screenSize.getVH(2),
  },
});

const transparentBackground = StyleSheet.create({
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenSize.width,
    height: screenSize.height,
    backgroundColor: colorStyles.transparentBackground,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
  },
});

const topProfileStyles = StyleSheet.create({
  container: {
    width: screenSize.getVW(81),
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerContainer: {
    marginLeft: screenSize.getVW(2.4),
  },
  name: {
    fontSize: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  createAt: {
    fontSize: screenSize.getVH(1.6),
    marginTop: screenSize.getVH(0.5),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.descriptionGray,
  },
  profile: {
    width: screenSize.getVH(5.5),
    height: screenSize.getVH(5.5),
    borderRadius: 100,
  },
});

const postStyles = StyleSheet.create({
  mainImg: {
    marginTop: screenSize.getVH(2.2),
    width: screenSize.getVW(82),
    height: screenSize.getVH(28.8),
    borderRadius: screenSize.getVH(5.5),
  },
  title: {
    marginTop: screenSize.getVH(1.1),
    width: screenSize.getVW(81),
    fontSize: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  content: {
    width: screenSize.getVW(81),
    marginTop: screenSize.getVH(3.3),
    fontFamily: fontStyle.SUIT.Medium,
    fontSize: screenSize.getVH(1.8),
    lineHeight: screenSize.getVH(2),
  },
});

const bottomBtnStyle = StyleSheet.create({
  outerContainer: {
    marginTop: screenSize.getVH(2.7),
    width: screenSize.getVW(81),
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  betweenElement: {
    width: screenSize.getVW(3),
  },
  text: {
    marginLeft: screenSize.getVW(1.1),
    fontSize: screenSize.getVH(1.8),
    fontFamily: fontStyle.SUIT.ExtraBold,
    color: colorStyles.descriptionGray,
  },
});

const bottomLineStyles = StyleSheet.create({
  line: {
    marginTop: screenSize.getVH(1.6),
    width: screenSize.getVW(82),
    height: screenSize.getVH(0.1),
    backgroundColor: colorStyles.descriptionGray,
  },
});

const commentStyles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  text: {
    color: colorStyles.disableGray,
    marginTop: screenSize.getVH(1.6),
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Bold,
    marginLeft: screenSize.getVW(3.5),
  },
});

export default PostDetail;
