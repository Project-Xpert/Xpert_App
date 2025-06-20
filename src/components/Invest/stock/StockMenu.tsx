import {ScrollView, StyleSheet, View} from 'react-native';
import StockMenuBtn from '../../../page/Invest/stock/StockMenuBtn';
import {screenSize} from '../../../assets/styles/screenSize';

interface menuProps {
  selectedIdx: number;
  onPressHandler: (idx: number) => void;
}

const StockMenu = (props: menuProps) => {
  return (
    <ScrollView
      style={scrollMenuStyles.scrollView}
      horizontal
      showsHorizontalScrollIndicator={false}>
      <View style={scrollMenuStyles.innerContainer}>
        <StockMenuBtn
          onPress={() => props.onPressHandler(0)}
          text={'고가 종목 순'}
          enabled={props.selectedIdx === 0}
        />
        <StockMenuBtn
          onPress={() => props.onPressHandler(1)}
          text={'저가 종목 순'}
          enabled={props.selectedIdx === 1}
        />
        <StockMenuBtn
          onPress={() => props.onPressHandler(2)}
          text={'상승폭 큰 순'}
          enabled={props.selectedIdx === 2}
        />
        <StockMenuBtn
          onPress={() => props.onPressHandler(3)}
          text={'하락폭 큰 순'}
          enabled={props.selectedIdx === 3}
        />
        <StockMenuBtn
          onPress={() => props.onPressHandler(4)}
          text={'변동폭 큰 순'}
          enabled={props.selectedIdx === 4}
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
