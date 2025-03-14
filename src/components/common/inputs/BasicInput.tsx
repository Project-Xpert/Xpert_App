import {
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {ElementType, useState} from 'react';
import {screenSize} from '../../../assets/styles/screenSize';

interface InputProps {
  Icon: ElementType;
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
    borderColor: isActivated
      ? colorStyles.selectedOutline
      : colorStyles.disableGray,
    color: isActivated ? colorStyles.basicText : colorStyles.disableGray,
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
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="done"
      />
      <Text style={styles.errorMessage}>{props.errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: screenSize.getVW(84),
    height: screenSize.getVH(5.5),
    fontFamily: fontStyle.SUIT.Medium,
    fontSize: screenSize.getVH(1.6),
    borderWidth: screenSize.getVH(0.075),
    borderRadius: 15,
    paddingLeft: screenSize.getVW(11.3),
  },
  icon: {
    position: 'absolute',
    left: screenSize.getVW(3.4),
    bottom: screenSize.getVH(1.4),
  },
  errorMessage: {
    position: 'absolute',
    bottom: -screenSize.getVH(1.7),
    left: screenSize.getVH(1.4),
    fontSize: screenSize.getVH(1.3),
    fontFamily: fontStyle.SUIT.Regular,
    color: colorStyles.defaultRed,
  },
});

export default BasicInput;
