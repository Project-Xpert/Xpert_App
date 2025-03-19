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

const Home = () => {
  return (
    <View>
      <ScrollView
        horizontal={false}
        style={{backgroundColor: colorStyles.defaultWhite}}
        contentContainerStyle={{alignItems: 'center'}}>
        <BasicContainer paddingTop={screenSize.getVH(3.3)}>
          <View style={styles.topContainer}>
            <View>
              <Text style={styles.title}>열글자안넘는지테스트님</Text>
              <Text style={styles.topDescription}>
                안녕하세요! 오늘도 투자를 해봅시다!
              </Text>
            </View>
            <TouchableOpacity>
              <Image src={env.BASE_PROFILE_URL} style={styles.profile} />
            </TouchableOpacity>
          </View>

          <View
            style={{...styles.widthInfoBox, marginTop: screenSize.getVH(3.8)}}>
            <CoinImg
              width={screenSize.getVH(7.7)}
              height={screenSize.getVH(7.7)}
            />
            <View style={styles.widthBoxInnerTextContainer}>
              <Text style={styles.descriptionText}>
                열글자안넘는지테스트님의 자산은...
              </Text>
              <Text style={styles.bigText}>200,000원 이네요</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{...styles.widthInfoBox, marginTop: screenSize.getVH(1.6)}}>
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
            <TouchableOpacity style={styles.heightInfoBox}>
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

          <Text style={styles.friendText}>친구 랭킹</Text>

          <View style={styles.rankConatiner}>
            {[1, 2, 3].map(idx => {
              return (
                <FriendRank key={idx} rank={idx} name={'오송주'} money={190} />
              );
            })}
            <View style={styles.friendRankMoveDescription}>
              <TouchableOpacity>
                <Text style={styles.friendRankMoveText}>
                  {'전체 친구 랭킹 보러가기 >'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BasicContainer>
      </ScrollView>

      <BottomNav pageName={'Home'} />
    </View>
  );
};

const styles = StyleSheet.create({
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
  rankConatiner: {
    marginTop: screenSize.getVH(1.1),
    margin: screenSize.getVH(13.5),
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
