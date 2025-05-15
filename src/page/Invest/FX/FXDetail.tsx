import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import CountryIcon from '../../../assets/image/icon/country/CountryIcon';
import Button from '../../../components/common/buttons/Button';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {colorStyles} from '../../../assets/styles/color';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {FxAPI} from '../../../api/fx';
import moneyFormatter from '../../../util/moneyFormatter';

const countryData = {
  USD: '미국',
  JPY: '일본',
  EUR: '유럽',
  CNH: '중국',
  CHF: '스위스',
  GBP: '영국',
};

const moneyData = {
  USD: '달러',
  JPY: '엔',
  EUR: '유로',
  CNH: '위안',
  CHF: '프랑',
  GBP: '파운드',
};

interface FxDetail {
  sellPrice: number;
  buyPrice: number;
  price: number;
  amount: number;
  sumOfBuy: number;
}

const basicFxDetailData: FxDetail = {
  sellPrice: 0,
  buyPrice: 0,
  price: 0,
  amount: 0,
  sumOfBuy: 0,
};

const FXDetail = ({route}: any) => {
  const navigator = useNavigation<NavigationProp<any>>();
  const [fxDetail, setFxDetail] = useState<FxDetail>(basicFxDetailData);
  const fxType: 'USD' | 'JPY' | 'EUR' | 'CNH' | 'CHF' | 'GBP' =
    route.params.fxType;
  const standardFxAmount = fxType === 'JPY' ? 100 : 1;
  const fluRate = route.params.fluRate;

  const totalPrice = (fxDetail.amount / standardFxAmount) * fxDetail.price;
  const avgPrice =
    Math.round(fxDetail.sumOfBuy / (fxDetail.amount / standardFxAmount)) || 0;
  const profitRate =
    Number(
      (((totalPrice - fxDetail.sumOfBuy) / fxDetail.sumOfBuy) * 100).toFixed(2),
    ) || 0;

  useEffect(() => {
    FxAPI.getFxDetail(fxType)
      .then(response => {
        if (response.data) {
          setFxDetail(response.data);
        }
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  const handlerBuyButtonPress = () => {
    navigator.navigate('TradeFX', {fxType});
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
          country={countryData[fxType]}
          style={topTitleStyles.icon}
          width={screenSize.getVH(5.5)}
          height={screenSize.getVH(5.5)}
        />
        <Text style={topTitleStyles.text}>
          {`${countryData[fxType]} ${moneyData[fxType]}`}
        </Text>
      </View>

      <Text style={priceStyles.title}>
        {`현재 ${standardFxAmount}${moneyData[fxType]}당 `}
        <Text style={highlightColorStyles.text}>{`${moneyFormatter(
          fxDetail.price,
        )}원`}</Text>
      </Text>
      <Text style={priceStyles.description}>
        어제보다 <Text style={getFluRateColor(fluRate)}>{`${fluRate}%`}</Text>{' '}
        변동했어요
      </Text>

      <View style={bodyStyles.container}>
        <Text style={bodyStyles.text}>
          현재{' '}
          <Text style={highlightColorStyles.text}>
            {`${moneyFormatter(fxDetail.amount)}${
              moneyData[fxType]
            } (총 ${moneyFormatter(totalPrice)}원)을`}
          </Text>{' '}
          가지고 있어요
        </Text>
        <Text style={bodyStyles.text}>
          평균{' '}
          <Text style={highlightColorStyles.text}>
            {moneyFormatter(avgPrice)}
          </Text>
          원에 사셨고, 현재 {standardFxAmount}
          {moneyData[fxType]}당{' '}
          <Text style={highlightColorStyles.text}>
            {moneyFormatter(fxDetail.price)}
          </Text>
          원이에요,
        </Text>
        <Text style={bodyStyles.text}>
          현재 수익률은{' '}
          <Text style={getFluRateColor(profitRate)}>{profitRate}%</Text>에요
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
    height: screenSize.getVH(7.2),
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
