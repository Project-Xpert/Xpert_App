import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import LongBtn from '../../../components/common/buttons/LongBtn';
import SearchBar from '../../../components/common/inputs/SearchBar';
import {ScrollView} from 'react-native-gesture-handler';
import BottomNav from '../../../components/common/BottomNav';
import FriendDetailBtn from '../../../components/Social/friend/FriendDetailBtn';
import {useState} from 'react';

const FriendList = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleKeywordChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setSearchKeyword(e.nativeEvent.text);
  };

  const handleSearchFriend = () => {
    // todo) search api 완성시 연동하기
  };

  const handleFriendDetailBtnPress = () => {
    // todo) detail api 완성시 연동하기
  };

  const handleChangePage = () => {};

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.2)}>
      <BasicHeader text={'친구 정보'} />

      <View style={topBtnContainerStyles.container}>
        <LongBtn
          text={'친구 관리'}
          selected={true}
          onClick={handleChangePage}
        />
        <LongBtn
          text={'친구 추가'}
          selected={false}
          onClick={handleChangePage}
        />
        <LongBtn
          text={'친구 랭킹'}
          selected={false}
          onClick={handleChangePage}
        />
      </View>

      <SearchBar
        value={searchKeyword}
        searchBtnPressFunc={handleSearchFriend}
        onChangeFunc={handleKeywordChange}
      />

      <View style={bodyStyles.outerContainer}>
        <ScrollView style={bodyStyles.scrollView}>
          <View style={bodyStyles.innerContainer}>
            <FriendDetailBtn onPress={handleFriendDetailBtnPress} />
            <FriendDetailBtn onPress={handleFriendDetailBtnPress} />
            <FriendDetailBtn onPress={handleFriendDetailBtnPress} />
            <FriendDetailBtn onPress={handleFriendDetailBtnPress} />
          </View>
        </ScrollView>
      </View>

      <BottomNav pageName={'Social'} />
    </BasicContainer>
  );
};

const topBtnContainerStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(1.1),
    flexDirection: 'row',
    width: screenSize.getVW(84),
    justifyContent: 'space-between',
  },
});

const bodyStyles = StyleSheet.create({
  outerContainer: {
    width: screenSize.width,
    height: screenSize.getVH(56.6),
    marginTop: screenSize.getVH(2.2),
  },
  scrollView: {
    flex: 1,
  },
  innerContainer: {
    width: screenSize.width,
    alignItems: 'center',
  },
});

export default FriendList;
