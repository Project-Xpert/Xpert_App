import {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import {ScrollView} from 'react-native-gesture-handler';

interface ContainerProps {
  children: ReactNode;
}

const InvestHomeContainer = (props: ContainerProps) => {
  return (
    <View>
      <ScrollView style={{width: screenSize.width}}>
        <TouchableOpacity style={styles.container} activeOpacity={1}>
          <View style={{width: screenSize.width - screenSize.getVW(9.8) * 2}}>
            {props.children}
          </View>
        </TouchableOpacity>
      </ScrollView>
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
