import {StyleSheet, Text} from 'react-native';
import BasicContainer from '../../components/common/BasicContainer';
import BasicHeader from '../../components/common/headers/BasicHeader';
import {fontStyle} from '../../assets/styles/fontStyles';
import {colorStyles} from '../../assets/styles/color';
import BasicInput from '../../components/common/inputs/BasicInput';
import LoginIdIcon from '../../assets/image/icon/input/loginId/LoginIdIcon';
import PasswordInput from '../../components/common/inputs/PasswordInput';
import Button from '../../components/common/buttons/Button';
import {useState} from 'react';

const Signup = () => {
  const [data, setData] = useState({
    userId: '',
    email: '',
    password: '',
    checkPassword: '',
  });

  const signup = () => {};

  const onDataChange = (name: string, vaule: string) => {
    setData({...data, [name]: vaule});
  };

  return (
    <BasicContainer paddingTop={140}>
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
        value={data.userId}
        marginTop={35}
        placeHolder={'로그인 아이디를 입력해주세요'}
        onChange={e => onDataChange('userId', e.nativeEvent.text)}
      />
      <BasicInput
        Icon={LoginIdIcon}
        value={data.email}
        marginTop={20}
        placeHolder={'이메일을 입력해주세요'}
        onChange={e => onDataChange('email', e.nativeEvent.text)}
      />
      <PasswordInput
        value={data.password}
        marginTop={20}
        placeHolder={'비밀번호를 입력해주세요'}
        onChange={e => onDataChange('password', e.nativeEvent.text)}
      />
      <PasswordInput
        value={data.checkPassword}
        marginTop={20}
        placeHolder={'비밀번호를 확인해주세요'}
        onChange={e => onDataChange('checkPassword', e.nativeEvent.text)}
      />

      <Button
        text={'인증코드 확인'}
        marginTop={160}
        size={'large'}
        onPress={signup}
      />
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
});

export default Signup;
