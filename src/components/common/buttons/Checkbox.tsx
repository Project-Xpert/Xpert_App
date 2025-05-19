import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import EnabledCheckImg from '../../../assets/image/icon/button/enabledCheck.svg';

interface BtnProps {
  enabled: boolean;
  text: String;
  onPress: () => void;
}

const CheckBox = (props: BtnProps) => {
  const btnStyle = {
    ...checkBoxStyles.button,
    backgroundColor: props.enabled
      ? colorStyles.mainColor
      : colorStyles.defaultWhite,
  };

  return (
    <View style={checkBoxStyles.container}>
      <TouchableOpacity style={btnStyle} onPress={props.onPress}>
        {props.enabled && (
          <EnabledCheckImg
            width={screenSize.getVH(1.8)}
            height={screenSize.getVH(1.8)}
          />
        )}
      </TouchableOpacity>
      <Text style={checkBoxStyles.text}>{props.text}</Text>
    </View>
  );
};

const checkBoxStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(1.6),
    width: screenSize.getVW(82),
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: screenSize.getVH(2.2),
    height: screenSize.getVH(2.2),
    borderRadius: screenSize.getVH(0.5),
    borderColor: colorStyles.mainColor,
    borderWidth: screenSize.getVH(0.15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: screenSize.getVW(1.6),
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.basicText,
  },
});

export default CheckBox;
