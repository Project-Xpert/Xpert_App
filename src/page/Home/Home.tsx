import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BasicContainer from '../../components/common/BasicContainer';
import env from '../../../env';
import {fontStyle} from '../../assets/styles/fontStyles';
import {colorStyles} from '../../assets/styles/color';
import BottomNav from '../../components/common/BottomNav';
import CalculateImg from '../../assets/image/home/calculate.svg';
import CoinImg from '../../assets/image/home/coin.svg';
import FolderImg from '../../assets/image/home/folder.svg';
import TalkImg from '../../assets/image/home/talk.svg';
import {screenSize} from '../../assets/styles/screenSize';
import FriendRank from '../../components/Home/FriendRank';
import {ScrollView} from 'react-native-gesture-handler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useUserData from '../../data/userData';
import {useEffect, useState} from 'react';
import {UserAPI} from '../../api/user';
import moneyFormatter from '../../util/moneyFormatter';
import {FriendAPI} from '../../api/friend';

interface rankingItem {
  username: string;
  userId: string;
  profile: string;
  money: number;
}

const Home = () => {
  const userData = useUserData();
  const navigator = useNavigation<NavigationProp<any>>();
  const [rankingData, setRankingData] = useState<rankingItem[]>([]);

  useEffect(() => {
    UserAPI.GetUserData()
      .then(response => {
        const {userId, username, profile, money} = response.data;

        userData.setData({userId, username, profile, money});
      })
      .catch(e => {
        console.log(e);
      });

    FriendAPI.getRanking()
      .then(response => {
        if (response.data) {
          setRankingData(response.data.friends);
        }
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  const handleMypageBtnPress = () => {
    navigator.navigate('Mypage');
  };

  const postListMoveHandler = () => {
    navigator.navigate('Social');
    navigator.navigate('PostList');
  };

  const newsListMoveHandler = () => {
    navigator.navigate('News');
  };

  const friendMoveHandler = () => {
    navigator.navigate('Social');
    navigator.navigate('Friend');
  };

  return (
    <View>
      <View style={styles.outerScrollViewContainer}>
        <ScrollView
          horizontal={false}
          style={{backgroundColor: colorStyles.defaultWhite}}
          contentContainerStyle={{alignItems: 'center'}}>
          <BasicContainer paddingTop={screenSize.getVH(3.3)}>
            <View style={styles.topContainer}>
              <View>
                <Text style={styles.title}>{`${userData.username}님`}</Text>
                <Text style={styles.topDescription}>
                  안녕하세요! 오늘도 투자를 해봅시다!
                </Text>
              </View>
              <TouchableOpacity onPress={handleMypageBtnPress}>
                <Image src={userData.profile} style={styles.profile} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                ...styles.widthInfoBox,
                marginTop: screenSize.getVH(3.8),
              }}>
              <CoinImg
                width={screenSize.getVH(7.7)}
                height={screenSize.getVH(7.7)}
              />
              <View style={styles.widthBoxInnerTextContainer}>
                <Text style={styles.descriptionText}>
                  {`${userData.username}님의 자산은...`}
                </Text>
                <Text style={styles.bigText}>{`${moneyFormatter(
                  userData.money,
                )}원 이네요`}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                ...styles.widthInfoBox,
                marginTop: screenSize.getVH(1.6),
              }}
              onPress={postListMoveHandler}>
              <TalkImg
                width={screenSize.getVH(7.7)}
                height={screenSize.getVH(7.7)}
              />
              <View style={styles.widthBoxInnerTextContainer}>
                <Text style={styles.bigText}>나만 투자 망한거 아니에요...</Text>
                <Text style={styles.descriptionText}>
                  {'눈물나는 투자 이야기 하러 가기 >'}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.heightInfoBoxContainer}>
              <TouchableOpacity
                style={styles.heightInfoBox}
                onPress={newsListMoveHandler}>
                <FolderImg
                  width={screenSize.getVH(6.6)}
                  height={screenSize.getVH(6.6)}
                />
                <Text style={styles.heightBoxDescription}>
                  {'지금 정세가 어떤지 알아야\n투자를 잘 할 수 있어요'}
                </Text>
                <Text style={styles.heightBoxMoveDescription}>
                  {'최근 뉴스 보러 가기 >'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.heightInfoBox}>
                <CalculateImg
                  width={screenSize.getVH(6.6)}
                  height={screenSize.getVH(6.6)}
                />
                <Text style={styles.heightBoxDescription}>
                  {'AI의 투자 분석 리포트를\n투자에 활용해보세요'}
                </Text>
                <Text style={styles.heightBoxMoveDescription}>
                  {'분석 리포트 보러가기 >'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.friendText}>친구 랭킹 TOP 3</Text>

            <View style={styles.rankContainer}>
              {rankingData.slice(0, 3).map((datum, idx) => {
                return (
                  <FriendRank
                    key={datum.userId}
                    rank={idx + 1}
                    money={datum.money}
                    profile={datum.profile}
                    userId={datum.userId}
                    username={datum.username}
                  />
                );
              })}
              {rankingData.length === 0 && (
                <Text style={styles.friendDescription}>
                  친구 리스트가 비어있네요!
                </Text>
              )}
              <View style={styles.friendRankMoveDescription}>
                <TouchableOpacity onPress={friendMoveHandler}>
                  <Text style={styles.friendRankMoveText}>
                    {rankingData.length === 0
                      ? '친구 찾으러 가기 >'
                      : '전체 친구 랭킹 보러가기 >'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BasicContainer>
        </ScrollView>
      </View>

      <BottomNav pageName={'Home'} />
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    marginTop: screenSize.getVH(2),
    width: screenSize.getVW(82),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  outerScrollViewContainer: {
    width: screenSize.width,
    height: screenSize.getVH(90.5),
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
  widthInfoBox: {
    width: screenSize.getVW(83),
    height: screenSize.getVH(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: screenSize.getVW(3.5),
    backgroundColor: colorStyles.lightGrayBackGround,
    borderRadius: 20,
  },
  heightInfoBoxContainer: {
    marginTop: screenSize.getVH(2.2),
    width: screenSize.getVW(83),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heightInfoBox: {
    width: screenSize.getVW(39),
    height: screenSize.getVH(20),
    paddingHorizontal: screenSize.getVW(1.6),
    paddingVertical: screenSize.getVH(1.6),
    backgroundColor: colorStyles.lightGrayBackGround,
    borderRadius: 15,
  },
  bigText: {
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.ExtraBold,
    color: colorStyles.basicText,
    letterSpacing: -0.5,
  },
  descriptionText: {
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.SemiBold,
    color: colorStyles.basicText,
  },
  widthBoxInnerTextContainer: {
    marginLeft: screenSize.getVW(2.1),
    height: screenSize.getVH(4.7),
    justifyContent: 'space-between',
  },
  heightBoxDescription: {
    marginLeft: screenSize.getVH(0.7),
    marginTop: screenSize.getVH(1.7),
    fontSize: screenSize.getVH(1.5),
    lineHeight: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
    letterSpacing: -0.5,
  },
  heightBoxMoveDescription: {
    marginLeft: screenSize.getVH(0.7),
    marginTop: screenSize.getVH(3.1),
    lineHeight: screenSize.getVH(1.4),
    fontSize: screenSize.getVH(1.4),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  friendText: {
    marginTop: screenSize.getVH(2.7),
    width: screenSize.getVW(82),
    fontSize: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Bold,
  },
  rankContainer: {
    marginTop: screenSize.getVH(1.1),
    margin: screenSize.getVH(13.5),
  },
  friendDescription: {
    marginTop: screenSize.getVH(1.6),
    width: screenSize.getVW(80),
    fontSize: screenSize.getVH(1.6),
    color: colorStyles.descriptionGray,
    fontFamily: fontStyle.SUIT.Regular,
  },
  friendRankMoveDescription: {
    marginTop: screenSize.getVH(1.6),
    width: screenSize.getVW(80),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  friendRankMoveText: {
    color: colorStyles.descriptionGray,
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Regular,
  },
});

export default Home;
