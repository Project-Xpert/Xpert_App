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
}

const TwoBtns = (props: BtnProps) => {
  return (
    <View style={{...styles.buttonContainer, marginTop: props.marginTop}}>
      <TouchableOpacity
        onPress={props.leftBtnOnPress}
        style={styles.leftBtnContainer}>
        <Text style={styles.leftBtnText}>{props.leftBtnText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.rightBtnOnPress}
        style={styles.rightBtnContainer}>
        <Text style={styles.rightBtnText}>{props.rightBtnText}</Text>
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
    backgroundColor: colorStyles.defaultWhite,
    borderColor: colorStyles.mainColor,
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
    backgroundColor: colorStyles.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightBtnText: {
    fontSize: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.defaultWhite,
  },
});

export default TwoBtns;
