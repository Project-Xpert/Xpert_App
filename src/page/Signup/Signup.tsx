import {StyleSheet, Text} from 'react-native';
import BasicContainer from '../../components/common/BasicContainer';
import BasicHeader from '../../components/common/headers/BasicHeader';
import {fontStyle} from '../../assets/styles/fontStyles';
import {colorStyles} from '../../assets/styles/color';
import BasicInput from '../../components/common/inputs/BasicInput';
import LoginIdIcon from '../../assets/image/icon/input/loginId/LoginIdIcon';
import PasswordInput from '../../components/common/inputs/PasswordInput';
import Button from '../../components/common/buttons/Button';
import useSignupData from '../../data/signupData';
import {useState} from 'react';
import {UserAPI} from '../../api/user';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {screenSize} from '../../assets/styles/screenSize';

const Signup = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {userId, email, password, passwordCheck, setData} = useSignupData();
  const [errorMessage, setErrorMessage] = useState({
    userId: '',
    email: '',
    password: '',
  });

  const isValidData = () => {
    let isValid = true;
    const newErrorMessages = {...errorMessage};
    const userIdValidation = /^[a-zA-Z0-9_]+$/;
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordValidation =
      /^(?=.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%*^&+=]).*$/;

    if (userId.length < 3 || userId.length > 20) {
      newErrorMessages.userId =
        '로그인용 아이디는 3글자 이상, 20글자 이하여야 합니다.';
      isValid = false;
    } else if (!userId.match(userIdValidation)) {
      newErrorMessages.userId =
        '유저 아이디에는 영문자 대소문자, 숫자, 언더바(_)만 허용됩니다';
      isValid = false;
    } else {
      newErrorMessages.userId = '';
    }

    if (email.length > 25) {
      newErrorMessages.email = '이메일의 길이는 25글자 이하로 해주세요.';
      isValid = false;
    } else if (!email.match(emailValidation)) {
      newErrorMessages.email = '이메일의 형식을 지켜 작성해주세요.';
      isValid = false;
    } else {
      newErrorMessages.email = '';
    }

    if (password.length < 8 || password.length > 20) {
      newErrorMessages.password =
        '비밀번호는 8글자 이상 20글자 이하여야 합니다.';
      isValid = false;
    } else if (!password.match(passwordValidation)) {
      newErrorMessages.password =
        '비밀번호에는 숫자, 영문자, 특수문자가 하나씩은 포함되어야 합니다';
      isValid = false;
    } else if (password !== passwordCheck) {
      newErrorMessages.password = '비밀번호가 다릅니다. 다시한번 확인해주세요';
      isValid = false;
    } else {
      newErrorMessages.password = '';
    }

    setErrorMessage(newErrorMessages);

    return isValid;
  };

  const signup = () => {
    if (isValidData()) {
      UserAPI.CheckAttributeIsUnique({userId, email})
        .then(response => {
          navigation.navigate('EmailCode');
        })
        .catch(e => {
          if (
            e.response?.data.description ==
            '이미 해당 아이디로 가입된 유저가 존재합니다'
          ) {
            setErrorMessage({
              userId: '이미 해당 아이디로 가입된 유저가 존재합니다',
              email: '',
              password: '',
            });
          } else if (
            e.response?.data.description ==
            '이미 해당 이메일로 가입된 유저가 존재합니다'
          ) {
            setErrorMessage({
              userId: '',
              email: '이미 해당 이메일로 가입된 유저가 존재합니다',
              password: '',
            });
          }
        });
    }
  };

  const onDataChange = (name: string, vaule: string) => {
    setData({[name]: vaule});
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(12.35)}>
      <BasicHeader text={'회원가입'} />

      <Text style={styles.title}>
        {'안녕하세요!\n'}
        <Text style={styles.highlightedTitle}>Xpert</Text>는 처음이시군요!
      </Text>
      <Text style={styles.description}>
        Xpert를 사용하기 위해 정보를 알려주세요!
      </Text>

      <BasicInput
        Icon={LoginIdIcon}
        value={userId}
        marginTop={screenSize.getVH(3.7)}
        placeHolder={'로그인 아이디를 입력해주세요'}
        onChange={e => onDataChange('userId', e.nativeEvent.text)}
        errorMessage={errorMessage.userId}
      />
      <BasicInput
        Icon={LoginIdIcon}
        value={email}
        marginTop={screenSize.getVH(2.2)}
        placeHolder={'이메일을 입력해주세요'}
        onChange={e => onDataChange('email', e.nativeEvent.text)}
        errorMessage={errorMessage.email}
      />
      <PasswordInput
        value={password}
        marginTop={screenSize.getVH(2.2)}
        placeHolder={'비밀번호를 입력해주세요'}
        onChange={e => onDataChange('password', e.nativeEvent.text)}
        errorMessage={errorMessage.password}
      />
      <PasswordInput
        value={passwordCheck}
        marginTop={screenSize.getVH(2.2)}
        placeHolder={'비밀번호를 확인해주세요'}
        onChange={e => onDataChange('passwordCheck', e.nativeEvent.text)}
        errorMessage={errorMessage.password}
      />

      <Button
        text={'인증코드 확인'}
        marginTop={screenSize.getVH(21.5)}
        size={'large'}
        onPress={signup}
      />
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
});

export default Signup;
