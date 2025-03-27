import {StyleSheet, Text, View} from 'react-native';
import moneyFormatter from '../../../util/moneyFormatter';
import {colorStyles} from '../../../assets/styles/color';
import {screenSize} from '../../../assets/styles/screenSize';

interface PriceInfoProps {
  buyPrice: number;
  sellPrice: number;
}

const PriceInfo = (prop: PriceInfoProps) => {
  return (
    <View style={priceDescriptionStyles.container}>
      <Text style={priceDescriptionStyles.text}>
        현재 그람당 평균 매입가는{' '}
        <Text style={highlightedStyles.text}>
          {moneyFormatter(prop.buyPrice)}원{' '}
        </Text>
        입니다
      </Text>
      <Text style={priceDescriptionStyles.text}>
        현재 그람당 평균 매도가는{' '}
        <Text style={highlightedStyles.text}>
          {moneyFormatter(prop.sellPrice)}원{' '}
        </Text>
        입니다
      </Text>
    </View>
  );
};

const priceDescriptionStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(2.2),
    height: screenSize.getVH(4.5),
    width: screenSize.getVW(81),
    justifyContent: 'space-between',
  },
  text: {
    fontSize: screenSize.getVH(1.6),
    color: colorStyles.basicText,
  },
});

const highlightedStyles = StyleSheet.create({
  text: {
    color: colorStyles.mainColor,
  },
});

export default PriceInfo;
