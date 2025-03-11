import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';

interface ButtonProps {
  text: string;
  marginTop: number;
  size: 'small' | 'mid' | 'large';
  onPress: () => void;
  disable?: boolean;
}

const Button = (props: ButtonProps) => {
  const containerStyle = {
    marginTop: props.marginTop,
    backgroundColor: props.disable
      ? colorStyles.disableGray
      : colorStyles.mainColor,
    height: props.size === 'small' ? 50 : props.size === 'mid' ? 60 : 80,
    ...styles.container,
  };

  const onPress = () => {
    if (!props.disable) {
      props.onPress();
    }
  };

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={props.disable ? 1 : 0}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    borderRadius: 15,
  },
  text: {
    fontSize: 20,
    lineHeight: 20,
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.defaultWhite,
  },
});

export default Button;
