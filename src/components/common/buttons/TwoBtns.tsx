import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';

interface BtnProps {
  leftBtnText: string;
  rightBtnText: string;
  leftBtnOnPress: () => void;
  rightBtnOnPress: () => void;
  marginTop?: number;
  setColorToGray?: boolean;
}

const TwoBtns = (props: BtnProps) => {
  const leftBtnContainer = {
    ...styles.leftBtnContainer,
    backgroundColor: props.setColorToGray
      ? colorStyles.lightGrayBackGround
      : colorStyles.defaultWhite,
    borderColor: props.setColorToGray
      ? colorStyles.lightGrayBackGround
      : colorStyles.mainColor,
  };

  const rightBtnContainer = {
    ...styles.rightBtnContainer,
    backgroundColor: props.setColorToGray
      ? colorStyles.lightGrayBackGround
      : colorStyles.mainColor,
    borderColor: props.setColorToGray
      ? colorStyles.lightGrayBackGround
      : colorStyles.mainColor,
  };

  const leftBtnText = {
    ...styles.leftBtnText,
    color: colorStyles.basicText,
  };

  const rightBtnText = {
    ...styles.rightBtnText,
    color: props.setColorToGray
      ? colorStyles.basicText
      : colorStyles.defaultWhite,
  };

  return (
    <View style={{...styles.buttonContainer, marginTop: props.marginTop}}>
      <TouchableOpacity onPress={props.leftBtnOnPress} style={leftBtnContainer}>
        <Text style={leftBtnText}>{props.leftBtnText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.rightBtnOnPress}
        style={rightBtnContainer}>
        <Text style={rightBtnText}>{props.rightBtnText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width: screenSize.getVW(82),
    justifyContent: 'space-between',
  },
  leftBtnContainer: {
    width: screenSize.getVW(40),
    height: screenSize.getVH(6.6),
    borderRadius: screenSize.getVH(1.1),
    borderWidth: screenSize.getVH(0.15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftBtnText: {
    fontSize: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Bold,
  },
  rightBtnContainer: {
    width: screenSize.getVW(40),
    height: screenSize.getVH(6.6),
    borderRadius: screenSize.getVH(1.1),
    borderWidth: screenSize.getVH(0.15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightBtnText: {
    fontSize: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Bold,
  },
});

export default TwoBtns;
