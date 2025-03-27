import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import CommentIcon from '../../assets/image/icon/social/comment.svg';
import LikeIcon from '../../assets/image/icon/social/like.svg';
import {fontStyle} from '../../assets/styles/fontStyles';
import {colorStyles} from '../../assets/styles/color';

interface RankingProps {
  hideLineBelow: boolean;
  title: string;
  writer: string;
  rank: number;
  commentCnt: number;
  likeCnt: number;
  imageUrl?: string;
}

const PostRanking = (props: RankingProps) => {
  return (
    <View>
      <TouchableOpacity style={rankingStyle.container}>
        <Text style={rankingStyle.rankingText}>{`${props.rank}위`}</Text>

        <View style={rankingStyle.leftInnerContainer}>
          <Text style={rankingStyle.writer}>{props.writer}</Text>
          <Text
            style={rankingStyle.title}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {props.title}
          </Text>
          <View style={rankingStyle.flexRowContainer}>
            <CommentIcon
              width={screenSize.getVH(1.1)}
              height={screenSize.getVH(1.1)}
            />
            <Text style={rankingStyle.number}>{props.commentCnt}</Text>
            <LikeIcon
              width={screenSize.getVH(1.1)}
              height={screenSize.getVH(1.1)}
            />
            <Text style={rankingStyle.number}>{props.likeCnt}</Text>
          </View>
        </View>

        {props.imageUrl && (
          <Image style={rankingStyle.image} src={props.imageUrl} />
        )}
      </TouchableOpacity>

      {props.hideLineBelow || <View style={lineStyles.line} />}
    </View>
  );
};

const rankingStyle = StyleSheet.create({
  container: {
    marginVertical: screenSize.getVH(1.6),
    width: screenSize.getVW(82),
    height: screenSize.getVH(6.1),
    flexDirection: 'row',
  },
  rankingText: {
    color: colorStyles.descriptionGray,
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Bold,
  },
  flexRowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftInnerContainer: {
    height: screenSize.getVH(6.1),
    justifyContent: 'space-between',
    marginLeft: screenSize.getVW(2.8),
  },
  writer: {
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.descriptionGray,
  },
  title: {
    width: screenSize.getVW(58.3),
    fontSize: screenSize.getVH(1.6),
    lineHeight: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
    overflow: 'hidden',
  },
  number: {
    fontSize: screenSize.getVH(1.3),
    fontFamily: fontStyle.SUIT.ExtraBold,
    color: colorStyles.descriptionGray,
    marginHorizontal: screenSize.getVW(1.2),
  },
  image: {
    width: screenSize.getVH(6.1),
    height: screenSize.getVH(6.1),
    borderRadius: screenSize.getVH(1.6),
  },
});

const lineStyles = StyleSheet.create({
  line: {
    width: screenSize.getVW(82),
    height: screenSize.getVH(0.1),
    backgroundColor: colorStyles.descriptionGray,
  },
});

export default PostRanking;
