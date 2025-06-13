import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {colorStyles} from '../../../assets/styles/color';
import ArrowImg from '../../../assets/image/icon/button/rightArrowBtn.svg';
import {fontStyle} from '../../../assets/styles/fontStyles';

interface btnProps {
  username: string;
  profile: string;
  userId: string;
  onPress: () => void;
}

const FriendDetailBtn = (props: btnProps) => {
  return (
    <TouchableOpacity style={containerStyles.container} onPress={props.onPress}>
      <Image style={imgStyles.profile} src={props.profile} />

      <View style={textStyles.container}>
        <Text style={textStyles.title}>{props.username}</Text>
        <Text style={textStyles.subTitle}>@{props.userId}</Text>
      </View>

      <ArrowImg style={imgStyles.arrowIcon} />
    </TouchableOpacity>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenSize.getVH(1.1),
    width: screenSize.getVW(83.3),
    height: screenSize.getVH(6.6),
    backgroundColor: colorStyles.defaultWhite,
  },
});

const imgStyles = StyleSheet.create({
  profile: {
    marginLeft: screenSize.getVW(4.75),
    width: screenSize.getVH(3.8),
    height: screenSize.getVH(3.8),
    borderRadius: screenSize.getVH(2.2),
  },
  arrowIcon: {
    position: 'absolute',
    right: screenSize.getVW(4.75),
  },
});

const textStyles = StyleSheet.create({
  container: {
    marginLeft: screenSize.getVW(2.85),
  },
  title: {
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Bold,
  },
  subTitle: {
    fontSize: screenSize.getVH(1.3),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.descriptionGray,
  },
});

export default FriendDetailBtn;
