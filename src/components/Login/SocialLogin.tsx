import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colorStyles} from '../../assets/styles/color';
import {screenSize} from '../../assets/styles/screenSize';

interface BtnProps {
  socialType: 'google' | 'github' | 'kakao';
}

const SocialLoginBtn = (props: BtnProps) => {
  const img =
    props.socialType === 'google'
      ? require('../../assets/image/icon/socialLogin/google.png')
      : props.socialType === 'github'
      ? require('../../assets/image/icon/socialLogin/github.png')
      : require('../../assets/image/icon/socialLogin/kakao.png');

  return (
    <TouchableOpacity style={style.container}>
      <Image source={img} />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: screenSize.getVH(6.6),
    height: screenSize.getVH(6.6),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colorStyles.defaultBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SocialLoginBtn;
