import BasicHeader from '../../components/common/headers/BasicHeader';
import BasicContainer from '../../components/common/BasicContainer';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {fontStyle} from '../../assets/styles/fontStyles';
import {colorStyles} from '../../assets/styles/color';
import Button from '../../components/common/buttons/Button';
import BasicInput from '../../components/common/inputs/BasicInput';
import PasswordInput from '../../components/common/inputs/PasswordInput';
import SocialLoginBtn from '../../components/Login/SocialLogin';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import LoginIdIcon from '../../assets/image/icon/input/loginId/LoginIdIcon';

const Login = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [data, setData] = useState({userId: '', password: ''});

  const onDataChange = (name: string, value: string) => {
    setData({...data, [name]: value});
  };

  const onLoginBtnPress = () => {};

  const onSignupBtnPress = () => {
    navigation.navigate('Signup');
  };

  return (
    <BasicContainer paddingTop={140}>
      <BasicHeader text={'로그인'} />
      <Text style={styles.title}>
        <Text style={styles.highlightedTitle}>투자의 고수가 </Text>
        {'되실\n준비가 되었나요?'}
      </Text>
      <Text style={styles.description}>
        지금 바로 Xpert와 투자를 시작해봅시다!
      </Text>

      <BasicInput
        value={data.userId}
        marginTop={40}
        placeHolder={'로그인 아이디를 입력해주세요'}
        onChange={e => onDataChange('userId', e.nativeEvent.text)}
        Icon={LoginIdIcon}
        />
      <PasswordInput
        value={data.password}
        marginTop={20}
        placeHolder={'비밀번호를 입력해주세요'}
        onChange={e => onDataChange('password', e.nativeEvent.text)}
      />
      <Button
        text={'로그인'}
        marginTop={30}
        size={'small'}
        onPress={onLoginBtnPress}
      />

      <View style={styles.menuContainer}>
        <TouchableOpacity>
          <Text>아이디 찾기</Text>
        </TouchableOpacity>
        <View style={styles.separatorBar} />
        <TouchableOpacity>
          <Text>비밀번호 찾기</Text>
        </TouchableOpacity>
        <View style={styles.separatorBar} />
        <TouchableOpacity onPress={onSignupBtnPress}>
          <Text>회원가입</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.horizontalSpearatorContainer}>
        <View style={styles.horizontalBar} />
        <Text style={styles.horizontalInfo}>
          소셜 로그인으로 쉽게 로그인해보세요
        </Text>
        <View style={styles.horizontalBar} />
      </View>

      <View style={styles.socialLoginContainer}>
        <SocialLoginBtn socialType={'google'} />
        <SocialLoginBtn socialType={'github'} />
        <SocialLoginBtn socialType={'kakao'} />
      </View>
    </BasicContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    width: 340,
    marginTop: 30,
    fontFamily: fontStyle.SUIT.ExtraBold,
    color: colorStyles.basicText,
    fontSize: 35,
    letterSpacing: -0.5,
  },
  highlightedTitle: {
    color: colorStyles.mainColor,
  },
  description: {
    width: 340,
    marginTop: 15,
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.descriptionGray,
    fontSize: 15,
  },
  menuContainer: {
    width: 265,
    height: 60,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: colorStyles.basicText,
    fontFamily: fontStyle.SUIT.Medium,
    fontSize: 15,
  },
  separatorBar: {
    width: 1,
    height: 15,
    backgroundColor: colorStyles.descriptionGray,
  },
  horizontalSpearatorContainer: {
    width: 340,
    height: 20,
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontalBar: {
    width: 45,
    height: 1,
    backgroundColor: colorStyles.descriptionGray,
  },
  horizontalInfo: {
    lineHeight: 20,
    fontSize: 15,
    color: colorStyles.descriptionGray,
    fontFamily: fontStyle.SUIT.Medium,
  },
  socialLoginContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 280,
  },
});

export default Login;
