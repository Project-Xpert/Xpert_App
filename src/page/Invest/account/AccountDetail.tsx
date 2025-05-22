import {useEffect, useState} from 'react';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import Button from '../../../components/common/buttons/Button';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import {View, Text, StyleSheet} from 'react-native';
import BankLogo from '../../../assets/image/icon/bankLogo/BankLogo';
import moneyFormatter from '../../../util/moneyFormatter';
import {AccountAPI} from '../../../api/account';
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

const interestType = {
  SIMPLE: '단리',
  COMPOUND: '복리',
};

const AccountDetail = ({route}: any) => {
  const navigator = useNavigation<NavigationProp<any>>();
  const accountId = route.params.accountId;
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [data, setData] = useState<DataInterface>({
    productName: '',
    companyName: '',
    money: 0,
    interestType: 'SIMPLE',
    accountType: 'DEPOSIT',
    rate: 0,
    autoTransfer: false,
    autoTransferAmount: 0,
    expirePeriod: 0,
  });

  useEffect(() => {
    AccountAPI.getAccountDetail(accountId)
      .then(response => {
        setData(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const deleteBtnPressHandler = () => {
    setShowDeleteAccountModal(true);
  };

  const deleteAccountEventHandler = () => {};

  const cancelDeletingAccountEventHandler = () => {
    setShowDeleteAccountModal(false);
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.3)}>
      <CheckModal
        visible={showDeleteAccountModal}
        title={'통장 해지'}
        description={
          '해지한 통장은 다시 복구할 수 없으며,\n적립된 금액은 즉시 지급됩니다'
        }
        cancelText={'돌아가기'}
        cancelFunc={cancelDeletingAccountEventHandler}
        submitText={'해지하기'}
        submitFunc={deleteAccountEventHandler}
      />

      <BasicHeader text={'통장 정보'} />

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

      <View style={styles.bodyContainer}>
        <Text style={styles.body}>
          해당 계좌에 {moneyFormatter(data.money)}원 예치되어 있어요.
        </Text>
      </View>

      <View style={styles.bodyContainer}>
        <Text style={styles.body}>
          단리/복리 종류 : {interestType[data.interestType]}
        </Text>
        <Text style={styles.body}>{`연이자율 : ${data.rate}%`}</Text>
        <Text style={styles.body}>{`만기일 : ${data.expirePeriod}주 뒤`}</Text>
      </View>

      {data.accountType === 'FREE_SAVINGS' && (
        <Button
          text={'자동이체 설정'}
          marginTop={screenSize.getVH(40.3)}
          size={'mid'}
          onPress={() => {
            navigator.navigate('AutoTransferSetting', {data});
          }}
        />
      )}
      <Button
        text={'통장 해지'}
        marginTop={screenSize.getVH(
          data.accountType !== 'FREE_SAVINGS' ? 48 : 1.2,
        )}
        size={'mid'}
        onPress={deleteBtnPressHandler}
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
  icon: {
    width: screenSize.getVH(8.3),
    height: screenSize.getVH(8.3),
    borderRadius: screenSize.getVH(2.2),
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
  bodyContainer: {
    marginTop: screenSize.getVH(1.7),
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

export default AccountDetail;
