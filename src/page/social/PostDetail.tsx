import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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

const mockData = {
  profile:
    'https://i.pinimg.com/736x/b0/16/b4/b016b45823aeb706c3963f5e709913bb.jpg',
  username: '오송주',
  createdAt: '2025.09.20',
  title: '잃어도 되는 돈으로 주식을 하라고 하셨지..',
  mainImg:
    'https://i.pinimg.com/736x/28/af/32/28af3273e6a1796f33356f53221fb487.jpg',
  contents:
    '잃어도 되는돈이 어디있어 내돈 돌려내 내돈돌려내!!!!!\n\n잃어도 되는돈이면 니가 대신 잃든가!!!\n아아악 아아아아아ㅏㅏㅏ 아 진짜로 제발 진짜로 왜 그러는거야 나한테 아 진짜 왜? 왜???? 왜!!!!!!!!!!!',
  likeCnt: 40,
  comments: [
    {
      commentId: '1',
      writer: '녹차아킴 학살자',
      profile:
        'https://i.pinimg.com/736x/4a/a2/aa/4aa2aa851fc85aa953657248f05e6786.jpg',
      contents: '아니 근데 이게 말이 됨? 미장 요즘 왜이럼?? 이해가 안되네',
      createdAt: '2024-09-20',
      likeCnt: 12,
    },
    {
      commentId: '2',
      writer: 'Notion Lee',
      profile:
        'https://i.pinimg.com/474x/ce/e8/20/cee8205019d2b7ad317087c36a8383c3.jpg',
      contents: '금에 올인한 나의 승리다 ㅎ',
      createdAt: '2024-09-20',
      likeCnt: 11,
    },
  ],
  replies: [
    {
      commentId: '1',
      writer: '해피집사 IN 일본',
      profile:
        'https://i.pinimg.com/736x/96/9e/94/969e94ee6653be71e12ea4913c93412d.jpg',
      contents:
        '진짜 왜 그럴까요.. 저도 이해가 안되요.. 트럼프가 집권하고 미장이 좋은 날이 없네요..',
      createdAt: '2024-09-20',
      likeCnt: 2,
    },
    {
      commentId: '2',
      writer: '무소식이 히소sick',
      profile:
        'https://i.pinimg.com/474x/63/d0/79/63d079598cb3e7388d1c229696a48f3e.jpg',
      contents: '우우 나가라',
      createdAt: '2024-09-20',
      likeCnt: 24,
    },
    {
      commentId: '2',
      writer: '무소식이 히소sick',
      profile:
        'https://i.pinimg.com/474x/63/d0/79/63d079598cb3e7388d1c229696a48f3e.jpg',
      contents: '우우 나가라222',
      createdAt: '2024-09-20',
      likeCnt: 24,
    },
  ],
};

const PostDetail = ({route}: any) => {
  return (
    <BasicContainer paddingTop={screenSize.getVH(9.2)}>
      <BasicHeader text={'글 상세'} />

      <View style={scrollViewStyles.outerContainer}>
        <ScrollView>
          <View style={scrollViewStyles.innerContainer}>
            <View style={topProfileStyles.container}>
              <Image style={topProfileStyles.profile} src={mockData.profile} />
              <View style={topProfileStyles.innerContainer}>
                <Text style={topProfileStyles.name}>{mockData.username}</Text>
                <Text style={topProfileStyles.createAt}>
                  {mockData.createdAt}
                </Text>
              </View>
            </View>

            <Text style={postStyles.title}>{mockData.title}</Text>

            <Image style={postStyles.mainImg} src={mockData.mainImg} />

            <Text style={postStyles.content}>{mockData.contents}</Text>

            {/* bottom container */}
            <View style={bottomBtnStyle.outerContainer}>
              <TouchableOpacity style={bottomBtnStyle.container}>
                <LikeIcon
                  width={screenSize.getVH(1.6)}
                  height={screenSize.getVH(1.6)}
                />
                <Text style={bottomBtnStyle.text}>{mockData.likeCnt}</Text>
              </TouchableOpacity>
              <View style={bottomBtnStyle.betweenElement} />
              <View style={bottomBtnStyle.container}>
                <CommentIcon
                  width={screenSize.getVH(1.6)}
                  height={screenSize.getVH(1.6)}
                />
                <Text style={bottomBtnStyle.text}>12</Text>
              </View>
            </View>

            {/* comment container */}
            <View style={bottomLineStyles.line} />

            <View>
              {mockData.comments.map((comment, idx) => {
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
                    {mockData.replies
                      .filter(reply => reply.commentId === comment.commentId)
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
        </ScrollView>
      </View>

      <BottomNav pageName={'Social'} />
    </BasicContainer>
  );
};

const scrollViewStyles = StyleSheet.create({
  outerContainer: {
    width: screenSize.width,
    height: screenSize.getVH(67),
  },
  innerContainer: {
    alignItems: 'center',
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
});

export default PostDetail;
