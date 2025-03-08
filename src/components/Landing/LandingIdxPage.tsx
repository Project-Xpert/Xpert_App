import {StyleSheet, View, Text} from 'react-native';
import {colorStyles} from '../../assets/styles/color';
import {ElementType} from 'react';
import {fontStyle} from '../../assets/styles/fontStyles';

interface LandingPageProps {
  LandingImg: ElementType;
  titleText: string;
  description: string;
}

const LandingIdxPage = (props: LandingPageProps) => {
  return (
    <View style={styles.container}>
      <props.LandingImg />
      <Text style={styles.title}>{props.titleText}</Text>
      <Text style={styles.description}>{props.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 500,
  },
  title: {
    fontSize: 30,
    fontFamily: fontStyle.SUIT.Bold,
    textAlign: 'center',
    color: colorStyles.basicText,
    marginTop: 45,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 18,
    fontFamily: fontStyle.SUIT.Regular,
    textAlign: 'center',
    color: colorStyles.descriptionGray,
    marginTop: 20,
  },
});

export default LandingIdxPage;
