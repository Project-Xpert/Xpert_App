import LandingImage1 from '../../assets/image/landing/page1.svg';
import LandingImage2 from '../../assets/image/landing/page2.svg';
import LandingImage3 from '../../assets/image/landing/page3.svg';
import LandingImage4 from '../../assets/image/landing/page4.svg';
import Button from '../../components/common/buttons/Button';
import IndexBars from '../../components/Landing/indexBar';
import LandingIdxPage from '../../components/Landing/LandingIdxPage';
import Swiper from 'react-native-swiper';
import {StyleSheet, View} from 'react-native';
import {useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {colorStyles} from '../../assets/styles/color';

const Landing = () => {
  const [index, setIndex] = useState(0);
  const navigator = useNavigation<NavigationProp<any>>();

  const onButtonPress = () => {
    navigator.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          loop={false}
          horizontal={true}
          showsPagination={false}
          onIndexChanged={idx => {
            setIndex(idx);
          }}>
          <LandingIdxPage
            LandingImg={LandingImage1}
            titleText={'투자를 쉽게 입문해보세요'}
            description={'모의 실습 투자로 투자에 대한\n부담감을 줄여보세요'}
          />
          <LandingIdxPage
            LandingImg={LandingImage2}
            titleText={'포인트 머니를 모아보세요'}
            description={'포인트 머니를 모아서 여러가지\n상품을 구매해 보세요'}
          />
          <LandingIdxPage
            LandingImg={LandingImage3}
            titleText={'이자도 투자의 일종이에요'}
            description={
              '가상 포인트 머니 통장을 개설하여\n이자를 받는게 가능해요'
            }
          />
          <LandingIdxPage
            LandingImg={LandingImage4}
            titleText={'친구와 협력하고 경쟁하세요'}
            description={
              '친구에게 투자금을 빌려주는것도 가능하고\n서로 금액으로 경쟁하는것도 가능해요'
            }
          />
        </Swiper>
      </View>
      <IndexBars activeIdx={index} marginTop={132} />
      <Button
        text={'시작하기'}
        marginTop={32}
        onPress={onButtonPress}
        size={'mid'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorStyles.defaultWhite,
  },
  swiperContainer: {
    height: 470,
  },
});

export default Landing;
