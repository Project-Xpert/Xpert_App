import {ScrollView, StyleSheet, View} from 'react-native';
import StockMenuBtn from '../../../page/Invest/stock/StockMenuBtn';
import {screenSize} from '../../../assets/styles/screenSize';

const StockMenu = () => {
  const onMenuPressHandler = () => {};

  return (
    <ScrollView
      style={scrollMenuStyles.scrollView}
      horizontal
      showsHorizontalScrollIndicator={false}>
      <View style={scrollMenuStyles.innerContainer}>
        <StockMenuBtn
          onPress={onMenuPressHandler}
          text={'고가 종목 순'}
          enabled={true}
        />
        <StockMenuBtn
          onPress={onMenuPressHandler}
          text={'저가 종목 순'}
          enabled={false}
        />
        <StockMenuBtn
          onPress={onMenuPressHandler}
          text={'상승폭 큰 순'}
          enabled={false}
        />
        <StockMenuBtn
          onPress={onMenuPressHandler}
          text={'하락폭 큰 순'}
          enabled={false}
        />
        <StockMenuBtn
          onPress={onMenuPressHandler}
          text={'변동폭 큰 순'}
          enabled={false}
        />
      </View>
    </ScrollView>
  );
};

const scrollMenuStyles = StyleSheet.create({
  scrollView: {
    marginTop: screenSize.getVH(2.2),
  },
  innerContainer: {
    flexDirection: 'row',
  },
});

export default StockMenu;
