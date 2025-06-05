import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';

interface btnProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

const LongBtn = (props: btnProps) => {
  const containerStyle = {
    ...containerStyles.container,
    borderColor: props.selected
      ? colorStyles.mainColor
      : colorStyles.disableGray,
  };

  const textStyle = {
    ...textStyles.text,
    color: props.selected ? colorStyles.basicText : colorStyles.disableGray,
  };

  const onClick = () => {
    if (!props.selected) {
      props.onClick();
    }
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={onClick}>
      <Text style={textStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    width: screenSize.getVW(24.7),
    height: screenSize.getVH(3.3),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: screenSize.getVH(0.15),
    borderRadius: screenSize.getVH(1.1),
  },
});

const textStyles = StyleSheet.create({
  text: {
    fontFamily: fontStyle.SUIT.Medium,
    fontSize: screenSize.getVH(1.6),
  },
});

export default LongBtn;
