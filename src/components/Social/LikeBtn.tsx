import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import LikeIcon from '../../assets/image/icon/social/like.svg';
import {colorStyles} from '../../assets/styles/color';
import {fontStyle} from '../../assets/styles/fontStyles';

interface BtnProps {
  likeCnt: number;
}

const LikeBtn = (props: BtnProps) => {
  return (
    <TouchableOpacity style={likeStyles.container}>
      <LikeIcon width={screenSize.getVH(1.2)} height={screenSize.getVH(1.2)} />
      <Text style={likeStyles.text}>{props.likeCnt}</Text>
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
});

export default LikeBtn;
