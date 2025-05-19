import {View, Text, StyleSheet} from 'react-native';
import BankLogo from '../../../assets/image/icon/bankLogo/BankLogo';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import Button from '../../../components/common/buttons/Button';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import UnitInput from '../../../components/common/inputs/UnitInput';
import {useState} from 'react';
import CheckBox from '../../../components/common/buttons/Checkbox';

interface SavingItem {
  companyName: string;
  productName: string;
  type: string;
  saveType: string;
  rate: number;
  period: number;
}

const CreateSavingDetail = ({route}: any) => {
  const data: SavingItem = route.params.data;
  const navigation = useNavigation<NavigationProp<any>>();
  const [money, setMoney] = useState(0);
  const [checkBoxState, setCheckBoxState] = useState(true);

  const inputChangeHandler = (value: string) => {
    setMoney(isNaN(Number(value)) ? 0 : Number(value));
  };

  const handleCheckBoxPress = () => {
    setCheckBoxState(prev => !prev);
  };

  const createAccountHandler = () => {
    navigation.navigate('SuccessCreateAccount');
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.3)}>
      <BasicHeader text={'신규 통장 개설'} />

      <View style={styles.topDescription}>
        <BankLogo
          bank={data.companyName}
          width={screenSize.getVH(5.5)}
          height={screenSize.getVH(5.5)}
        />
        <View style={styles.headerTextContainer}>
          <Text style={textStyles.header1}>{`${data.companyName}`}</Text>
          <Text style={textStyles.header2}>{`${data.saveType}적금통장`}</Text>
        </View>
      </View>

      <Text style={textStyles.title}>{data.productName}</Text>

      <View style={styles.bodyContainer}>
        <Text style={textStyles.body}>
          {`단리/복리 여부 : ${data.type} 적금`}
        </Text>
        <Text style={textStyles.body}>{`연이자율 : ${data.rate}%`}</Text>
        <Text style={textStyles.body}>{`만기일 : ${data.period}주 뒤`}</Text>
      </View>

      <UnitInput
        unit={'원'}
        marginTop={screenSize.getVH(2.7)}
        value={money ? String(money) : ''}
        placeholder={
          data.saveType === '정액적립식'
            ? '정기 적금 금액을 적어주세요'
            : '초기 금액을 입력해주세요'
        }
        onChange={e => {
          inputChangeHandler(e.nativeEvent.text);
        }}
      />

      {data.saveType !== '정액적립식' && (
        <CheckBox
          enabled={checkBoxState}
          text={'매주 이 금액으로 자동 입금할까요?'}
          onPress={handleCheckBoxPress}
        />
      )}

      <Button
        size={'large'}
        text={'통장 개설하기'}
        disable={String(money) === '0'}
        marginTop={screenSize.getVH(data.saveType === '정액적립식' ? 37 : 33)}
        onPress={createAccountHandler}
      />
    </BasicContainer>
  );
};

export default CreateSavingDetail;

const styles = StyleSheet.create({
  topDescription: {
    width: screenSize.getVW(78.5),
    height: screenSize.getVH(5.5),
    flexDirection: 'row',
  },
  headerTextContainer: {
    height: screenSize.getVH(4.4),
    justifyContent: 'space-between',
    marginLeft: screenSize.getVW(2.3),
  },
  bodyContainer: {
    marginTop: screenSize.getVH(2.7),
    width: screenSize.getVW(78.5),
  },
});

const textStyles = StyleSheet.create({
  header1: {
    fontSize: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  header2: {
    fontSize: screenSize.getVH(1.7),
    fontFamily: fontStyle.SUIT.SemiBold,
    color: colorStyles.descriptionGray,
  },
  title: {
    marginTop: screenSize.getVH(3.3),
    width: screenSize.getVW(78.5),
    fontSize: screenSize.getVH(2.7),
    fontFamily: fontStyle.SUIT.ExtraBold,
    color: colorStyles.basicText,
  },
  body: {
    marginTop: screenSize.getVH(1.1),
    width: screenSize.getVW(75),
    fontSize: screenSize.getVH(1.6),
    lineHeight: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.basicText,
  },
});
