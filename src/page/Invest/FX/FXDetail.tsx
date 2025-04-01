import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import CountryIcon from '../../../assets/image/icon/country/CountryIcon';
import Button from '../../../components/common/buttons/Button';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {colorStyles} from '../../../assets/styles/color';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const FXDetail = () => {
  const navigator = useNavigation<NavigationProp<any>>();

  const handlerBuyButtonPress = () => {
    navigator.navigate('TradeFX');
  };

  const getFluRateColor = (fluRate: number) => {
    return {
      color:
        fluRate > 0
          ? colorStyles.defaultRed
          : fluRate < 0
          ? colorStyles.defaultBlue
          : colorStyles.basicText,
    };
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.2)}>
      <BasicHeader text="외화 상세" />

      <View style={topTitleStyles.container}>
        <CountryIcon
          country={'미국'}
          style={topTitleStyles.icon}
          width={screenSize.getVH(5.5)}
          height={screenSize.getVH(5.5)}
        />
        <Text style={topTitleStyles.text}>미국 달러</Text>
      </View>

      <Text style={priceStyles.title}>
        현재 1달러당 <Text style={highlightColorStyles.text}>1,300원</Text>
      </Text>
      <Text style={priceStyles.description}>
        어제보다 <Text style={getFluRateColor(-0.24)}>-0.24%</Text> 변동했어요
      </Text>

      <View style={bodyStyles.container}>
        <Text style={bodyStyles.text}>
          현재{' '}
          <Text style={highlightColorStyles.text}>10달러 (총 130,000원)을</Text>{' '}
          가지고 있어요
        </Text>
        <Text style={bodyStyles.text}>
          현재 수익률은 <Text style={getFluRateColor(21.3)}>+21.3%</Text>에요
        </Text>
      </View>

      <Button
        text={'환전 하러가기'}
        marginTop={screenSize.getVH(4)}
        size={'mid'}
        onPress={handlerBuyButtonPress}
      />
    </BasicContainer>
  );
};

const topTitleStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    borderRadius: screenSize.getVH(2.2),
  },
  text: {
    marginLeft: screenSize.getVW(3.3),
    fontSize: screenSize.getVH(2.7),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
});

const priceStyles = StyleSheet.create({
  title: {
    marginTop: screenSize.getVH(2.7),
    fontSize: screenSize.getVH(2.7),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  description: {
    marginTop: screenSize.getVH(1),
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
});

const bodyStyles = StyleSheet.create({
  container: {
    width: screenSize.getVW(81),
    height: screenSize.getVH(4.8),
    marginTop: screenSize.getVH(3.3),
    justifyContent: 'space-between',
  },
  text: {
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.SemiBold,
    color: colorStyles.basicText,
  },
});

const highlightColorStyles = StyleSheet.create({
  text: {
    color: colorStyles.mainColor,
  },
});

export default FXDetail;
