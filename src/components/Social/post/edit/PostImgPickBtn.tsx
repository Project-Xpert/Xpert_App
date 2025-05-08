import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {screenSize} from '../../../../assets/styles/screenSize';
import {colorStyles} from '../../../../assets/styles/color';
import ImgIcon from '../../../../assets/image/icon/button/imgIcon.svg';
import {fontStyle} from '../../../../assets/styles/fontStyles';

interface BtnProps {
  onPress: () => void;
}

const PostImgPickBtn = (props: BtnProps) => {
  return (
    <TouchableOpacity style={containerStyle.container} onPress={props.onPress}>
      <ImgIcon width={screenSize.getVH(4.4)} height={screenSize.getVH(4.4)} />
      <Text style={textStyle.mainText}>사진 첨부하기</Text>
    </TouchableOpacity>
  );
};

const containerStyle = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(2.2),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: screenSize.getVW(8.3),
    width: screenSize.getVW(84),
    height: screenSize.getVH(8.8),
    backgroundColor: colorStyles.lightGrayBackGround,
    borderRadius: screenSize.getVH(1.1),
  },
});

const textStyle = StyleSheet.create({
  mainText: {
    marginLeft: screenSize.getVW(4.7),
    fontSize: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Bold,
  },
});

export default PostImgPickBtn;
