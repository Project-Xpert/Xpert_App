import {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

interface ContainerProps {
  children: ReactNode;
}

const BasicContainer = (props: ContainerProps) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BasicContainer;
