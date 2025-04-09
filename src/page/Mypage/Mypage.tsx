import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import BasicContainer from '../../components/common/BasicContainer';
import BasicHeader from '../../components/common/headers/BasicHeader';
import {fontStyle} from '../../assets/styles/fontStyles';
import {colorStyles} from '../../assets/styles/color';
import CoinImg from '../../assets/image/home/coin.svg';
import TwoBtns from '../../components/common/buttons/TwoBtns';
import BottomNav from '../../components/common/BottomNav';
import moneyFormatter from '../../util/moneyFormatter';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useEffect} from 'react';
import {UserAPI} from '../../api/user';
import useUserData from '../../data/userData';

const Mypage = () => {
  const userData = useUserData();
  const navigator = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    UserAPI.GetUserData()
      .then(response => {
        const {userId, username, profile, money} = response.data;

        userData.setData({userId, username, profile, money});
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <BasicContainer paddingTop={screenSize.getVH(8)}>
      <BasicHeader text={'마이페이지'} hideArrowBtn />

      <View style={scrollViewStyles.container}>
        <ScrollView>
          <TouchableOpacity
            style={scrollViewStyles.innerContainer}
            activeOpacity={1}>
            <View style={topUserInfoStyles.container}>
              <Image style={topUserInfoStyles.profile} src={userData.profile} />
              <View style={topUserInfoStyles.innerTextContainer}>
                <Text style={topUserInfoStyles.username}>
                  {userData.username}님
                </Text>
                <Text style={topUserInfoStyles.handle}>@{userData.userId}</Text>
              </View>
            </View>

            <View style={infoBoxStyle.container}>
              <CoinImg
                width={screenSize.getVH(7.7)}
                height={screenSize.getVH(7.7)}
              />
              <View style={infoBoxStyle.innerTextContainer}>
                <Text style={infoBoxStyle.mainText}>
                  {userData.username}님의 자산은...
                </Text>
                <Text style={infoBoxStyle.descriptionText}>
                  {moneyFormatter(userData.money)}원이네요
                </Text>
              </View>
            </View>

            <TwoBtns
              setColorToGray
              leftBtnText={'상품 교환'}
              rightBtnText={'크래딧 충전'}
              marginTop={screenSize.getVH(1.6)}
              leftBtnOnPress={function (): void {
                throw new Error('Function not implemented.');
              }}
              rightBtnOnPress={function (): void {
                throw new Error('Function not implemented.');
              }}
            />

            <Text style={titleStyle.text}>활동</Text>

            <View style={optionBoxStyles.container}>
              <TouchableOpacity style={optionBoxStyles.innerBtn}>
                <Text style={optionBoxStyles.btnText}>프로필 수정</Text>
              </TouchableOpacity>
              <TouchableOpacity style={optionBoxStyles.innerBtn}>
                <Text style={optionBoxStyles.btnText}>상품 교환 내역</Text>
              </TouchableOpacity>
              <TouchableOpacity style={optionBoxStyles.innerBtn}>
                <Text style={optionBoxStyles.btnText}>내 활동기록</Text>
              </TouchableOpacity>
              <TouchableOpacity style={optionBoxStyles.innerBtn}>
                <Text style={optionBoxStyles.btnText}>투자분석 리포트</Text>
              </TouchableOpacity>
            </View>

            <Text style={titleStyle.text}>기타</Text>

            <View style={optionBoxStyles.container}>
              <TouchableOpacity style={optionBoxStyles.innerBtn}>
                <Text style={optionBoxStyles.btnText}>공지사항</Text>
              </TouchableOpacity>
              <TouchableOpacity style={optionBoxStyles.innerBtn}>
                <Text style={optionBoxStyles.btnText}>자주 묻는 질문</Text>
              </TouchableOpacity>
              <TouchableOpacity style={optionBoxStyles.innerBtn}>
                <Text style={optionBoxStyles.btnText}>문의하기</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <BottomNav pageName={'Mypage'} />
    </BasicContainer>
  );
};

const scrollViewStyles = StyleSheet.create({
  container: {
    width: screenSize.getVW(100),
    height: screenSize.getVH(70),
  },
  innerContainer: {
    alignItems: 'center',
  },
});

const topUserInfoStyles = StyleSheet.create({
  container: {
    width: screenSize.getVW(82),
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerTextContainer: {
    marginLeft: screenSize.getVW(4.5),
  },
  profile: {
    width: screenSize.getVH(11.1),
    height: screenSize.getVH(11.1),
    borderRadius: screenSize.getVH(7),
  },
  username: {
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  handle: {
    marginTop: screenSize.getVH(0.4),
    fontSize: screenSize.getVH(1.8),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.descriptionGray,
  },
});

const infoBoxStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: screenSize.getVH(2.2),
    width: screenSize.getVW(82),
    height: screenSize.getVH(9.9),
    paddingHorizontal: screenSize.getVW(3.5),
    backgroundColor: colorStyles.lightGrayBackGround,
    borderRadius: screenSize.getVH(2),
  },
  innerTextContainer: {
    marginLeft: screenSize.getVW(2),
  },
  mainText: {
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.SemiBold,
    color: colorStyles.basicText,
  },
  descriptionText: {
    marginTop: screenSize.getVH(0.3),
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.ExtraBold,
    color: colorStyles.basicText,
  },
});

const titleStyle = StyleSheet.create({
  text: {
    marginTop: screenSize.getVH(2.7),
    width: screenSize.getVW(81),
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Bold,
  },
});

const optionBoxStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(1),
    width: screenSize.getVW(82),
    paddingVertical: screenSize.getVH(0.6),
    paddingHorizontal: screenSize.getVW(6),
    backgroundColor: colorStyles.lightGrayBackGround,
    borderRadius: screenSize.getVH(1.6),
  },
  innerBtn: {
    paddingVertical: screenSize.getVH(1.6),
  },
  btnText: {
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.basicText,
  },
});

export default Mypage;
