import {StyleSheet, View, Text} from 'react-native';
import {colorStyles} from '../../assets/styles/color';
import {ElementType} from 'react';
import {fontStyle} from '../../assets/styles/fontStyles';
import {screenSize} from '../../assets/styles/screenSize';

interface LandingPageProps {
  LandingImg: ElementType;
  titleText: string;
  description: string;
}

const LandingIdxPage = (props: LandingPageProps) => {
  return (
    <View style={styles.container}>
      <props.LandingImg width={screenSize.getVW(70)} />
      <Text style={styles.title}>{props.titleText}</Text>
      <Text style={styles.description}>{props.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: screenSize.getVH(52),
  },
  title: {
    fontSize: screenSize.getVH(3.3),
    fontFamily: fontStyle.SUIT.Bold,
    textAlign: 'center',
    color: colorStyles.basicText,
    marginTop: screenSize.getVH(3),
    letterSpacing: -0.5,
  },
  description: {
    fontSize: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Regular,
    textAlign: 'center',
    color: colorStyles.descriptionGray,
    marginTop: screenSize.getVH(2.2),
  },
});

export default LandingIdxPage;
