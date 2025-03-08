import {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

interface ContainerProps {
  children: ReactNode;
  paddingTop: number;
}

const BasicContainer = (props: ContainerProps) => {
  const containerStyle = {
    paddingTop: props.paddingTop,
    ...styles.container,
  };

  return <View style={containerStyle}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BasicContainer;
