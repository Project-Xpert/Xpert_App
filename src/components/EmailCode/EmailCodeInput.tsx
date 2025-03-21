import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
} from 'react-native';
import {colorStyles} from '../../assets/styles/color';
import {fontStyle} from '../../assets/styles/fontStyles';
import {Ref, useState} from 'react';
import {screenSize} from '../../assets/styles/screenSize';

interface InputProps {
  text: string;
  editable: boolean;
  ref: Ref<TextInput>;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onDelete: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
}

const EmailCodeInput = (props: InputProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const onFocus = () => {
    setIsSelected(true);
  };

  const onBlur = () => {
    setIsSelected(false);
  };

  const containerStyle = {
    ...styles.container,
    borderColor:
      props.text.length > 0 || isSelected
        ? colorStyles.selectedOutline
        : colorStyles.defaultBlack,
    backgroundColor:
      props.text.length > 0 || isSelected
        ? colorStyles.selectedBackGround
        : colorStyles.defaultWhite,
  };

  return (
    <TextInput
      ref={props.ref}
      style={containerStyle}
      value={props.text}
      editable={props.editable}
      keyboardType="numeric"
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={props.onChange}
      onKeyPress={props.onDelete}
      caretHidden
      autoCorrect={false}
      maxLength={1}
      autoCapitalize="none"
      returnKeyType="done"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: screenSize.getVH(3.3),
    width: screenSize.getVH(8.2),
    height: screenSize.getVH(8.2),
    borderRadius: 15,
    borderWidth: 0.5,
    fontSize: screenSize.getVH(3.3),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
});

export default EmailCodeInput;
