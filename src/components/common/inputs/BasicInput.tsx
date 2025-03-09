import {StyleSheet, TextInput, View} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import Icon from '../../../assets/image/icon/input/loginId/loginIdDisabled.svg';

interface InputProps {
  marginTop: number;
  placeHolder: string;
}

const BasicInput = (props: InputProps) => {
  const inputStyle = {
    marginTop: props.marginTop,
    ...styles.input,
  };

  return (
    <View>
      <Icon style={styles.icon} />
      <TextInput style={inputStyle} placeholder={props.placeHolder} />
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
});

export default BasicInput;
