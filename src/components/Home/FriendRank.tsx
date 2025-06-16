import {StyleSheet, Text} from 'react-native';
import {View, Image} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import {fontStyle} from '../../assets/styles/fontStyles';
import {colorStyles} from '../../assets/styles/color';
import moneyFormatter from '../../util/moneyFormatter';
import useUserData from '../../data/userData';

interface rankProps {
  rank: number;
  profile: string;
  userId: string;
  username: string;
  money: number;
}

const getRankingIcon = (rank: number) => {
  if (rank == 1) {
    return '🥇';
  } else if (rank == 2) {
    return '🥈';
  } else if (rank == 3) {
    return '🥉';
  } else {
    return rank;
  }
};

const FriendRank = (props: rankProps) => {
  const {userId} = useUserData();

  const containerStyle = {
    ...containerStyles.container,
    borderColor:
      props.userId === userId
        ? colorStyles.mainColor
        : colorStyles.defaultWhite,
  };

  return (
    <View style={containerStyle}>
      <Text style={textStyles.rankText}>{getRankingIcon(props.rank)}</Text>

      <Image src={props.profile} style={imageStyles.image} />

      <View style={textStyles.container}>
        <Text style={textStyles.title}>
          {props.username}
          {userId === props.userId && (
            <Text style={textStyles.highlighted}> (나)</Text>
          )}
        </Text>
        <Text style={textStyles.subTitle}>@{props.userId}</Text>
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
    borderRadius: screenSize.getVH(1.5),
    borderWidth: screenSize.getVH(0.2),
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
    width: screenSize.getVW(30.6),
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Bold,
  },
  subTitle: {
    width: screenSize.getVW(30.6),
    fontSize: screenSize.getVH(1.3),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.descriptionGray,
  },
  moneyText: {
    width: screenSize.getVW(25.5),
    fontSize: screenSize.getVH(1.6),
    letterSpacing: -0.5,
    fontFamily: fontStyle.SUIT.Bold,
    textAlign: 'right',
    color: colorStyles.descriptionGray,
  },
  highlighted: {
    color: colorStyles.mainColor,
    fontSize: screenSize.getVH(1.5),
    fontFamily: fontStyle.SUIT.Bold,
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
