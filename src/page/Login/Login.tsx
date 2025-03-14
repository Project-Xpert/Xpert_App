import BasicHeader from '../../components/common/headers/BasicHeader';
import BasicContainer from '../../components/common/BasicContainer';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fontStyle} from '../../assets/styles/fontStyles';
import {colorStyles} from '../../assets/styles/color';
import Button from '../../components/common/buttons/Button';
import BasicInput from '../../components/common/inputs/BasicInput';
import PasswordInput from '../../components/common/inputs/PasswordInput';
import SocialLoginBtn from '../../components/Login/SocialLogin';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import LoginIdIcon from '../../assets/image/icon/input/loginId/LoginIdIcon';
import {UserAPI} from '../../api/user';
import {TokenManager} from '../../api/util/tokenManager';
import {screenSize} from '../../assets/styles/screenSize';

const Login = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [data, setData] = useState({userId: '', password: ''});
  const [errorMessage, setErrorMessage] = useState({userId: '', password: ''});

  const onDataChange = (name: string, value: string) => {
    setData({...data, [name]: value});
  };

  const checkDataIsValid = () => {
    let isValid = true;
    let newErrorMessage = {...errorMessage};

    if (data.userId.length < 3 || data.userId.length > 20) {
      newErrorMessage.userId =
        '로그인용 아이디는 3글자 이상, 20글자 이하여야 합니다.';
      isValid = false;
    } else {
      newErrorMessage.userId = '';
    }

    if (data.password.length <= 0) {
      newErrorMessage.password = '비밀번호를 입력해주시길 바랍니다.';
      isValid = false;
    } else {
      newErrorMessage.password = '';
    }

    setErrorMessage(newErrorMessage);

    return isValid;
  };

  const onLoginBtnPress = () => {
    if (checkDataIsValid()) {
      UserAPI.Login(data)
        .then(response => {
          console.log(response);
          TokenManager.saveToken(response.data.accessToken);
          navigation.navigate('Home');
        })
        .catch(e => {
          console.log(e.response);
          if (e.response?.status === 401 || e.response?.status === 404) {
            setErrorMessage({
              userId: '아이디와 비밀번호를 다시한번 확인해주세요',
              password: '아이디와 비밀번호를 다시한번 확인해주세요',
            });
          }
        });
    }
  };

  const onSignupBtnPress = () => {
    navigation.navigate('Signup');
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(12.35)}>
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
        marginTop={screenSize.getVH(4.4)}
        Icon={LoginIdIcon}
        placeHolder={'로그인 아이디를 입력해주세요'}
        errorMessage={errorMessage.userId}
        onChange={e => onDataChange('userId', e.nativeEvent.text)}
      />
      <PasswordInput
        value={data.password}
        marginTop={screenSize.getVH(2.2)}
        placeHolder={'비밀번호를 입력해주세요'}
        errorMessage={errorMessage.password}
        onChange={e => onDataChange('password', e.nativeEvent.text)}
      />
      <Button
        text={'로그인'}
        marginTop={screenSize.getVH(3.3)}
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
    width: '100%',
    fontFamily: fontStyle.SUIT.ExtraBold,
    color: colorStyles.basicText,
    fontSize: screenSize.getVH(3.8),
    letterSpacing: -0.5,
  },
  highlightedTitle: {
    color: colorStyles.mainColor,
  },
  description: {
    width: '100%',
    marginTop: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.descriptionGray,
    fontSize: screenSize.getVH(1.6),
  },
  menuContainer: {
    width: screenSize.getVW(61.8),
    height: screenSize.getVH(2.2),
    marginTop: screenSize.getVH(3.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: colorStyles.basicText,
    fontFamily: fontStyle.SUIT.Medium,
    fontSize: screenSize.getVH(1.6),
  },
  separatorBar: {
    width: screenSize.getVH(0.15),
    height: screenSize.getVH(1.6),
    backgroundColor: colorStyles.descriptionGray,
  },
  horizontalSpearatorContainer: {
    width: '100%',
    height: screenSize.getVH(2.2),
    marginTop: screenSize.getVH(12.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontalBar: {
    width: screenSize.getVW(12.5),
    height: screenSize.getVH(0.15),
    backgroundColor: colorStyles.descriptionGray,
  },
  horizontalInfo: {
    lineHeight: screenSize.getVH(2.2),
    fontSize: screenSize.getVH(1.6),
    color: colorStyles.descriptionGray,
    fontFamily: fontStyle.SUIT.Medium,
  },
  socialLoginContainer: {
    marginTop: screenSize.getVH(5.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenSize.getVW(69.7),
  },
});

export default Login;
