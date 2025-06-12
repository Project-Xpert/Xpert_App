import {StyleSheet, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import LongBtn from '../../../components/common/buttons/LongBtn';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import {useState} from 'react';
import BottomNav from '../../../components/common/BottomNav';
import FriendList from './FriendList';
import FriendAddList from './FriendAddList';
import FriendRankingList from './FriendRankingList';

const FriendHome = () => {
  const [page, setPage] = useState<'info' | 'add' | 'ranking'>('info');

  const handleChangePage = (newPage: 'info' | 'add' | 'ranking') => {
    setPage(newPage);
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.3)}>
      <BasicHeader text={'친구 정보'} />
      <View style={topBtnContainerStyles.container}>
        <LongBtn
          text={'친구 관리'}
          selected={page === 'info'}
          onClick={() => handleChangePage('info')}
        />
        <LongBtn
          text={'친구 추가'}
          selected={page === 'add'}
          onClick={() => handleChangePage('add')}
        />
        <LongBtn
          text={'친구 랭킹'}
          selected={page === 'ranking'}
          onClick={() => handleChangePage('ranking')}
        />
      </View>

      <View style={contentStyles.container}>
        {page === 'info' && <FriendList />}
        {page === 'add' && <FriendAddList />}
        {page === 'ranking' && <FriendRankingList />}
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

const contentStyles = StyleSheet.create({
  container: {
    width: screenSize.width,
    height: screenSize.getVH(65.4),
  },
});

export default FriendHome;
