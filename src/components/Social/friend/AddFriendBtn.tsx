import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import EnabledCheckIcon from '../../../assets/image/icon/button/enabledCheck.svg';

interface btnProps {
  isSelected: boolean;
}

const AddFriendBtn = ({isSelected}: btnProps) => {
  const buttonStyle = {
    ...btnStyle.container,
    borderColor: isSelected ? colorStyles.mainColor : colorStyles.disableGray,
    backgroundColor: isSelected
      ? colorStyles.mainColor
      : colorStyles.defaultWhite,
  };

  return (
    <TouchableOpacity style={containerStyle.container}>
      <View style={buttonStyle}>
        <EnabledCheckIcon
          width={screenSize.getVH(1.63)}
          height={screenSize.getVH(1.63)}
        />
      </View>

      <Image
        style={imgStyles.profile}
        src="https://i.pinimg.com/736x/7b/2f/64/7b2f64bbe7e65efea932f2598d0d3009.jpg"
      />

      <View style={textStyles.container}>
        <Text style={textStyles.title}>Bocchi The Invest!</Text>
        <Text style={textStyles.subTitle}>@bocchi</Text>
      </View>
    </TouchableOpacity>
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
    marginLeft: screenSize.getVW(3.5),
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
    alignItems: 'center',
    justifyContent: 'center',
    width: screenSize.getVH(2),
    height: screenSize.getVH(2),
    marginLeft: screenSize.getVW(1.2),
    borderRadius: screenSize.getVW(1.2),
    borderWidth: screenSize.getVW(0.23),
  },
});

export default AddFriendBtn;
