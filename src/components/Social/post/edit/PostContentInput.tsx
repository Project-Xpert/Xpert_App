import {useState} from 'react';
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
import {colorStyles} from '../../../../assets/styles/color';
import {fontStyle} from '../../../../assets/styles/fontStyles';
import {screenSize} from '../../../../assets/styles/screenSize';

interface InputProps {
  value: string;
  marginTop: number;
  placeHolder: string;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

const PostContentInput = (props: InputProps) => {
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
    ...inputStyles.input,
  };

  return (
    <View>
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
        multiline={true}
      />
      <Text style={textStyles.text}>{`(${props.value.length}/300)`}</Text>
    </View>
  );
};

const inputStyles = StyleSheet.create({
  input: {
    width: screenSize.getVW(84),
    height: screenSize.getVH(25),
    paddingVertical: screenSize.getVH(2),
    paddingHorizontal: screenSize.getVW(4.7),
    fontFamily: fontStyle.SUIT.Medium,
    fontSize: screenSize.getVH(1.6),
    lineHeight: screenSize.getVH(2.2),
    borderWidth: screenSize.getVH(0.075),
    borderRadius: 15,
  },
});

const textStyles = StyleSheet.create({
  text: {
    textAlign: 'right',
    width: screenSize.getVW(78.5),
    marginTop: screenSize.getVH(0.5),
    fontFamily: fontStyle.SUIT.Regular,
    fontSize: screenSize.getVH(1.3),
    color: colorStyles.disableGray,
  },
});

export default PostContentInput;
