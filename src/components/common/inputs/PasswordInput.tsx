import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import Icon from '../../../assets/image/icon/input/password/password.svg';
import SeeIcon from '../../../assets/image/icon/input/password/seePassword.svg';
import HideIcon from '../../../assets/image/icon/input/password/hidePassword.svg';
import {useState} from 'react';

interface InputProps {
  marginTop: number;
  placeHolder: string;
}

const PasswordInput = (props: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputStyle = {
    marginTop: props.marginTop,
    ...styles.input,
  };

  const onPressVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <View>
      <Icon style={styles.icon} />
      <TextInput
        style={inputStyle}
        placeholder={props.placeHolder}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity onPress={onPressVisibility} style={styles.btn}>
        {showPassword ? <SeeIcon /> : <HideIcon />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 50,
  },
  input: {
    width: 350,
    height: 50,
    borderColor: colorStyles.disableGray,
    color: colorStyles.disableGray,
    fontFamily: fontStyle.SUIT.Medium,
    fontSize: 15,
    borderWidth: 0.5,
    borderRadius: 15,
    paddingLeft: 54,
  },
  icon: {
    position: 'absolute',
    left: 15,
    bottom: 13,
  },
  btn: {
    position: 'absolute',
    right: 15,
    bottom: 13,
  },
});

export default PasswordInput;
