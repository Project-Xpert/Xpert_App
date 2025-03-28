import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {colorStyles} from '../../../assets/styles/color';
import {useEffect, useRef, useState} from 'react';

interface btnProps {
  text: string;
  disable: boolean;
  marginLeft?: number;
  onPress: () => void;
}

const UnderBarBtn = (props: btnProps) => {
  let [underbarWidth, setUnderbarWidth] = useState(0);

  const textStyle = {
    ...styles.text,
    color: props.disable ? colorStyles.disableGray : colorStyles.basicText,
  };
  const underbarStyle = {
    ...styles.underbar,
    backgroundColor: props.disable
      ? colorStyles.disableGray
      : colorStyles.mainColor,
    width: underbarWidth,
  };

  const onPress = () => {
    if (props.disable) {
      props.onPress();
    }
  };

  return (
    <TouchableOpacity
      style={{...styles.container, marginLeft: props.marginLeft}}
      activeOpacity={0}
      onPress={onPress}>
      <Animated.Text
        style={textStyle}
        onLayout={e => {
          if (underbarWidth === 0) {
            const {width} = e.nativeEvent.layout;
            setUnderbarWidth(width + screenSize.getVW(1));
          }
        }}>
        {props.text}
      </Animated.Text>
      <Animated.View style={underbarStyle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Medium,
    letterSpacing: -0.5,
  },
  underbar: {
    marginTop: screenSize.getVH(0.1),
    height: screenSize.getVH(0.2),
  },
});

export default UnderBarBtn;
