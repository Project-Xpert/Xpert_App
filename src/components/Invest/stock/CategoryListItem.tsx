import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {screenSize} from '../../../assets/styles/screenSize';
import StockCategory from '../../../assets/image/icon/stockCategory/StockCategory';

interface ItemProps {
  ranking: number;
  categoryId: string;
  categoryName: string;
  totalStockCnt: number;
  increaseStockCnt: number;
  fluRate: number;
}

const CategoryListItem = (props: ItemProps) => {
  const fluRateStyle = {
    ...textStyles.fluRate,
    color:
      props.fluRate < 0
        ? colorStyles.defaultBlue
        : props.fluRate > 0
        ? colorStyles.defaultRed
        : colorStyles.basicText,
  };

  return (
    <TouchableOpacity style={containerStyles.container}>
      <Text style={textStyles.rankingText}>{props.ranking}</Text>

      <StockCategory
        width={screenSize.getVH(7.2)}
        height={screenSize.getVH(7.2)}
        categoryName={props.categoryId}
      />

      <View style={containerStyles.textContainer}>
        <Text style={textStyles.title}>{props.categoryName}</Text>
        <Text style={textStyles.subTitle}>
          {props.totalStockCnt}개 종목 중 {props.increaseStockCnt}개 상승
        </Text>
      </View>

      <View style={containerStyles.fluDataContainer}>
        <Text style={fluRateStyle}>
          {props.fluRate > 0 && '+'}
          {props.fluRate.toFixed(1)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(2.2),
    flexDirection: 'row',
    alignItems: 'center',
    height: screenSize.getVH(9.5),
  },
  textContainer: {
    marginLeft: screenSize.getVW(2.4),
  },
  fluDataContainer: {
    position: 'absolute',
    right: 0,
    backgroundColor: colorStyles.lightGrayBackGround,
    borderRadius: screenSize.getVH(1.1),
  },
});

const textStyles = StyleSheet.create({
  rankingText: {
    width: screenSize.getVW(5.25),
    color: colorStyles.mainColor,
    fontFamily: fontStyle.SUIT.Bold,
    marginRight: screenSize.getVW(2.4),
    fontSize: screenSize.getVH(2.2),
    textAlign: 'center',
  },
  title: {
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  subTitle: {
    marginTop: screenSize.getVH(0.4),
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.disableGray,
  },
  fluRate: {
    marginVertical: screenSize.getVH(0.5),
    marginHorizontal: screenSize.getVW(2.4),
    fontFamily: fontStyle.SUIT.Bold,
    fontSize: screenSize.getVH(1.6),
  },
});

export default CategoryListItem;
