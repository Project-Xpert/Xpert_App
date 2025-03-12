import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import EditBtn from '../../../assets/image/icon/button/editBtn.svg';
import {colorStyles} from '../../../assets/styles/color';

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
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorStyles.defaultBlack,
  },
});

export default ProfileEditBtn;
