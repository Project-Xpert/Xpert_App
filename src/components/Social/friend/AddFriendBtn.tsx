import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';

interface btnProps {
  userId: string;
  username: string;
  profile: string;
  hadRequested: boolean;
  onPress: () => void;
}

const AddFriendBtn = (props: btnProps) => {
  const btnContainerStyle = {
    ...btnStyles.container,
    borderColor: props.hadRequested
      ? colorStyles.defaultRed
      : colorStyles.mainColor,
  };

  const btnTextStyle = {
    ...btnStyles.text,
    color: props.hadRequested ? colorStyles.defaultRed : colorStyles.mainColor,
  };

  return (
    <View style={containerStyle.container}>
      <Image style={imgStyles.profile} src={props.profile} />

      <View style={textStyles.container}>
        <Text style={textStyles.title}>{props.username}</Text>
        <Text style={textStyles.subTitle}>{`@${props.userId}`}</Text>
      </View>

      <TouchableOpacity style={btnContainerStyle} onPress={props.onPress}>
        <Text style={btnTextStyle}>
          {props.hadRequested ? '요청 취소' : '친구 요청'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const containerStyle = StyleSheet.create({
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
    marginLeft: screenSize.getVW(4.7),
    width: screenSize.getVH(3.8),
    height: screenSize.getVH(3.8),
    borderRadius: screenSize.getVH(2.2),
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

const btnStyles = StyleSheet.create({
  container: {
    right: screenSize.getVW(4.7),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenSize.getVW(15.4),
    height: screenSize.getVH(2.8),
    borderWidth: screenSize.getVW(0.24),
    borderRadius: screenSize.getVH(1.1),
  },
  text: {
    fontSize: screenSize.getVH(1.3),
  },
});

export default AddFriendBtn;
