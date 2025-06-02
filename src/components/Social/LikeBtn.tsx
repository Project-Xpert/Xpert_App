import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import LikeIcon from '../../assets/image/icon/social/like.svg';
import EnabledLikeIcon from '../../assets/image/icon/social/likeEnabled.svg';
import {colorStyles} from '../../assets/styles/color';
import {fontStyle} from '../../assets/styles/fontStyles';
import {CommentAPI} from '../../api/comment';
import {ReplyAPI} from '../../api/reply';

interface BtnProps {
  id: string;
  likeCnt: number;
  enabled: boolean;
  type: 'comment' | 'reply';
  refreshFunc: () => void;
}

const LikeBtn = (props: BtnProps) => {
  const onPress = () => {
    if (props.type === 'comment') {
      CommentAPI.toggleCommentLike(props.id)
        .then(response => {
          props.refreshFunc();
        })
        .catch(e => {
          console.error(e);
        });
    } else if (props.type === 'reply') {
      ReplyAPI.toggleReplyLike(props.id)
        .then(response => {
          props.refreshFunc();
        })
        .catch(e => console.error(e));
    }
  };

  return (
    <TouchableOpacity style={likeStyles.container} onPress={onPress}>
      {props.enabled ? (
        <EnabledLikeIcon
          width={screenSize.getVH(1.2)}
          height={screenSize.getVH(1.2)}
        />
      ) : (
        <LikeIcon
          width={screenSize.getVH(1.2)}
          height={screenSize.getVH(1.2)}
        />
      )}
      <Text style={props.enabled ? likeStyles.enabledText : likeStyles.text}>
        {props.likeCnt}
      </Text>
    </TouchableOpacity>
  );
};

const likeStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: screenSize.getVW(1),
    fontSize: screenSize.getVH(1.6),
    color: colorStyles.descriptionGray,
    fontFamily: fontStyle.SUIT.ExtraBold,
  },
  enabledText: {
    marginLeft: screenSize.getVW(1),
    fontSize: screenSize.getVH(1.6),
    color: colorStyles.mainColor,
    fontFamily: fontStyle.SUIT.ExtraBold,
  },
});

export default LikeBtn;
