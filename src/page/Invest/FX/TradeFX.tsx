import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import QuestionBtn from '../../../components/common/buttons/QuestionBtn';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import SmallBtn from '../../../components/common/buttons/SmallBtn';
import {useState} from 'react';
import UnitInput from '../../../components/common/inputs/UnitInput';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {colorStyles} from '../../../assets/styles/color';
import moneyFormatter from '../../../util/moneyFormatter';
import Button from '../../../components/common/buttons/Button';

const mockData = {
  ttb: 1452,
  tts: 1481,
  ownedFX: 1000,
  userMoney: 1000000,
};

const TradeFX = () => {
  const [selectedOption, setSelectedOption] = useState<'toKR' | 'toFX'>('toFX');
  const [value, setValue] = useState<string>('');

  const moneyUnit = selectedOption === 'toFX' ? '달러' : '원';
  const reverseMoneyUnit = selectedOption === 'toFX' ? '원' : '달러';
  const moneyName = selectedOption === 'toFX' ? '미화' : '한화';
  const reverseMoneyName = selectedOption === 'toFX' ? '한화' : '미화';

  const sellPrice = Number(value) * mockData.ttb;
  const buyPrice = Number(value) * mockData.tts;

  const handleOptionChange = (newOption: 'toKR' | 'toFX') => {
    setSelectedOption(newOption);
  };

  const handleInputChange = (value: string) => {
    const newValue = parseInt(value);
    setValue(Number.isNaN(newValue) ? '' : String(newValue));
  };

  const handleSellBtnPress = () => {};

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.2)}>
      <BasicHeader text="외화 환전" />

      <View style={styles.fullWidthContainer}>
        <QuestionBtn text={'왜 외화 가격이 살때와 팔때 다른가요?'} />
      </View>

      <View style={topDescriptionStyles.container}>
        <Text style={topDescriptionStyles.text}>
          현재 1달러당{' '}
          <Text style={highlightColorStyles.text}>
            {`사실땐 ${moneyFormatter(mockData.tts)}원`}
          </Text>
          입니다
        </Text>
        <Text style={topDescriptionStyles.text}>
          현재 1달러당{' '}
          <Text style={highlightColorStyles.text}>
            {`파실땐 ${moneyFormatter(mockData.ttb)}원`}
          </Text>
          입니다
        </Text>
      </View>

      <View style={topButtonsStyles.container}>
        <View style={topButtonsStyles.innerContainer}>
          <SmallBtn
            text={'달러로'}
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
        unit={'달러'}
        value={value}
        onChange={e => handleInputChange(e.nativeEvent.text)}
      />

      <View style={bottomDescriptionStyles.container}>
        <Text style={bottomDescriptionStyles.text}>
          {`${reverseMoneyName} ${moneyFormatter(
            selectedOption === 'toFX' ? mockData.userMoney : mockData.ownedFX,
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
              ? moneyFormatter(value)
              : moneyFormatter(sellPrice)}
            {moneyUnit}
          </Text>
          으로 바꿀게요
        </Text>
      </View>

      <Button
        text={'환전하기'}
        marginTop={screenSize.getVH(40)}
        size={'large'}
        onPress={handleSellBtnPress}
        disable={
          (selectedOption === 'toFX' && buyPrice > mockData.userMoney) ||
          (selectedOption === 'toKR' && Number(value) > mockData.ownedFX) ||
          value === ''
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
