import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import EditBtn from '../../../assets/image/icon/button/editBtn.svg';
import {colorStyles} from '../../../assets/styles/color';
import {screenSize} from '../../../assets/styles/screenSize';

interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const ProfileEditBtn = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.container, props.style])}
      onPress={props.onPress}>
      <EditBtn />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenSize.getVH(3.3),
    height: screenSize.getVH(3.3),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorStyles.defaultBlack,
  },
});

export default ProfileEditBtn;
