import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import HomeIcon from '../../assets/image/icon/nav/home/HomeIcon';
import InvestIcon from '../../assets/image/icon/nav/invest/InvestIcon';
import NewsIcon from '../../assets/image/icon/nav/news/NewsIcon';
import MypageIcon from '../../assets/image/icon/nav/my/MypageIcon';
import SocialIcon from '../../assets/image/icon/nav/social/SocialIcon';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {colorStyles} from '../../assets/styles/color';

interface navProps {
  pageName: 'Home' | 'Invest' | 'News' | 'Social' | 'Mypage';
}

const BottomNav = (prop: navProps) => {
  const {pageName} = prop;
  const navigator = useNavigation<NavigationProp<any>>();

  const onNavigate = (
    navigateTo: 'Home' | 'Invest' | 'News' | 'Social' | 'Mypage',
  ) => {
    if (navigateTo !== pageName) {
      navigator.navigate(navigateTo);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onNavigate('Home')}>
        <HomeIcon isActivated={pageName == 'Home'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onNavigate('Invest')}>
        <InvestIcon isActivated={pageName == 'Invest'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onNavigate('News')}>
        <NewsIcon isActivated={pageName == 'News'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onNavigate('Social')}>
        <SocialIcon isActivated={pageName == 'Social'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onNavigate('Mypage')}>
        <MypageIcon isActivated={pageName == 'Mypage'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    bottom: 0,
    backgroundColor: colorStyles.defaultWhite,
    width: screenSize.width,
    height: screenSize.getVH(9),
    paddingHorizontal: screenSize.getVW(10.7),
  },
});

export default BottomNav;
