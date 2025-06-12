import {StyleSheet, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {ScrollView} from 'react-native-gesture-handler';
import FriendRank from '../../../components/Home/FriendRank';

const FriendRankingList = () => {
  return (
    <View style={outerContainerStyle.container}>
      <View style={bodyStyles.outerContainer}>
        <ScrollView style={bodyStyles.scrollView}>
          <View style={bodyStyles.innerContainer}>
            <FriendRank rank={1} name={'오송주'} money={100000} />
            <FriendRank rank={1} name={'오송주'} money={100000} />
            <FriendRank rank={1} name={'오송주'} money={100000} />
            <FriendRank rank={1} name={'오송주'} money={100000} />
            <FriendRank rank={1} name={'오송주'} money={100000} />
            <FriendRank rank={1} name={'오송주'} money={100000} />
            <FriendRank rank={1} name={'오송주'} money={100000} />
            <FriendRank rank={1} name={'오송주'} money={100000} />
            <FriendRank rank={1} name={'오송주'} money={100000} />
            <FriendRank rank={1} name={'오송주'} money={100000} />
            <FriendRank rank={1} name={'오송주'} money={100000} />
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
