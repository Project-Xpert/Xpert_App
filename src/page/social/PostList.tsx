import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import BasicContainer from '../../components/common/BasicContainer';
import SmallBtn from '../../components/common/buttons/SmallBtn';
import BasicHeader from '../../components/common/headers/BasicHeader';
import {useState} from 'react';
import {fontStyle} from '../../assets/styles/fontStyles';
import {colorStyles} from '../../assets/styles/color';
import BottomNav from '../../components/common/BottomNav';
import PostListItem from '../../components/Social/PostListItem';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const PostList = () => {
  const navigator = useNavigation<NavigationProp<any>>();
  const [mode, setMode] = useState<'new' | 'popularity'>('new');

  const handleModeChange = (mode: 'new' | 'popularity') => {
    setMode(mode);
  };

  const handlePostPress = () => {
    navigator.navigate('PostDetail');
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.2)}>
      <BasicHeader text="커뮤니티" />

      <Text style={topDescriptionStyles.text}>
        {
          '게시판에서 자유롭게 이야기를 나눠보세요!\n과도한 욕설 및 비방포현은 사전 공지 없이 삭제조치 됩니다'
        }
      </Text>

      <View style={topBtnStyles.container}>
        <View style={topBtnStyles.innerContainer}>
          <SmallBtn
            text={'최신순'}
            selected={mode === 'new'}
            onClick={() => handleModeChange('new')}
          />
          <SmallBtn
            text={'인기순'}
            selected={mode === 'popularity'}
            onClick={() => handleModeChange('popularity')}
          />
        </View>
      </View>

      <View style={scrollViewStyle.container}>
        <ScrollView>
          <View style={scrollViewStyle.innerContainer}>
            <PostListItem onPress={handlePostPress} />
            <PostListItem hideUpperLine onPress={handlePostPress} />
            <PostListItem hideUpperLine onPress={handlePostPress} />
            <PostListItem hideUpperLine onPress={handlePostPress} />
          </View>
        </ScrollView>
      </View>

      <BottomNav pageName={'Social'} />
    </BasicContainer>
  );
};

const topDescriptionStyles = StyleSheet.create({
  text: {
    fontSize: screenSize.getVH(1.6),
    lineHeight: screenSize.getVH(2.7),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.descriptionGray,
  },
});

const topBtnStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(2.2),
    width: screenSize.getVW(82),
  },
  innerContainer: {
    width: screenSize.getVW(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const scrollViewStyle = StyleSheet.create({
  container: {
    width: screenSize.getVW(100),
    height: screenSize.getVH(56.6),
    marginTop: screenSize.getVH(2.7),
  },
  innerContainer: {
    width: screenSize.getVW(100),
    alignItems: 'center',
  },
});

export default PostList;
