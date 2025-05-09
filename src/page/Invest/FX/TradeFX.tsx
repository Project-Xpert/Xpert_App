import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import QuestionBtn from '../../../components/common/buttons/QuestionBtn';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import SmallBtn from '../../../components/common/buttons/SmallBtn';
import {useEffect, useState} from 'react';
import UnitInput from '../../../components/common/inputs/UnitInput';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {colorStyles} from '../../../assets/styles/color';
import moneyFormatter from '../../../util/moneyFormatter';
import Button from '../../../components/common/buttons/Button';
import {FxAPI} from '../../../api/fx';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const moneyData = {
  USD: '달러',
  JPY: '엔',
  EUR: '유로',
  CNH: '위안',
  CHF: '프랑',
  GBP: '파운드',
};

const moneyNameData = {
  USD: '미화',
  JPY: '엔화',
  EUR: '유로화',
  CNH: '위안화',
  CHF: '프랑화',
  GBP: '파운드화',
};

interface TradeData {
  ttb: number;
  tts: number;
  ownedFx: number;
  userMoney: number;
}

const TradeFX = ({route}: any) => {
  const navigator = useNavigation<NavigationProp<any>>();
  const fxType: 'USD' | 'JPY' | 'EUR' | 'CNH' | 'CHF' | 'GBP' =
    route.params.fxType;
  const standardFxAmount = fxType === 'JPY' ? 100 : 1;
  const [fxTradeData, setFxTradeData] = useState<TradeData>({
    ttb: 0,
    tts: 0,
    ownedFx: 0,
    userMoney: 0,
  });

  const [selectedOption, setSelectedOption] = useState<'toKR' | 'toFX'>('toFX');
  const [value, setValue] = useState<string>('');

  const moneyUnit = selectedOption === 'toFX' ? moneyData[fxType] : '원';
  const reverseMoneyUnit = selectedOption === 'toFX' ? '원' : moneyData[fxType];
  const moneyName = selectedOption === 'toFX' ? moneyNameData[fxType] : '한화';
  const reverseMoneyName =
    selectedOption === 'toFX' ? '한화' : moneyNameData[fxType];

  const sellPrice = (Number(value) / standardFxAmount) * fxTradeData.ttb;
  const buyPrice = (Number(value) / standardFxAmount) * fxTradeData.tts;

  useEffect(() => {
    FxAPI.getFxTradeData(fxType)
      .then(response => {
        const {buyPrice, sellPrice, ownedFx, userMoney} = response.data;

        setFxTradeData({
          ttb: sellPrice,
          tts: buyPrice,
          ownedFx,
          userMoney,
        });
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  const handleOptionChange = (newOption: 'toKR' | 'toFX') => {
    setSelectedOption(newOption);
  };

  const handleInputChange = (value: string) => {
    const newValue = parseInt(value);
    setValue(Number.isNaN(newValue) ? '' : String(newValue));
  };

  const handleBuySellBtnPress = () => {
    if (selectedOption == 'toFX') {
      FxAPI.buyFx({type: fxType, amount: Number(value) / standardFxAmount})
        .then(response => {
          navigator.navigate('Invest');
        })
        .catch(e => {
          console.error(e);
        });
    } else {
    }
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.2)}>
      <BasicHeader text="외화 환전" />

      <View style={styles.fullWidthContainer}>
        <QuestionBtn text={'왜 외화 가격이 살때와 팔때 다른가요?'} />
      </View>

      <View style={topDescriptionStyles.container}>
        <Text style={topDescriptionStyles.text}>
          현재 {standardFxAmount}
          {moneyData[fxType]}당{' '}
          <Text style={highlightColorStyles.text}>
            {`사실땐 ${moneyFormatter(fxTradeData.tts)}원`}
          </Text>
          입니다
        </Text>
        <Text style={topDescriptionStyles.text}>
          현재 {standardFxAmount}
          {moneyData[fxType]}당{' '}
          <Text style={highlightColorStyles.text}>
            {`파실땐 ${moneyFormatter(fxTradeData.ttb)}원`}
          </Text>
          입니다
        </Text>
      </View>

      <View style={topButtonsStyles.container}>
        <View style={topButtonsStyles.innerContainer}>
          <SmallBtn
            text={`${moneyData[fxType]}${
              fxType == 'JPY' || fxType == 'CNH' || fxType == 'CHF'
                ? '으로'
                : '로'
            }`}
            selected={selectedOption === 'toFX'}
            onClick={() => handleOptionChange('toFX')}
          />
          <SmallBtn
            text={'한화로'}
            selected={selectedOption === 'toKR'}
            onClick={() => handleOptionChange('toKR')}
          />
        </View>
      </View>

      <UnitInput
        marginTop={screenSize.getVH(2.6)}
        placeholder={'얼마를 환전할까요?'}
        unit={moneyData[fxType]}
        value={value}
        onChange={e => handleInputChange(e.nativeEvent.text)}
      />

      <View style={bottomDescriptionStyles.container}>
        <Text style={bottomDescriptionStyles.text}>
          {`${reverseMoneyName} ${moneyFormatter(
            selectedOption === 'toFX'
              ? fxTradeData.userMoney
              : fxTradeData.ownedFx,
          )}${reverseMoneyUnit} 중에 `}
          {selectedOption === 'toFX'
            ? moneyFormatter(buyPrice)
            : moneyFormatter(value)}
          {`${reverseMoneyUnit}(을)를`}
        </Text>
        <Text style={bottomDescriptionStyles.text}>
          {moneyName}{' '}
          <Text style={highlightColorStyles.text}>
            {selectedOption === 'toFX'
              ? moneyFormatter(value !== '' ? value : 0)
              : moneyFormatter(sellPrice)}
            {moneyUnit}
          </Text>
          {fxType == 'JPY' ||
          fxType == 'CNH' ||
          fxType == 'CHF' ||
          moneyUnit == '원'
            ? '으로'
            : '로'}{' '}
          바꿀게요
        </Text>
      </View>

      <Button
        text={'환전하기'}
        marginTop={screenSize.getVH(40)}
        size={'large'}
        onPress={handleBuySellBtnPress}
        disable={
          (selectedOption === 'toFX' && buyPrice > fxTradeData.userMoney) ||
          (selectedOption === 'toKR' && Number(value) > fxTradeData.ownedFx) ||
          Number(value) % standardFxAmount !== 0 ||
          Number(value) < 1
        }
      />
    </BasicContainer>
  );
};

const styles = StyleSheet.create({
  fullWidthContainer: {
    width: screenSize.getVW(81),
  },
});

const topDescriptionStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(2.2),
    width: screenSize.getVW(81),
    height: screenSize.getVH(4.5),
    justifyContent: 'space-between',
  },
  text: {
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.basicText,
  },
});

const topButtonsStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(2.2),
    width: screenSize.getVW(82),
  },
  innerContainer: {
    flexDirection: 'row',
    width: screenSize.getVW(38.8),
    justifyContent: 'space-between',
  },
});

const bottomDescriptionStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(1.1),
    width: screenSize.getVW(81),
    height: screenSize.getVH(4.5),
    justifyContent: 'space-between',
  },
  text: {
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.basicText,
  },
});

const highlightColorStyles = StyleSheet.create({
  text: {
    color: colorStyles.mainColor,
  },
});

export default TradeFX;
