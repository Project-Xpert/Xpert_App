import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import AcceptBtn from '../../../assets/image/icon/button/acceptBtn.svg';
import DenyBtn from '../../../assets/image/icon/button/denyBtn.svg';

const FriendRequestItem = () => {
  return (
    <View style={containerStyle.container}>
      <Image
        style={imgStyles.profile}
        src="https://i.pinimg.com/736x/7b/2f/64/7b2f64bbe7e65efea932f2598d0d3009.jpg"
      />

      <View style={textStyles.container}>
        <Text style={textStyles.title}>Bocchi The Invest!</Text>
        <Text style={textStyles.subTitle}>@bocchi</Text>
      </View>

      <View style={btnStyle.container}>
        <TouchableOpacity>
          <AcceptBtn
            width={screenSize.getVH(3.3)}
            height={screenSize.getVH(3.3)}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <DenyBtn
            width={screenSize.getVH(3.3)}
            height={screenSize.getVH(3.3)}
          />
        </TouchableOpacity>
      </View>
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

const btnStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenSize.getVW(17.8),
    position: 'absolute',
    right: screenSize.getVW(4.7),
  },
});

export default FriendRequestItem;
