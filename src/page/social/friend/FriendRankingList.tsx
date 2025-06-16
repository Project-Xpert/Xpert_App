import {StyleSheet, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {ScrollView} from 'react-native-gesture-handler';
import FriendRank from '../../../components/Home/FriendRank';
import {useEffect, useState} from 'react';
import {FriendAPI} from '../../../api/friend';

interface userProp {
  username: string;
  userId: string;
  profile: string;
  money: number;
}

const FriendRankingList = () => {
  const [rankingData, setRankingData] = useState<userProp[]>([]);

  const renderFriendRankingData = () => {
    FriendAPI.getRanking()
      .then(response => {
        if (response.data) {
          setRankingData(response.data.friends);
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  useEffect(() => {
    renderFriendRankingData();
  }, []);

  return (
    <View style={outerContainerStyle.container}>
      <View style={bodyStyles.outerContainer}>
        <ScrollView style={bodyStyles.scrollView}>
          <View style={bodyStyles.innerContainer}>
            {rankingData.map((datum, idx) => (
              <FriendRank
                key={datum.userId}
                rank={idx + 1}
                money={datum.money}
                profile={datum.profile}
                userId={datum.userId}
                username={datum.username}
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
    height: screenSize.getVH(63.2),
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

export default FriendRankingList;
