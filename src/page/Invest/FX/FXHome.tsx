import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import InvestHomeContainer from '../../../components/Invest/InvestHomeContainer';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import FXDetailBtn from '../../../components/Invest/FX/FXDetailBtn';
import moneyFormatter from '../../../util/moneyFormatter';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import CountryIcon from '../../../assets/image/icon/country/CountryIcon';

const mockData = [
  {
    country: '미국',
    FXName: '달러',
    price: 10000,
    fluRate: 320,
  },
  {
    country: '스위스',
    FXName: '프랑',
    price: 10000,
    fluRate: -320,
  },
  {
    country: '유럽',
    FXName: '유로',
    price: 10000,
    fluRate: 0,
  },
  {
    country: '일본',
    FXName: '엔',
    price: 10000,
    fluRate: 320,
  },
  {
    country: '영국',
    FXName: '파운드',
    price: 10000,
    fluRate: 320,
  },
  {
    country: '중국',
    FXName: '위안',
    price: 10000,
    fluRate: 320,
  },
];

const FXHome = () => {
  const navigator = useNavigation<NavigationProp<any>>();

  const handleDetailBtnPress = () => {
    navigator.navigate('FXDetail');
  };

  return (
    <InvestHomeContainer>
      <Text style={styles.topDescription}>
        {'한국수출입은행에서 외화 가격을 불러오고 있습니다.\n' +
          '외화 가격은 매일 오전 6시에 갱신됩니다.'}
      </Text>

      <View style={containerStyles.container}>
        {mockData.map((datum, idx) => {
          return (
            <FXDetailBtn
              key={idx}
              onPress={handleDetailBtnPress}
              country={datum.country}
              FXName={datum.FXName}
              price={moneyFormatter(datum.price)}
              fluRate={datum.fluRate}
              CountryIcon={CountryIcon}
            />
          );
        })}
      </View>
    </InvestHomeContainer>
  );
};

const styles = StyleSheet.create({
  topDescription: {
    width: screenSize.getVW(80),
    fontSize: screenSize.getVH(1.6),
    lineHeight: screenSize.getVH(2.7),
    color: colorStyles.descriptionGray,
    fontFamily: fontStyle.SUIT.Medium,
  },
});

const containerStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(1.1),
  },
});

export default FXHome;
