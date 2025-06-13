import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import {StyleSheet} from 'react-native';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {colorStyles} from '../../../assets/styles/color';
import useUserData from '../../../data/userData';
import moneyFormatter from '../../../util/moneyFormatter';
import UnitInput from '../../../components/common/inputs/UnitInput';
import {useState} from 'react';
import Button from '../../../components/common/buttons/Button';
import {FriendAPI} from '../../../api/friend';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const SendMoney = ({route}: any) => {
  const {money} = useUserData();
  const {userId, username} = route.params;
  const navigation = useNavigation<NavigationProp<any>>();

  const [sendMoneyAmount, setSendMoneyAmount] = useState(0);

  const onMoneyChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (!isNaN(parseInt(e.nativeEvent.text))) {
      setSendMoneyAmount(parseInt(e.nativeEvent.text));
    } else if (e.nativeEvent.text === '') {
      setSendMoneyAmount(0);
    }
  };

  const sendMoneyHandler = () => {
    FriendAPI.sendMoney(userId, {money: sendMoneyAmount})
      .then(response => {
        navigation.navigate('Social');
        navigation.navigate('Friend');
        navigation.navigate('FriendDetail', {userId, username});
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.2)}>
      <BasicHeader text={'송금'} />

      <Text style={textStyles.title}>
        <Text style={textStyles.highlight}>{username}</Text>님에게
        {'\n'}얼마를 송금할까요?
      </Text>
      <Text style={textStyles.description}>
        현재 송금 가능 금액은 {moneyFormatter(money)}원이에요
      </Text>

      <UnitInput
        marginTop={screenSize.getVH(2.7)}
        placeholder={'금액을 입력해주세요'}
        unit={'원'}
        value={sendMoneyAmount === 0 ? '' : String(sendMoneyAmount)}
        onChange={onMoneyChange}
      />

      <Button
        text={'송금하기'}
        marginTop={screenSize.getVH(52)}
        size={'large'}
        onPress={sendMoneyHandler}
        disable={sendMoneyAmount === 0 || sendMoneyAmount > money}
      />
    </BasicContainer>
  );
};

const textStyles = StyleSheet.create({
  title: {
    marginTop: screenSize.getVH(2.2),
    width: screenSize.getVW(82),
    color: colorStyles.basicText,
    fontSize: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Medium,
  },
  description: {
    marginTop: screenSize.getVH(1.3),
    width: screenSize.getVW(82),
    color: colorStyles.descriptionGray,
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Medium,
  },
  highlight: {
    color: colorStyles.mainColor,
    fontFamily: fontStyle.SUIT.Bold,
  },
});

export default SendMoney;
