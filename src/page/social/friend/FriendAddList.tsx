import {
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';
import SearchBar from '../../../components/common/inputs/SearchBar';
import {useEffect, useState} from 'react';
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

interface requesterProps {
  userId: string;
  username: string;
  profile: string;
}

const FriendAddList = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [mode, setMode] = useState<'request' | 'newFriend'>('request');
  const [newFriendData, setNewFriendData] = useState<userProps[]>([]);
  const [requesterData, setRequesterData] = useState<requesterProps[]>([]);

  const handleKeywordChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setSearchKeyword(e.nativeEvent.text);
  };

  useEffect(() => {
    renderRequestData();
  }, []);

  const renderSearchData = () => {
    FriendAPI.searchNonFriendUsers(searchKeyword)
      .then(response => {
        if (response.data) {
          setNewFriendData(response.data.users);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const renderRequestData = () => {
    FriendAPI.getRequesters()
      .then(response => {
        if (response.data) {
          setRequesterData(response.data.friends);
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  const handleSearchUser = () => {
    if (searchKeyword.length > 0) {
      renderSearchData();
      setMode('newFriend');
    } else {
      renderRequestData();
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

  const acceptFriendRequestHandler = (userId: string) => {
    FriendAPI.acceptFriendRequest(userId)
      .then(response => renderRequestData())
      .catch(e => {
        console.error(e);
      });
  };

  const denyFriendRequestHandler = (userId: string) => {
    FriendAPI.deleteFriend(userId)
      .then(response => renderRequestData())
      .catch(e => {
        console.error(e);
      });
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
            <View>
              {requesterData.length === 0 && (
                <Text style={textStyles.text}>
                  지금은 새로운 친구 요청이 없어요!
                </Text>
              )}
              <View style={bodyStyles.innerContainer}>
                {requesterData.map(datum => (
                  <FriendRequestItem
                    key={datum.userId}
                    profile={datum.profile}
                    username={datum.username}
                    userId={datum.userId}
                    onAcceptBtnPress={() =>
                      acceptFriendRequestHandler(datum.userId)
                    }
                    onDenyBtnPress={() =>
                      denyFriendRequestHandler(datum.userId)
                    }
                  />
                ))}
              </View>
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
