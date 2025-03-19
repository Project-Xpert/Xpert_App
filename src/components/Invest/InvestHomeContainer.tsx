import {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import {ScrollView} from 'react-native-gesture-handler';

interface ContainerProps {
  children: ReactNode;
  disableScrollView?: boolean;
}

const InvestHomeContainer = (props: ContainerProps) => {
  return (
    <View>
      {!props.disableScrollView && (
        <ScrollView style={{width: screenSize.width}}>
          <View style={styles.container}>
            <View style={{width: screenSize.width - screenSize.getVW(9.8) * 2}}>
              {props.children}
            </View>
          </View>
        </ScrollView>
      )}
      {props.disableScrollView && (
        <View style={styles.container}>
          <View style={{width: screenSize.width - screenSize.getVW(9.8) * 2}}>
            {props.children}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenSize.width,
    alignItems: 'center',
  },
});

export default InvestHomeContainer;
