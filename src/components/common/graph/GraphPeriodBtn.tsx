import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {colorStyles} from '../../../assets/styles/color';

interface BtnProps {
  disable: boolean;
  period: string;
  onPress: () => void;
}

const GraphPeriodBtn = (props: BtnProps) => {
  const fontStyle = {
    ...styles.buttonText,
    color: props.disable ? colorStyles.disableGray : colorStyles.basicText,
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={fontStyle}>{props.period}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    marginLeft: screenSize.getVW(2),
    fontSize: screenSize.getVH(1.5),
    fontFamily: fontStyle.SUIT.Medium,
  },
});

export default GraphPeriodBtn;
