import {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';

interface ContainerProps {
  children: ReactNode;
}

const InvestHomeContainer = (props: ContainerProps) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: screenSize.getVH(2.2),
    width: screenSize.width - screenSize.getVW(9.3 * 2),
  },
});

export default InvestHomeContainer;
