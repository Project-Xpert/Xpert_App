import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BasicContainer from '../../components/common/BasicContainer';
import BasicHeader from '../../components/common/headers/BasicHeader';
import {colorStyles} from '../../assets/styles/color';
import Button from '../../components/common/buttons/Button';
import {fontStyle} from '../../assets/styles/fontStyles';
import EmailCodeInput from '../../components/EmailCode/EmailCodeInput';
import {useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {UserAPI} from '../../api/user';
import useSignupData from '../../data/signupData';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {screenSize} from '../../assets/styles/screenSize';

const EmailCode = () => {
  const navigator = useNavigation<NavigationProp<any>>();
  const {email} = useSignupData();
  const [code, setCode] = useState(['', '', '', '']);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [time, setTime] = useState(120);
  const [errorMessage, setErrorMessage] = useState('');
  const isMounted = useRef(false);
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const sendCode = () => {
    UserAPI.SendCode({mail: email})
      .then()
      .catch(err => {
        console.log(err);
      });
  };

  const setTimeInterval = () => {
    const intervalId = setInterval(() => {
      setTime(prev => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });
    }, 1000);

    return intervalId;
  };

  useEffect(() => {
    sendCode();
    const intervalId = setTimeInterval();
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    setTimeout(() => {
      inputRefs[selectedIdx].current?.focus();
    }, 0);
  }, [selectedIdx]);

  const onInputChange = (idx: number, value: string) => {
    if (value) {
      setCode(prevCode => {
        const newCode = [...prevCode];
        newCode[idx] = value;

        return newCode;
      });

      if (selectedIdx < 3 && value.length > 0) {
        setSelectedIdx(prev => prev + 1);
      }
    }
  };

  const onBackSpaceDetected = (idx: number) => {
    setCode(prevCode => {
      const newCode = [...prevCode];
      const shouldMoveLeft = prevCode[idx] === '' && idx > 0;

      if (shouldMoveLeft) {
        newCode[idx - 1] = '';
        setSelectedIdx(idx - 1);
      } else {
        newCode[idx] = '';
      }

      return newCode;
    });
  };

  const resendCode = () => {
    if (time == 0) {
      setTimeInterval();
    }
    setTime(prev => 120);
    sendCode();
    setErrorMessage('');
    setSelectedIdx(0);
    setCode(['', '', '', '']);
  };

  const verifyCode = () => {
    if (code.join('').length == 4) {
      UserAPI.VerifyCode({
        mail: email,
        code: code.join(''),
      })
        .then(response => {
          navigator.navigate('SignupDetail');
        })
        .catch(e => {
          console.log(e);
          if (e.response?.data.code == 401) {
            setErrorMessage('코드를 다시 한번 확인을 해주세요');
          }
        });
    } else {
      setErrorMessage('코드를 입력해주세요');
    }
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(12.35)}>
      <BasicHeader text={'이메일 인증'} />
      <Text style={styles.description}>
        {'선택하신 방법으로 인증코드가 발송되었습니다.' +
          '\n2분 이내에 인증코드를 입력해주세요.'}
      </Text>

      <View style={styles.inputContainer}>
        {[0, 1, 2, 3].map(idx => {
          return (
            <EmailCodeInput
              key={idx}
              text={code[idx]}
              ref={inputRefs[idx]}
              editable={selectedIdx == idx}
              onChange={e => {
                onInputChange(idx, e.nativeEvent.text);
              }}
              onDelete={e => {
                if (e.nativeEvent.key == 'Backspace') {
                  onBackSpaceDetected(selectedIdx);
                }
              }}
            />
          );
        })}
      </View>

      <Text style={styles.centerLeftTime}>
        코드 만료까지
        <Text style={styles.leftTime}>
          {' '}
          {Math.floor(time / 60)
            .toString()
            .padStart(2, '0')}
          {':'}
          {(time % 60).toString().padStart(2, '0')}{' '}
        </Text>
        남았습니다
      </Text>

      <Text style={styles.errorMessage}>{errorMessage}</Text>

      <TouchableOpacity style={styles.reSendBtn} onPress={resendCode}>
        <Text style={styles.resendText}>인증코드 재전송</Text>
      </TouchableOpacity>
      <Button
        text={'인증코드 확인'}
        marginTop={screenSize.getVW(2)}
        size={'large'}
        onPress={verifyCode}
        disable={time <= 0}
      />
    </BasicContainer>
  );
};

const styles = StyleSheet.create({
  description: {
    width: screenSize.getVW(82),
    fontSize: screenSize.getVH(1.7),
    lineHeight: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.descriptionGray,
  },
  inputContainer: {
    width: screenSize.getVW(84),
    height: screenSize.getVH(8.3),
    marginTop: screenSize.getVH(3.8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerLeftTime: {
    marginTop: screenSize.getVH(3.8),
    fontSize: screenSize.getVH(1.7),
    lineHeight: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.descriptionGray,
  },
  leftTime: {
    fontFamily: fontStyle.SUIT.Heavy,
    color: colorStyles.basicText,
  },
  reSendBtn: {
    marginTop: screenSize.getVH(37.5),
    width: screenSize.getVW(23.8),
  },
  resendText: {
    width: '100%',
    fontSize: screenSize.getVH(1.7),
    lineHeight: screenSize.getVH(2.2),
    textAlign: 'center',
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.mainColor,
    textDecorationLine: 'underline',
  },
  errorMessage: {
    marginTop: screenSize.getVH(1.7),
    color: colorStyles.defaultRed,
    fontFamily: fontStyle.SUIT.SemiBold,
    fontSize: screenSize.getVH(1.7),
    width: '100%',
    textAlign: 'center',
  },
});

export default EmailCode;
