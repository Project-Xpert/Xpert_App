import {ReactNode} from 'react';
import {Keyboard, Pressable, StyleSheet, View} from 'react-native';
import {colorStyles} from '../../assets/styles/color';

interface ContainerProps {
  children: ReactNode;
  paddingTop: number;
}

const BasicContainer = (props: ContainerProps) => {
  const containerStyle = {
    paddingTop: props.paddingTop,
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
    paddingHorizontal: 35,
    alignItems: 'center',
    backgroundColor: colorStyles.defaultWhite,
  },
});

export default BasicContainer;
