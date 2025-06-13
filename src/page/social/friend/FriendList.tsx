import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
  Text,
} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import SearchBar from '../../../components/common/inputs/SearchBar';
import {ScrollView} from 'react-native-gesture-handler';
import FriendDetailBtn from '../../../components/Social/friend/FriendDetailBtn';
import {useEffect, useState} from 'react';
import {FriendAPI} from '../../../api/friend';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {useNavigation, NavigationProp} from '@react-navigation/native';

interface friendProps {
  userId: string;
  username: string;
  profile: string;
}

const FriendList = () => {
  const navigator = useNavigation<NavigationProp<any>>();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [friendData, setFriendData] = useState<friendProps[]>([]);

  const handleKeywordChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setSearchKeyword(e.nativeEvent.text);
  };

  useEffect(() => {
    handleSearchFriend();
  }, []);

  const handleSearchFriend = () => {
    FriendAPI.getFriendList(searchKeyword)
      .then(response => {
        if (response.data) {
          setFriendData(response.data.friends);
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  const handleFriendDetailBtnPress = (userId: string) => {
    navigator.navigate('FriendDetail', {userId});
  };

  return (
    <View style={outerContainerStyle.container}>
      <SearchBar
        value={searchKeyword}
        searchBtnPressFunc={handleSearchFriend}
        onChangeFunc={handleKeywordChange}
      />

      <View style={bodyStyles.outerContainer}>
        <ScrollView style={bodyStyles.scrollView}>
          <View style={bodyStyles.innerContainer}>
            {friendData.length === 0 && (
              <Text style={textStyles.text}>
                {
                  '친구 목록이 비어있네요..\n같이 투자하고 경쟁할 친구를 추가해보세요!'
                }
              </Text>
            )}
            {friendData.map(datum => (
              <FriendDetailBtn
                key={datum.userId}
                username={datum.username}
                profile={datum.profile}
                userId={datum.userId}
                onPress={() => handleFriendDetailBtnPress(datum.userId)}
              />
            ))}
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

const textStyles = StyleSheet.create({
  text: {
    width: screenSize.getVW(80),
    marginTop: screenSize.getVH(1.1),
    fontSize: screenSize.getVH(1.6),
    color: colorStyles.descriptionGray,
    fontFamily: fontStyle.SUIT.Medium,
  },
});

export default FriendList;
