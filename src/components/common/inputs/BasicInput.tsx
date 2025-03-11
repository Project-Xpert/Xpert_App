import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
  View,
} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {ElementType, useState} from 'react';

interface InputProps {
  Icon: ElementType
  value: string;
  marginTop: number;
  placeHolder: string;
  errorMessage?: string;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

const BasicInput = (props: InputProps) => {
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

  return (
    <View>
      <props.Icon style={styles.icon} isActivated={isActivated} />
      <TextInput
        style={inputStyle}
        value={props.value}
        placeholder={props.placeHolder}
        onChange={props.onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <Text style={styles.errorMessage}>{props.errorMessage}</Text>
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
  errorMessage: {
    position: 'absolute',
    bottom: -16,
    left: 15,
    fontSize: 12,
    fontFamily: fontStyle.SUIT.Regular,
    color: colorStyles.defaultRed
  }
});

export default BasicInput;
