import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colorStyles} from '../../assets/styles/color';

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
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colorStyles.defaultBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SocialLoginBtn;
