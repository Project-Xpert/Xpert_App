import {StyleSheet, TouchableOpacity} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import {colorStyles} from '../../assets/styles/color';
import EditBtn from '../../assets/image/icon/button/editBtn.svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const CreatePostBtn = () => {
  const navigator = useNavigation<NavigationProp<any>>();

  const onPress = () => {
    navigator.navigate('CreatePost');
  };

  return (
    <TouchableOpacity style={containerStyle.container} onPress={onPress}>
      <EditBtn width={screenSize.getVH(3.3)} height={screenSize.getVH(3.3)} />
    </TouchableOpacity>
  );
};

const containerStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: screenSize.getVW(5.8),
    bottom: screenSize.getVH(10.5),
    width: screenSize.getVH(7.2),
    height: screenSize.getVH(7.2),
    borderRadius: screenSize.getVH(2.2),
    backgroundColor: colorStyles.mainColor,
  },
});

export default CreatePostBtn;
