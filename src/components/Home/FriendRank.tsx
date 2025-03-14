import {StyleSheet, Text} from 'react-native';
import {View, Image} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import {fontStyle} from '../../assets/styles/fontStyles';
import {colorStyles} from '../../assets/styles/color';

interface rankProps {
  rank: number;
  name: string;
  money: number;
}

const FriendRank = (props: rankProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.rankText}>{props.rank}</Text>
      <Image
        src="https://shared-comic.pstatic.net/thumb/webtoon/828365/thumbnail/thumbnail_IMAG19_067b80a3-9517-43fb-8b71-570809875797.jpg"
        style={styles.image}
      />
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.descirption}>{props.money}원</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenSize.getVW(82),
    height: screenSize.getVH(6.6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankText: {
    width: screenSize.getVW(6.4),
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Bold,
    textAlign: 'center',
  },
  image: {
    width: screenSize.getVH(4.4),
    height: screenSize.getVH(4.4),
    borderRadius: 100,
    marginHorizontal: screenSize.getVW(3),
  },
  name: {
    width: screenSize.getVW(28.5),
    fontSize: screenSize.getVH(2.2),
    letterSpacing: -0.5,
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  descirption: {
    width: screenSize.getVW(28.5),
    fontSize: screenSize.getVH(1.6),
    letterSpacing: -0.5,
    fontFamily: fontStyle.SUIT.Bold,
    textAlign: 'right',
    color: colorStyles.descriptionGray,
  },
});

export default FriendRank;
