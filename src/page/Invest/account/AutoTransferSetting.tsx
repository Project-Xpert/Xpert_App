import {
  View,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import BankLogo from '../../../assets/image/icon/bankLogo/BankLogo';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import UnitInput from '../../../components/common/inputs/UnitInput';
import CheckBox from '../../../components/common/buttons/Checkbox';
import {useState} from 'react';
import Button from '../../../components/common/buttons/Button';
import CheckModal from '../../../components/modal/CheckModal';
import {useNavigation, NavigationProp} from '@react-navigation/native';

interface DataInterface {
  productName: string;
  companyName: string;
  money: number;
  interestType: 'SIMPLE' | 'COMPOUND';
  accountType: 'FIXED_SAVINGS' | 'FREE_SAVINGS' | 'DEPOSIT';
  rate: number;
  autoTransferAmount: number;
  autoTransfer: boolean;
  expirePeriod: number;
}

const accountType = {
  FIXED_SAVINGS: '정액적립식적금통장',
  FREE_SAVINGS: '자유적립식적금통장',
  DEPOSIT: '정기예금통장',
};

const AutoTransferSetting = ({route}: any) => {
  const data: DataInterface = route.params.data;
  const navigator = useNavigation<NavigationProp<any>>();
  const [autoTransfer, setAutoTransfer] = useState(data.autoTransfer);
  const [autoTransferAmount, setAutoTransferAmount] = useState(
    data.autoTransferAmount,
  );
  const [showModal, setShowModal] = useState(false);

  const goBackBtnPress = () => {
    if (
      autoTransferAmount != data.autoTransferAmount ||
      autoTransfer != data.autoTransfer
    ) {
      setShowModal(true);
    } else {
      navigator.goBack();
    }
  };

  const handleCheckBoxPress = () => {
    setAutoTransfer(prev => !prev);
  };

  const handleAutoTransferAmountChangeHandler = (value: string) => {
    setAutoTransferAmount(Number(value));
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.3)}>
      <CheckModal
        visible={showModal}
        title={'경고'}
        description={
          '저장되지 않은 변경된 사항이 있습니다\n정말 저장하지 않은 상태로 나가시겠습니까?'
        }
        cancelText={'취소'}
        cancelFunc={() => setShowModal(false)}
        submitText={'확인'}
        submitFunc={() => {
          setShowModal(false);
          navigator.goBack();
        }}
      />

      <BasicHeader
        text={'자동이체 설정'}
        doNotGoBack
        goBackFunc={goBackBtnPress}
      />

      <View style={styles.topDescription}>
        <BankLogo
          bank={data.companyName}
          width={screenSize.getVH(5.5)}
          height={screenSize.getVH(5.5)}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.header1}>{data.companyName}</Text>
          <Text style={styles.header2}>{accountType[data.accountType]}</Text>
        </View>
      </View>

      <UnitInput
        unit={'원'}
        marginTop={screenSize.getVH(2.7)}
        value={autoTransferAmount ? String(autoTransferAmount) : ''}
        placeholder={'자동 입금할 금액을 적어주세요'}
        onChange={e => {
          handleAutoTransferAmountChangeHandler(e.nativeEvent.text);
        }}
      />

      <CheckBox
        enabled={autoTransfer}
        text={'매주 이 금액으로 자동 입금할까요?'}
        onPress={handleCheckBoxPress}
      />

      <Button
        text={'이채정보 수정'}
        marginTop={screenSize.getVH(51)}
        size={'large'}
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </BasicContainer>
  );
};

const styles = StyleSheet.create({
  topDescription: {
    width: screenSize.getVW(78.5),
    height: screenSize.getVH(8.3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: {
    height: screenSize.getVH(4.4),
    justifyContent: 'space-between',
    marginLeft: screenSize.getVW(2.3),
  },
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
});

export default AutoTransferSetting;
