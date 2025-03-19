import {ScrollView} from 'react-native-gesture-handler';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BottomNav from '../../../components/common/BottomNav';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import {StyleSheet, Text, View} from 'react-native';
import AccountDetailBtn from '../../../components/Invest/account/AccountDetailBtn';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import UnderBarBtn from '../../../components/common/buttons/UnderBarBtn';
import {useState} from 'react';

interface SearchTagType {
  accountType: 'ALL' | 'Deposit' | 'Savings';
  bankType: 'ALL' | 'First' | 'Second';
}

const CreateAccount = () => {
  const [searchTag, setSearchTag] = useState<SearchTagType>({
    accountType: 'ALL',
    bankType: 'ALL',
  });
  const navigator = useNavigation<NavigationProp<any>>();

  const onUnderbarPress = (
    name: 'accountType' | 'bankType',
    value: 'ALL' | 'First' | 'Second' | 'Deposit' | 'Savings',
  ) => {
    setSearchTag({...searchTag, [name]: value});
  };

  const onDetailBtn = () => {
    navigator.navigate('CreateAccountDetail');
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.3)}>
      <BasicHeader text={'신규 통장 개설'} />
      <Text style={styles.topDescription}>
        {'실제 금융권의 예금/적금 정보를\n실시간으로 반영해오고 있습니다.'}
      </Text>

      <View style={styles.underBarBtnContainer}>
        <UnderBarBtn
          text={'모든 종류'}
          disable={searchTag.accountType !== 'ALL'}
          onPress={() => onUnderbarPress('accountType', 'ALL')}
        />
        <UnderBarBtn
          text={'예금'}
          marginLeft={screenSize.getVW(4.7)}
          disable={searchTag.accountType !== 'Deposit'}
          onPress={() => onUnderbarPress('accountType', 'Deposit')}
        />
        <UnderBarBtn
          text={'적금'}
          marginLeft={screenSize.getVW(4.7)}
          disable={searchTag.accountType !== 'Savings'}
          onPress={() => onUnderbarPress('accountType', 'Savings')}
        />
      </View>

      <View style={styles.underBarBtnContainer}>
        <UnderBarBtn
          text={'모든 은행'}
          disable={searchTag.bankType !== 'ALL'}
          onPress={() => onUnderbarPress('bankType', 'ALL')}
        />
        <UnderBarBtn
          text={'제 1금융권'}
          marginLeft={screenSize.getVW(4.7)}
          disable={searchTag.bankType !== 'First'}
          onPress={() => onUnderbarPress('bankType', 'First')}
        />
        <UnderBarBtn
          text={'제 2금융권'}
          marginLeft={screenSize.getVW(4.7)}
          disable={searchTag.bankType !== 'Second'}
          onPress={() => onUnderbarPress('bankType', 'Second')}
        />
      </View>

      <View style={styles.ScrollViewContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.listContainer}>
            <AccountDetailBtn
              name={'신한은행 예금통장'}
              subDescription={'# 취업시켜줘 # 제발'}
              onPress={onDetailBtn}
            />
            <AccountDetailBtn
              name={'신한은행 예금통장'}
              subDescription={'# 취업시켜줘 # 제발'}
              onPress={onDetailBtn}
            />
            <AccountDetailBtn
              name={'신한은행 예금통장'}
              subDescription={'# 취업시켜줘 # 제발'}
              onPress={onDetailBtn}
            />
            <AccountDetailBtn
              name={'신한은행 예금통장'}
              subDescription={'# 취업시켜줘 # 제발'}
              onPress={onDetailBtn}
            />
            <AccountDetailBtn
              name={'신한은행 예금통장'}
              subDescription={'# 취업시켜줘 # 제발'}
              onPress={onDetailBtn}
            />
            <AccountDetailBtn
              name={'신한은행 예금통장'}
              subDescription={'# 취업시켜줘 # 제발'}
              onPress={onDetailBtn}
            />
          </View>
        </ScrollView>
      </View>

      <BottomNav pageName={'Invest'} />
    </BasicContainer>
  );
};

const styles = StyleSheet.create({
  topDescription: {
    width: screenSize.getVW(80),
    fontSize: screenSize.getVH(1.6),
    lineHeight: screenSize.getVH(2.7),
    color: colorStyles.descriptionGray,
    fontFamily: fontStyle.SUIT.Medium,
    marginBottom: screenSize.getVH(1.1),
  },
  underBarBtnContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colorStyles.defaultWhite,
    marginTop: screenSize.getVH(1.6),
  },
  ScrollViewContainer: {
    height: screenSize.getVH(55),
    width: screenSize.width,
  },
  scrollView: {
    marginTop: screenSize.getVH(3.3),
    width: screenSize.width,
  },
  listContainer: {
    width: screenSize.width,
    alignItems: 'center',
  },
});

export default CreateAccount;
