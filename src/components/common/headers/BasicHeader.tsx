import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import LeftArrowBtn from '../../../assets/image/icon/button/leftArrowBtn.svg';
import {Text} from 'react-native-gesture-handler';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {screenSize} from '../../../assets/styles/screenSize';

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
    width: screenSize.width,
    height: screenSize.getVH(7.7),
    position: 'absolute',
    top: screenSize.getVH(6.6),
  },
  arrowBtn: {
    position: 'absolute',
    left: screenSize.getVW(11.6),
  },
  text: {
    fontFamily: fontStyle.SUIT.SemiBold,
    letterSpacing: -0.5,
    lineHeight: screenSize.getVH(3.3),
    fontSize: screenSize.getVH(2.7),
  },
});

export default BasicHeader;
