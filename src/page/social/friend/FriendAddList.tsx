import {
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';
import SearchBar from '../../../components/common/inputs/SearchBar';
import {useState} from 'react';
import {screenSize} from '../../../assets/styles/screenSize';
import FriendRequestItem from '../../../components/Social/friend/FriendRequestItem';
import AddFriendBtn from '../../../components/Social/friend/AddFriendBtn';
import {FriendAPI} from '../../../api/friend';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';

interface userProps {
  userId: string;
  username: string;
  profile: string;
  hadRequested: boolean;
}

const FriendAddList = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [mode, setMode] = useState<'request' | 'newFriend'>('request');
  const [newFriendData, setNewFriendData] = useState<userProps[]>([]);

  const handleKeywordChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setSearchKeyword(e.nativeEvent.text);
  };

  const renderSearchData = () => {
    FriendAPI.searchNonFriendUsers(searchKeyword)
      .then(response => {
        console.log(response.data);
        if (response.data) {
          setNewFriendData(response.data.users);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleSearchUser = () => {
    if (searchKeyword.length > 0) {
      renderSearchData();
      setMode('newFriend');
    } else {
      setMode('request');
    }
  };

  const onBtnPress = (userId: string, hadRequested: boolean) => {
    if (hadRequested) {
      FriendAPI.deleteFriend(userId)
        .then(response => renderSearchData())
        .catch(e => {
          console.error(e);
        });
    } else {
      FriendAPI.addFriend(userId)
        .then(response => renderSearchData())
        .catch(e => {
          console.error(e);
        });
    }
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
          {mode === 'request' ? (
            <View style={bodyStyles.innerContainer}>
              <FriendRequestItem />
            </View>
          ) : (
            <View>
              {newFriendData.length === 0 && (
                <Text style={textStyles.text}>
                  이런! 해당되는 유저가 한명도 없네요!
                </Text>
              )}
              <View style={bodyStyles.innerContainer}>
                {newFriendData.map(datum => (
                  <AddFriendBtn
                    key={datum.userId}
                    userId={datum.userId}
                    username={datum.username}
                    profile={datum.profile}
                    hadRequested={datum.hadRequested}
                    onPress={() => onBtnPress(datum.userId, datum.hadRequested)}
                  />
                ))}
              </View>
            </View>
          )}
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

const textStyles = StyleSheet.create({
  text: {
    width: screenSize.getVW(80),
    marginTop: screenSize.getVH(1.1),
    marginLeft: screenSize.getVW(9.8),
    fontSize: screenSize.getVH(1.6),
    color: colorStyles.descriptionGray,
    fontFamily: fontStyle.SUIT.Medium,
  },
});

export default FriendAddList;
