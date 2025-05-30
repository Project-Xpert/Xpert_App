import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import BasicContainer from '../../components/common/BasicContainer';
import SmallBtn from '../../components/common/buttons/SmallBtn';
import BasicHeader from '../../components/common/headers/BasicHeader';
import {useEffect, useState} from 'react';
import {fontStyle} from '../../assets/styles/fontStyles';
import {colorStyles} from '../../assets/styles/color';
import BottomNav from '../../components/common/BottomNav';
import PostListItem from '../../components/Social/PostListItem';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PostAPI} from '../../api/post';
import CreatePostBtn from '../../components/Social/CreatePostBtn';

interface PostItem {
  postId: string;
  writer: string;
  title: string;
  createdAt: string;
  likeCnt: number;
  commentCnt: number;
}

const PostList = () => {
  const navigator = useNavigation<NavigationProp<any>>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mode, setMode] = useState<'new' | 'popularity'>('new');
  const [postList, setPostList] = useState<PostItem[]>([]);
  const [sortedList, setSortedList] = useState<PostItem[]>([]);

  useEffect(() => {
    PostAPI.getPostList()
      .then(response => {
        if (response.data) {
          setTimeout(() => {
            setIsRefreshing(false);
            setPostList(response.data.posts);
          }, 200);
        }
      })
      .catch(e => {
        console.error(e);
      });
  }, [isRefreshing]);

  useEffect(() => {
    if (mode === 'new') {
      setSortedList(
        [...postList].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      );
    } else if (mode === 'popularity') {
      setSortedList(
        [...postList].sort(
          (a, b) => b.likeCnt - a.likeCnt || b.commentCnt - a.commentCnt,
        ),
      );
    }
  }, [mode, postList]);

  const handleModeChange = (mode: 'new' | 'popularity') => {
    setMode(mode);
  };

  const handlePostPress = (postId: string) => {
    navigator.navigate('PostDetail', {postId});
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(0)}>
      <View style={refreshScrollContainer.outerContainer}>
        <ScrollView
          style={refreshScrollContainer.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => setIsRefreshing(true)}
            />
          }>
          <View style={refreshScrollContainer.innerContainer}>
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
                  {sortedList.map((post, idx) => {
                    return (
                      <PostListItem
                        key={post.postId}
                        hideUpperLine={idx !== 0}
                        onPress={() => {
                          handlePostPress(post.postId);
                        }}
                        writer={post.writer}
                        title={post.title}
                        createdAt={post.createdAt}
                        likeCnt={post.likeCnt}
                        commentCnt={post.commentCnt}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>

        <CreatePostBtn />

        <BottomNav pageName={'Social'} />
      </View>
    </BasicContainer>
  );
};

const refreshScrollContainer = StyleSheet.create({
  outerContainer: {
    width: screenSize.width,
    height: screenSize.getVH(90),
  },
  scrollView: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: screenSize.getVH(3),
  },
});

const topDescriptionStyles = StyleSheet.create({
  text: {
    paddingTop: screenSize.getVH(9.2),
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
    height: screenSize.getVH(67.6),
    marginTop: screenSize.getVH(2.7),
  },
  innerContainer: {
    width: screenSize.getVW(100),
    alignItems: 'center',
  },
});

export default PostList;
