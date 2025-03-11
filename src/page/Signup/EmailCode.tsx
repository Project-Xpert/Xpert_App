import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BasicContainer from '../../components/common/BasicContainer';
import BasicHeader from '../../components/common/headers/BasicHeader';
import {colorStyles} from '../../assets/styles/color';
import Button from '../../components/common/buttons/Button';
import {fontStyle} from '../../assets/styles/fontStyles';
import EmailCodeInput from '../../components/EmailCode/EmailCodeInput';
import {useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';

const EmailCode = () => {
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
  };

  const verifyCode = () => {};

  return (
    <BasicContainer paddingTop={155}>
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
        marginTop={10}
        size={'large'}
        onPress={verifyCode}
        disable={time <= 0}
      />
    </BasicContainer>
  );
};

const styles = StyleSheet.create({
  description: {
    width: 340,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.descriptionGray,
  },
  inputContainer: {
    width: 340,
    height: 75,
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerLeftTime: {
    marginTop: 35,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.descriptionGray,
  },
  leftTime: {
    fontFamily: fontStyle.SUIT.Heavy,
    color: colorStyles.basicText,
  },
  reSendBtn: {
    marginTop: 320,
    width: 100,
  },
  resendText: {
    width: '100%',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.mainColor,
    textDecorationLine: 'underline',
  },
  errorMessage: {
    marginTop: 15,
    color: colorStyles.defaultRed,
    fontFamily: fontStyle.SUIT.SemiBold,
    fontSize: 15,
    width: 340,
    textAlign: 'center',
  },
});

export default EmailCode;
