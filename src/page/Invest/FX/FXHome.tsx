import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import InvestHomeContainer from '../../../components/Invest/InvestHomeContainer';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import FXDetailBtn from '../../../components/Invest/FX/FXDetailBtn';
import moneyFormatter from '../../../util/moneyFormatter';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import CountryIcon from '../../../assets/image/icon/country/CountryIcon';
import {useEffect, useState} from 'react';
import {FxAPI} from '../../../api/fx';

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

interface FXData {
  fxType: 'USD' | 'JPY' | 'EUR' | 'CNH' | 'CHF' | 'GBP';
  price: number;
  buyPrice: number;
  sellPrice: number;
  fluRate: number;
}

const FXHome = () => {
  const navigator = useNavigation<NavigationProp<any>>();
  const [fxData, setFxData] = useState<FXData[]>([]);

  useEffect(() => {
    FxAPI.getFxDataList()
      .then(response => {
        console.log(response.data.data);
        if (response.data) {
          setFxData(response.data.data);
        }
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  const handleDetailBtnPress = (
    fxType: 'USD' | 'JPY' | 'EUR' | 'CNH' | 'CHF' | 'GBP',
    fluRate: number,
  ) => {
    navigator.navigate('FXDetail', {fxType, fluRate});
  };

  return (
    <InvestHomeContainer>
      <Text style={styles.topDescription}>
        {'한국수출입은행에서 외화 가격을 불러오고 있습니다.\n' +
          '외화 가격은 30분 마다 갱신됩니다.'}
      </Text>

      <View style={containerStyles.container}>
        {fxData.map((datum, idx) => {
          return (
            <FXDetailBtn
              key={idx}
              onPress={() => handleDetailBtnPress(datum.fxType, datum.fluRate)}
              country={countryData[datum.fxType]}
              FXName={moneyData[datum.fxType]}
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
