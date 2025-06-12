import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BasicContainer from '../../components/common/BasicContainer';
import BasicHeader from '../../components/common/headers/BasicHeader';
import {screenSize} from '../../assets/styles/screenSize';
import {colorStyles} from '../../assets/styles/color';
import {fontStyle} from '../../assets/styles/fontStyles';
import PostRanking from '../../components/Social/PostRanking';
import BottomNav from '../../components/common/BottomNav';
import RankingIcon from '../../assets/image/icon/social/rankIcon.svg';
import {useState} from 'react';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import useUserData from '../../data/userData';

interface RankPostData {
  imageUrl?: string;
  title: string;
  writer: string;
  like: number;
  comment: number;
}

const mockData = {
  rankPosts: [
    {
      imageUrl:
        'https://i.pinimg.com/736x/81/4b/b4/814bb4a90ad39df1894399fd10172ee2.jpg',
      title: '망한 주식을 받아드리는 나의 자세',
      writer: '고앵이',
      like: 122,
      comment: 32,
    },
    {
      title: '미장 분석 들어간다',
      writer: '태정태세문단속',
      like: 121,
      comment: 42,
    },
    {
      imageUrl:
        'https://i.pinimg.com/474x/07/7f/e8/077fe85c592b88231a861c0739822a83.jpg',
      title: '솔직히.. 조금만 있으면 엔비디아 반등할꺼라고 생각해요..',
      writer: '고토 히토리',
      like: 92,
      comment: 12,
    },
    {
      title: '엔비디아, 넷플릭스 로블록스 레츠고',
      writer: 'Notion Lee',
      like: 90,
      comment: 2,
    },
  ],
};

const SocialHome = () => {
  const {username, profile} = useUserData();

  const navigator = useNavigation<NavigationProp<any>>();
  const [rankPostData, setRankPostData] = useState<RankPostData[]>(
    mockData.rankPosts,
  );

  const handlePostListMove = () => {
    navigator.navigate('PostList');
  };

  const handleFriendListMove = () => {
    navigator.navigate('Friend');
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.2)}>
      <BasicHeader text={'소셜'} hideArrowBtn />
      <View style={topUserInfoStyles.topContainer}>
        <View>
          <Text style={topUserInfoStyles.title}>{username}님</Text>
          <Text style={topUserInfoStyles.topDescription}>
            여기서 사람들과 소통해보세요!
          </Text>
        </View>
        <TouchableOpacity>
          <Image src={profile} style={topUserInfoStyles.profile} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={friendBtnStyles.container}
        onPress={handleFriendListMove}>
        <RankingIcon
          width={screenSize.getVH(7.7)}
          height={screenSize.getVH(7.7)}
        />
        <View style={friendBtnStyles.textContainer}>
          <Text style={friendBtnStyles.title}>
            친구들과 경쟁하며 투자해보세요
          </Text>
          <Text style={friendBtnStyles.description}>
            {'친구 목록 바로 가기 >'}
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={titleStyles.text}>게시판 랭킹</Text>

      <View>
        {rankPostData.map((rankPostDatum, idx) => {
          const {title, writer, comment, like, imageUrl} = rankPostDatum;

          return (
            <PostRanking
              key={idx}
              rank={idx + 1}
              title={title}
              writer={writer}
              commentCnt={comment}
              likeCnt={like}
              imageUrl={imageUrl}
              hideLineBelow={idx === 3}
            />
          );
        })}
      </View>

      <TouchableOpacity
        style={postBtnStyles.container}
        onPress={handlePostListMove}>
        <Text style={postBtnStyles.text}>{'게시판 바로가기 >'}</Text>
      </TouchableOpacity>

      <BottomNav pageName={'Social'} />
    </BasicContainer>
  );
};

const topUserInfoStyles = StyleSheet.create({
  topContainer: {
    width: screenSize.getVW(82),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fontStyle.SUIT.ExtraBold,
    color: colorStyles.basicText,
    fontSize: screenSize.getVH(2.2),
    lineHeight: screenSize.getVH(2.7),
  },
  topDescription: {
    marginTop: screenSize.getVH(1.1),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.descriptionGray,
    fontSize: screenSize.getVH(1.6),
  },
  profile: {
    width: screenSize.getVH(8.3),
    height: screenSize.getVH(8.3),
    borderRadius: 100,
  },
});

const friendBtnStyles = StyleSheet.create({
  container: {
    width: screenSize.getVW(82),
    height: screenSize.getVH(10),
    borderRadius: screenSize.getVH(2.2),
    backgroundColor: colorStyles.lightGrayBackGround,
    marginTop: screenSize.getVH(2.7),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: screenSize.getVW(2.3),
  },
  textContainer: {
    paddingLeft: screenSize.getVW(1),
  },
  title: {
    fontFamily: fontStyle.SUIT.ExtraBold,
    fontSize: screenSize.getVH(1.8),
    color: colorStyles.basicText,
  },
  description: {
    fontFamily: fontStyle.SUIT.Bold,
    fontSize: screenSize.getVH(1.6),
    color: colorStyles.descriptionGray,
  },
});

const titleStyles = StyleSheet.create({
  text: {
    width: screenSize.getVW(81),
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.SemiBold,
    color: colorStyles.basicText,
    marginTop: screenSize.getVH(3),
  },
});

const postBtnStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenSize.getVW(82),
    height: screenSize.getVH(5.5),
    backgroundColor: colorStyles.lightGrayBackGround,
    borderRadius: screenSize.getVH(1.6),
  },
  text: {
    fontFamily: fontStyle.SUIT.SemiBold,
    fontSize: screenSize.getVH(2),
    color: colorStyles.basicText,
  },
});

export default SocialHome;
