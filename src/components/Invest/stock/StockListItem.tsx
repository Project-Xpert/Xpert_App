import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import moneyFormatter from '../../../util/moneyFormatter';
import BookmarkDisabled from '../../../assets/image/icon/button/bookmarkDisabled.svg';
import BookmarkEnabled from '../../../assets/image/icon/button/bookmarkEnabled.svg';
import {screenSize} from '../../../assets/styles/screenSize';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import getStockIcon from '../../../assets/image/icon/stockLogo/StockLogo';

interface ItemProps {
  ranking: number;
  stockName: string;
  stockId: string;
  price: number;
  fluRate: number;
  isBookmarked: boolean;
  onPress: () => void;
}

const StockListItem = (props: ItemProps) => {
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
    <TouchableOpacity style={containerStyles.container} onPress={props.onPress}>
      <Text style={textStyles.rankingText}>{props.ranking}</Text>

      <Image
        style={imageStyles.companyIcon}
        src={getStockIcon(props.stockId)}
      />

      <View style={containerStyles.textOuterContainer}>
        <View style={containerStyles.textInnerContainer}>
          <Text style={textStyles.companyName}>{props.stockName}</Text>
          <Text style={textStyles.companyId}>({props.stockId})</Text>
        </View>
        <View style={containerStyles.textInnerContainer}>
          <Text style={textStyles.stockPrice}>
            {moneyFormatter(props.price)}원
          </Text>
          <Text style={fluRateStyle}>
            {props.fluRate > 0 && '+'}
            {props.fluRate.toFixed(1)}%
          </Text>
        </View>
      </View>

      <TouchableOpacity style={imageStyles.bookmarkIcon}>
        {props.isBookmarked ? (
          <BookmarkEnabled
            width={screenSize.getVH(2.7)}
            height={screenSize.getVH(2.7)}
          />
        ) : (
          <BookmarkDisabled
            width={screenSize.getVH(2.7)}
            height={screenSize.getVH(2.7)}
          />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(1.6),
    height: screenSize.getVH(7.2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textOuterContainer: {
    marginLeft: screenSize.getVW(4.25),
  },
  textInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const textStyles = StyleSheet.create({
  rankingText: {
    width: screenSize.getVW(5.25),
    color: colorStyles.mainColor,
    fontFamily: fontStyle.SUIT.Bold,
    fontSize: screenSize.getVH(2.2),
    textAlign: 'center',
  },
  companyName: {
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  companyId: {
    marginLeft: screenSize.getVW(1.2),
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.disableGray,
  },
  stockPrice: {
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  fluRate: {
    marginLeft: screenSize.getVW(1.2),
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Bold,
  },
});

const imageStyles = StyleSheet.create({
  companyIcon: {
    width: screenSize.getVH(5),
    height: screenSize.getVH(5),
    borderRadius: screenSize.getVH(2.2),
    marginLeft: screenSize.getVW(2.3),
  },
  bookmarkIcon: {
    position: 'absolute',
    right: 0,
  },
});

export default StockListItem;
