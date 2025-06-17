import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {screenSize} from '../../../assets/styles/screenSize';
import {fontStyle} from '../../../assets/styles/fontStyles';

interface btnProps {
  text: string;
}

const SeeMoreBtn = (prop: btnProps) => {
  return (
    <TouchableOpacity style={btnStyles.container}>
      <Text style={btnStyles.text}>{prop.text}</Text>
    </TouchableOpacity>
  );
};

const btnStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(2.2),
    justifyContent: 'center',
    alignItems: 'center',
    width: screenSize.getVW(83.3),
    height: screenSize.getVH(6.1),
    borderRadius: screenSize.getVH(1.6),
    backgroundColor: colorStyles.lightGrayBackGround,
  },
  text: {
    fontSize: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
});

export default SeeMoreBtn;
