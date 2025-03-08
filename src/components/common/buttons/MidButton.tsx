import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';

interface ButtonProps {
  text: string;
  marginTop: number;
}

const MidButton = (props: ButtonProps) => {
  const containerStyle = {
    marginTop: props.marginTop,
    ...styles.container,
  };

  return (
    <TouchableOpacity style={containerStyle}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    height: 60,
    borderRadius: 15,
    backgroundColor: colorStyles.mainColor,
  },
  text: {
    fontSize: 20,
    lineHeight: 20,
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.defaultWhite,
  },
});

export default MidButton;
