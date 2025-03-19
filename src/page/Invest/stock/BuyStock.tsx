import {ScrollView, Text} from 'react-native-gesture-handler';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BottomNav from '../../../components/common/BottomNav';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import StockDetailBtn from '../../../components/Invest/stock/StockDetailBtn';
import {StyleSheet, View} from 'react-native';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {colorStyles} from '../../../assets/styles/color';
import UnderBarBtn from '../../../components/common/buttons/UnderBarBtn';
import {useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const BuyStock = () => {
  const navigator = useNavigation<NavigationProp<any>>();
  const [stockType, setStockType] = useState<'KOSPI' | 'NASDAQ'>('NASDAQ');

  const onStockDetailBtnPress = () => {
    navigator.navigate('BuyStockDetail');
  };

  const onClick = (newStockType: 'KOSPI' | 'NASDAQ') => {
    setStockType(() => newStockType);
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.3)}>
      <BasicHeader text={'주식 구매'} />
      <Text style={styles.topDescription}>
        한국투자증권의 실시간 데이터를 받아오고 있습니다.
      </Text>

      <View style={styles.topSelectBarContainer}>
        <UnderBarBtn
          text={'해외주식'}
          disable={stockType !== 'NASDAQ'}
          onPress={() => onClick('NASDAQ')}
        />
        <View style={{marginLeft: screenSize.getVW(3)}}>
          <UnderBarBtn
            text={'국내주식'}
            disable={stockType !== 'KOSPI'}
            onPress={() => onClick('KOSPI')}
          />
        </View>
      </View>

      <View style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.buttonContainer}>
            <StockDetailBtn onPress={onStockDetailBtnPress} />
          </View>
        </ScrollView>
      </View>
      <BottomNav pageName={'Invest'} />
    </BasicContainer>
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
  topSelectBarContainer: {
    flexDirection: 'row',
    marginTop: screenSize.getVH(3.3),
    paddingBottom: screenSize.getVH(3.3),
    width: screenSize.getVW(80),
    backgroundColor: colorStyles.defaultWhite,
  },
  scrollViewContainer: {
    height: screenSize.getVH(56.5),
    width: screenSize.width,
  },
  scrollView: {
    width: screenSize.width,
  },
  buttonContainer: {
    width: screenSize.width,
    alignItems: 'center',
  },
});

export default BuyStock;
