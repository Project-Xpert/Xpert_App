import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {screenSize} from '../../../assets/styles/screenSize';

interface btnProps {
  onPress: () => void;
  text: string;
  enabled: boolean;
}

const StockMenuBtn = (props: btnProps) => {
  const textStyle = {
    ...btnStyles.menuText,
    color: props.enabled ? colorStyles.mainColor : colorStyles.disableGray,
  };

  return (
    <TouchableOpacity onPress={props.onPress} style={btnStyles.container}>
      <Text style={textStyle}>{props.text}</Text>
      {props.enabled && <View style={btnStyles.belowBar} />}
    </TouchableOpacity>
  );
};

const btnStyles = StyleSheet.create({
  container: {
    marginRight: screenSize.getVW(4.75),
  },
  menuText: {
    fontFamily: fontStyle.SUIT.Bold,
    fontSize: screenSize.getVH(2),
  },
  belowBar: {
    marginTop: screenSize.getVH(1.1),
    width: '100%',
    height: screenSize.getVH(0.3),
    borderRadius: screenSize.getVH(0.15),
    backgroundColor: colorStyles.mainColor,
  },
});

export default StockMenuBtn;
