import {Text, TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import {fontStyle} from '../../assets/styles/fontStyles';
import {colorStyles} from '../../assets/styles/color';

interface NewsProps {
  imageLink: string;
  heading: string;
  companyName: string;
  onPress: () => void;
}

const HeadlineNews = (prop: NewsProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={prop.onPress}>
      <Image style={styles.headlineImg} src={prop.imageLink} />
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
        {prop.heading}
      </Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descrption}>{prop.companyName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: screenSize.getVW(3),
  },
  headlineImg: {
    width: screenSize.getVW(83.3),
    height: screenSize.getVH(24.4),
    borderRadius: screenSize.getVH(1.6),
  },
  title: {
    marginTop: screenSize.getVH(1.1),
    fontSize: screenSize.getVH(2),
    lineHeight: screenSize.getVH(2.7),
    width: screenSize.getVW(83.3),
    fontFamily: fontStyle.SUIT.SemiBold,
    color: colorStyles.basicText,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenSize.getVH(0.6),
  },
  descrption: {
    color: colorStyles.descriptionGray,
    fontFamily: fontStyle.SUIT.SemiBold,
  },
  separationCircle: {
    width: screenSize.getVH(0.4),
    height: screenSize.getVH(0.4),
    borderRadius: 100,
    backgroundColor: colorStyles.descriptionGray,
    marginHorizontal: screenSize.getVH(0.6),
  },
});

export default HeadlineNews;
