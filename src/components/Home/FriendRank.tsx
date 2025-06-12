import {StyleSheet, Text} from 'react-native';
import {View, Image} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import {fontStyle} from '../../assets/styles/fontStyles';
import {colorStyles} from '../../assets/styles/color';
import moneyFormatter from '../../util/moneyFormatter';

interface rankProps {
  rank: number;
  name: string;
  money: number;
}

const FriendRank = (props: rankProps) => {
  return (
    <View style={containerStyles.container}>
      <Text style={textStyles.rankText}>{props.rank}</Text>

      <Image
        src="https://shared-comic.pstatic.net/thumb/webtoon/828365/thumbnail/thumbnail_IMAG19_067b80a3-9517-43fb-8b71-570809875797.jpg"
        style={imageStyles.image}
      />

      <View style={textStyles.container}>
        <Text style={textStyles.title}>Bocchi The Invest!</Text>
        <Text style={textStyles.subTitle}>@bocchi</Text>
      </View>

      <Text style={textStyles.moneyText}>{moneyFormatter(props.money)}원</Text>
    </View>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(1.1),
    backgroundColor: colorStyles.defaultWhite,
    width: screenSize.getVW(82),
    height: screenSize.getVH(6.6),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const textStyles = StyleSheet.create({
  container: {
    marginLeft: screenSize.getVW(2.85),
  },
  rankText: {
    marginHorizontal: screenSize.getVW(2.85),
    width: screenSize.getVW(6.4),
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Bold,
    textAlign: 'center',
  },
  title: {
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Bold,
  },
  subTitle: {
    fontSize: screenSize.getVH(1.3),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.descriptionGray,
  },
  moneyText: {
    width: screenSize.getVW(28.5),
    fontSize: screenSize.getVH(1.6),
    letterSpacing: -0.5,
    fontFamily: fontStyle.SUIT.Bold,
    textAlign: 'right',
    color: colorStyles.descriptionGray,
  },
});

const imageStyles = StyleSheet.create({
  image: {
    width: screenSize.getVH(3.8),
    height: screenSize.getVH(3.8),
    borderRadius: 100,
  },
});

export default FriendRank;
