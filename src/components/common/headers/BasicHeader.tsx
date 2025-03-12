import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import LeftArrowBtn from '../../../assets/image/icon/button/leftArrowBtn.svg';
import {Text} from 'react-native-gesture-handler';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface HeaderProps {
  text: string;
  hideArrowBtn?: boolean;
  btnNavigate?: string;
}

const BasicHeader = (props: HeaderProps) => {
  const navigator = useNavigation<NavigationProp<any>>();

  const onArrowPress = () => {
    navigator.goBack();
  };

  return (
    <View style={styles.container}>
      {!props.hideArrowBtn && (
        <TouchableOpacity style={styles.arrowBtn} onPress={onArrowPress}>
          <LeftArrowBtn />
        </TouchableOpacity>
      )}
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: Dimensions.get('screen').width,
    height: 70,
    position: 'absolute',
    top: 70,
  },
  arrowBtn: {
    position: 'absolute',
    left: 40,
  },
  text: {
    fontFamily: fontStyle.SUIT.SemiBold,
    letterSpacing: -0.5,
    lineHeight: 30,
    fontSize: 25,
  },
});

export default BasicHeader;
