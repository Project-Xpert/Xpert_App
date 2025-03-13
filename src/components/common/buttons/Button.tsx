import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {screenSize} from '../../../assets/styles/screenSize';

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
    height:
      props.size === 'small'
        ? screenSize.getVH(5.5)
        : props.size === 'mid'
        ? screenSize.getVH(6.6)
        : screenSize.getVH(8.8),
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
    width: screenSize.getVW(82),
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
