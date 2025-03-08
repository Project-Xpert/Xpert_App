import {Animated, StyleSheet, View} from 'react-native';
import {colorStyles} from '../../assets/styles/color';
import {useEffect, useRef} from 'react';

interface indexBarProps {
  isActive: boolean;
}

interface indexBarsProps {
  marginTop: number;
  activeIdx: number;
}

const IndexBar = (props: indexBarProps) => {
  const {isActive} = props;

  const indexBarStyle = {
    width: useRef(new Animated.Value(isActive ? 32 : 8)).current,
    height: 8,
    backgroundColor: isActive ? colorStyles.mainColor : colorStyles.disableGray,
    borderRadius: 100,
  };

  useEffect(() => {
    Animated.timing(indexBarStyle.width, {
      toValue: isActive ? 32 : 8,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  return <Animated.View style={indexBarStyle} />;
};

const IndexBars = (props: indexBarsProps) => {
  const indexBarContainerStyle = {
    ...styles.indexBarContainer,
    marginTop: props.marginTop,
  };

  return (
    <View style={indexBarContainerStyle}>
      {[0, 1, 2, 3].map(idx => {
        return <IndexBar key={idx} isActive={props.activeIdx === idx} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  indexBarContainer: {
    width: 86,
    height: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default IndexBars;
