import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import {fontStyle} from '../../assets/styles/fontStyles';
import {colorStyles} from '../../assets/styles/color';
import LikeBtn from './LikeBtn';

interface CommentProps {
  profile: string;
  writer: string;
  content: string;
  createdAt: string;
  likeCnt: number;
}

const Comment = (props: CommentProps) => {
  return (
    <View style={commentStyles.container}>
      <Image src={props.profile} style={commentStyles.profile} />
      <View style={commentStyles.innerContainer}>
        <Text style={commentStyles.title}>{props.writer}</Text>
        <Text style={commentStyles.content}>{props.content}</Text>

        <View style={commentStyles.bottomDescriptionContainer}>
          <Text style={commentStyles.description}>{props.createdAt}</Text>
          <TouchableOpacity>
            <Text style={commentStyles.description}>답글</Text>
          </TouchableOpacity>
          <LikeBtn likeCnt={props.likeCnt} />
        </View>
      </View>
    </View>
  );
};

const commentStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(2.2),
    width: screenSize.getVW(82),
    flexDirection: 'row',
  },
  innerContainer: {
    marginLeft: screenSize.getVW(2.3),
    width: screenSize.getVW(68),
  },
  profile: {
    width: screenSize.getVH(4.4),
    height: screenSize.getVH(4.4),
    borderRadius: 100,
  },
  title: {
    fontSize: screenSize.getVH(1.8),
    lineHeight: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  content: {
    marginTop: screenSize.getVH(0.5),
    fontSize: screenSize.getVH(1.6),
    lineHeight: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.basicText,
  },
  bottomDescriptionContainer: {
    marginTop: screenSize.getVH(0.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    color: colorStyles.descriptionGray,
    fontSize: screenSize.getVH(1.5),
    marginRight: screenSize.getVW(3),
  },
});

export default Comment;
