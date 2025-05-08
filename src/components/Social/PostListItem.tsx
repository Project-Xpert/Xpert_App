import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import {colorStyles} from '../../assets/styles/color';
import {fontStyle} from '../../assets/styles/fontStyles';
import CommentIcon from '../../assets/image/icon/social/comment.svg';
import LikeIcon from '../../assets/image/icon/social/like.svg';

interface itemProps {
  hideUpperLine?: boolean;
  writer: string;
  title: string;
  createdAt: string;
  likeCnt: number;
  commentCnt: number;
  onPress: () => void;
}

const PostListItem = (prop: itemProps) => {
  return (
    <TouchableOpacity onPress={prop.onPress}>
      {prop.hideUpperLine || <View style={lineStyles.line} />}

      <View style={itemStyles.container}>
        <Text style={titleStyles.text} ellipsizeMode="tail" numberOfLines={1}>
          {prop.title}
        </Text>
        <View style={itemStyles.bottomInnerContainer}>
          <View style={descriptionStyles.container}>
            <Text style={descriptionStyles.text}>{prop.writer}</Text>
            <View style={descriptionStyles.circle} />
            <Text style={descriptionStyles.text}>{prop.createdAt}</Text>
          </View>

          <View style={bottomCntStyles.container}>
            <View style={bottomCntStyles.innerContainer}>
              <LikeIcon />
              <Text style={bottomCntStyles.text}>{prop.likeCnt}</Text>
            </View>
            <View style={bottomCntStyles.innerContainer}>
              <CommentIcon />
              <Text style={bottomCntStyles.text}>{prop.commentCnt}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={lineStyles.line} />
    </TouchableOpacity>
  );
};

const itemStyles = StyleSheet.create({
  container: {
    width: screenSize.getVW(82),
    paddingHorizontal: screenSize.getVW(4.75),
    marginVertical: screenSize.getVH(2.2),
  },
  bottomInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenSize.getVW(74),
    marginTop: screenSize.getVH(0.5),
  },
});

const titleStyles = StyleSheet.create({
  text: {
    fontSize: screenSize.getVH(1.6),
    color: colorStyles.basicText,
    fontFamily: fontStyle.SUIT.Medium,
  },
});

const descriptionStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: screenSize.getVH(1.3),
    color: colorStyles.descriptionGray,
    fontFamily: fontStyle.SUIT.Medium,
  },
  circle: {
    borderRadius: 100,
    width: screenSize.getVH(0.4),
    height: screenSize.getVH(0.4),
    marginHorizontal: screenSize.getVW(1),
    backgroundColor: colorStyles.descriptionGray,
  },
});

const bottomCntStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenSize.getVW(18.8),
    justifyContent: 'space-between',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: screenSize.getVW(0.5),
    width: screenSize.getVW(5.2),
    fontSize: screenSize.getVH(1.3),
    fontFamily: fontStyle.SUIT.ExtraBold,
    color: colorStyles.descriptionGray,
  },
});

const lineStyles = StyleSheet.create({
  line: {
    width: screenSize.getVW(82),
    height: screenSize.getVH(0.1),
    backgroundColor: colorStyles.descriptionGray,
  },
});

export default PostListItem;
