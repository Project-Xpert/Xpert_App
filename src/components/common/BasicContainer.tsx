import {ReactNode} from 'react';
import {Keyboard, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {colorStyles} from '../../assets/styles/color';
import {screenSize} from '../../assets/styles/screenSize';

interface ContainerProps {
  children: ReactNode;
  paddingTop: number;
  paddingBottom?: number;
}

const BasicContainer = (props: ContainerProps) => {
  const containerStyle = {
    paddingTop: props.paddingTop,
    paddingBottom: props.paddingBottom,
    ...styles.container,
  };

  return (
    <Pressable style={containerStyle} onPress={Keyboard.dismiss}>
      {props.children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: screenSize.getVW(9.3),
    alignItems: 'center',
    backgroundColor: colorStyles.defaultWhite,
  },
});

export default BasicContainer;
