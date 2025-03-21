import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colorStyles} from '../../assets/styles/color';
import {fontStyle} from '../../assets/styles/fontStyles';
import {screenSize} from '../../assets/styles/screenSize';

interface NewsProps {
  imageLink?: string;
  heading: string;
  companyName: string;
  onPress: () => void;
}

const BasicNews = (prop: NewsProps) => {
  const containerStyle = {
    ...styles.container,
    height: prop.imageLink ? screenSize.getVH(10) : screenSize.getVH(8.5),
  };

  const titleStyle = {
    ...styles.title,
    width: prop.imageLink ? screenSize.getVW(45.2) : screenSize.getVW(70),
  };

  const textBoxStyle = {
    marginLeft: prop.imageLink ? screenSize.getVW(2.2) : screenSize.getVW(1.1),
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={prop.onPress}>
      {prop.imageLink && <Image style={styles.newsImg} src={prop.imageLink} />}
      <View style={textBoxStyle}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={titleStyle}>
          {prop.heading}
        </Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descrption}>{prop.companyName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenSize.getVW(82),
    marginBottom: screenSize.getVH(2.2),
  },
  newsImg: {
    width: screenSize.getVW(30),
    height: screenSize.getVH(10),
    borderRadius: screenSize.getVH(1.6),
  },
  title: {
    fontSize: screenSize.getVH(1.6),
    lineHeight: screenSize.getVH(2.7),
    fontFamily: fontStyle.SUIT.SemiBold,
    color: colorStyles.basicText,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenSize.getVH(0.6),
  },
  descrption: {
    fontSize: screenSize.getVH(1.3),
    color: colorStyles.descriptionGray,
    fontFamily: fontStyle.SUIT.SemiBold,
    letterSpacing: -screenSize.getVW(0.1),
  },
  separationCircle: {
    width: screenSize.getVH(0.4),
    height: screenSize.getVH(0.4),
    borderRadius: 100,
    backgroundColor: colorStyles.descriptionGray,
    marginHorizontal: screenSize.getVH(0.6),
  },
});

export default BasicNews;
