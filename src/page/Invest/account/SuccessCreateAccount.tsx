import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import AccountIcon from '../../../assets/image/icon/AccountIcon.svg';
import {StyleSheet, Text} from 'react-native';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {colorStyles} from '../../../assets/styles/color';
import Button from '../../../components/common/buttons/Button';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const SuccessCreateAccount = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const btnPressEventHandler = () => {
    navigation.navigate('Invest');
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(20)}>
      <BasicHeader text={'신규 통장 개설'} hideArrowBtn />
      <AccountIcon
        width={screenSize.getVH(27.7)}
        height={screenSize.getVH(27.7)}
      />
      <Text style={textStyles.header}>통장이 성공적으로 개설되었습니다!</Text>
      <Text style={textStyles.body}>
        {'예적금 홈에서 해당 계좌를\n확인/해약하실 수 있습니다.'}
      </Text>

      <Button
        size={'large'}
        text={'홈으로 돌아가기'}
        marginTop={screenSize.getVH(16)}
        onPress={btnPressEventHandler}
      />
    </BasicContainer>
  );
};

const textStyles = StyleSheet.create({
  header: {
    marginTop: screenSize.getVH(4.4),
    fontSize: screenSize.getVH(2.7),
    fontFamily: fontStyle.SUIT.Bold,
  },
  body: {
    marginTop: screenSize.getVH(1.6),
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.descriptionGray,
  },
});

export default SuccessCreateAccount;
