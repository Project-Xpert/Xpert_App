import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {useState} from 'react';
import PasswordIcon from '../../../assets/image/icon/input/password/passwordIcon';
import SeePasswordIcon from '../../../assets/image/icon/input/password/seePasswordIcon';
import HidePasswordIcon from '../../../assets/image/icon/input/password/hidePasswordIcon';

interface InputProps {
  value: string;
  marginTop: number;
  placeHolder: string;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

const PasswordInput = (props: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsActivated(true);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    setIsActivated(false);
  };

  const inputStyle = {
    marginTop: props.marginTop,
    borderColor:
      isActivated
        ? colorStyles.selectedOutline
        : colorStyles.disableGray,
    color:
      isActivated
        ? colorStyles.basicText 
        : colorStyles.disableGray,
    ...styles.input,
  };

  const onPressVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <View>
      <PasswordIcon style={styles.icon} isActivated={isActivated} />
      <TextInput
        value={props.value}
        style={inputStyle}
        placeholder={props.placeHolder}
        secureTextEntry={!showPassword}
        onChange={props.onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <TouchableOpacity onPress={onPressVisibility} style={styles.btn}>
        {showPassword ? <SeePasswordIcon isActivated={isActivated} /> : <HidePasswordIcon isActivated={isActivated}/>}
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
