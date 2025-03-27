import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import CheckedIcon from '../../../assets/image/icon/input/dropdown/checkedIcon.svg';

interface dropdownProps {
  dropdownText: string;
  isSelected: boolean;
  onPress: () => void;
}

const DropdownMenu = (props: dropdownProps) => {
  const containerStyle = {
    ...styles.container,
    backgroundColor: props.isSelected
      ? colorStyles.selectedDropdownBackGround
      : colorStyles.defaultWhite,
  };

  const textStyle = {
    ...styles.text,
    color: props.isSelected ? colorStyles.defaultBlue : colorStyles.basicText,
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={props.onPress}>
      <Text style={textStyle}>{props.dropdownText}</Text>
      {props.isSelected && (
        <CheckedIcon
          width={screenSize.getVW(3.8)}
          height={screenSize.getVH(1.3)}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: screenSize.getVW(4.75),
    height: screenSize.getVH(3.9),
    borderRadius: 5,
  },
  text: {
    fontSize: screenSize.getVH(1.6),
    color: colorStyles.basicText,
    fontFamily: fontStyle.SUIT.Bold,
  },
});

export default DropdownMenu;
