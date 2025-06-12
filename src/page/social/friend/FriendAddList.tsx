import {
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from 'react-native';
import SearchBar from '../../../components/common/inputs/SearchBar';
import {useState} from 'react';
import {screenSize} from '../../../assets/styles/screenSize';
import FriendRequestItem from '../../../components/Social/friend/FriendRequestItem';

const FriendAddList = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleKeywordChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setSearchKeyword(e.nativeEvent.text);
  };

  const handleSearchUser = () => {
    // todo) search api 완성시 연동하기
  };

  return (
    <View style={outerContainerStyle.container}>
      <SearchBar
        value={searchKeyword}
        searchBtnPressFunc={handleSearchUser}
        onChangeFunc={handleKeywordChange}
      />

      <View style={bodyStyles.outerContainer}>
        <ScrollView style={bodyStyles.scrollView}>
          <View style={bodyStyles.innerContainer}>
            <FriendRequestItem />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const outerContainerStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
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

export default FriendAddList;
