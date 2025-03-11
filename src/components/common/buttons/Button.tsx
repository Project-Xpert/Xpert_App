import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';

interface ButtonProps {
  text: string;
  marginTop: number;
  size: 'small' | 'mid' | 'large';
  onPress: () => void;
}

const Button = (props: ButtonProps) => {
  const containerStyle = {
    marginTop: props.marginTop,
    height: props.size === 'small' ? 50 : props.size === 'mid' ? 60 : 80,
    ...styles.container,
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    backgroundColor: colorStyles.mainColor,
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
