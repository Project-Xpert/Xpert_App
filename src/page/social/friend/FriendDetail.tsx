import {Image, StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BottomNav from '../../../components/common/BottomNav';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import React, {useEffect, useState} from 'react';
import {FriendAPI} from '../../../api/friend';
import moneyFormatter from '../../../util/moneyFormatter';
import CoinImg from '../../../assets/image/home/coin.svg';
import Button from '../../../components/common/buttons/Button';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface userProp {
  username: string;
  userId: string;
  profile: string;
  money: number;
}

const FriendDetail = ({route}: any) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [data, setData] = useState<userProp>();
  const userId = route.params.userId;

  const renderUserDetail = () => {
    FriendAPI.getUserDetail(userId)
      .then(response => {
        if (response.data) {
          setData(response.data);
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  useEffect(() => {
    renderUserDetail();
  }, []);

  const sendMoneyEventHandler = () => {
    if (data) {
      navigation.navigate('SendMoney', {userId, username: data.username});
    }
  };

  const deleteFriendHandler = () => {
    if (data) {
      FriendAPI.deleteFriend(data.userId)
        .then(request => {
          navigation.navigate('Social');
          navigation.navigate('Friend');
        })
        .catch(e => {
          console.error(e);
        });
    }
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.2)}>
      <BasicHeader text={'친구 상세 정보'} />

      {data && (
        <View>
          <View style={topUserInfoStyles.container}>
            <Image style={topUserInfoStyles.profile} src={data.profile} />

            <View style={topUserInfoStyles.innerTextContainer}>
              <Text style={topUserInfoStyles.username}>{data.username}님</Text>
              <Text style={topUserInfoStyles.handle}>@{data.userId}</Text>
            </View>
          </View>

          <View style={infoBoxStyle.container}>
            <CoinImg
              width={screenSize.getVH(7.7)}
              height={screenSize.getVH(7.7)}
            />
            <View style={infoBoxStyle.innerTextContainer}>
              <Text style={infoBoxStyle.mainText}>
                {data.username}님의 자산은...
              </Text>
              <Text style={infoBoxStyle.descriptionText}>
                {moneyFormatter(data.money)}원이네요
              </Text>
            </View>
          </View>

          <Button
            text={'송금 하기'}
            marginTop={screenSize.getVH(32)}
            size={'mid'}
            onPress={sendMoneyEventHandler}
          />
          <Button
            text={'친구 삭제'}
            marginTop={screenSize.getVH(1.6)}
            size={'mid'}
            onPress={deleteFriendHandler}
          />
        </View>
      )}

      <BottomNav pageName={'Social'} />
    </BasicContainer>
  );
};

export default FriendDetail;

const topUserInfoStyles = StyleSheet.create({
  container: {
    width: screenSize.getVW(82),
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerTextContainer: {
    marginLeft: screenSize.getVW(4.5),
  },
  profile: {
    width: screenSize.getVH(11.1),
    height: screenSize.getVH(11.1),
    borderRadius: screenSize.getVH(7),
  },
  username: {
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  handle: {
    marginTop: screenSize.getVH(0.4),
    fontSize: screenSize.getVH(1.8),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.descriptionGray,
  },
});

const infoBoxStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: screenSize.getVH(2.2),
    width: screenSize.getVW(82),
    height: screenSize.getVH(9.9),
    paddingHorizontal: screenSize.getVW(3.5),
    backgroundColor: colorStyles.lightGrayBackGround,
    borderRadius: screenSize.getVH(2),
  },
  innerTextContainer: {
    marginLeft: screenSize.getVW(2),
  },
  mainText: {
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.SemiBold,
    color: colorStyles.basicText,
  },
  descriptionText: {
    marginTop: screenSize.getVH(0.3),
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.ExtraBold,
    color: colorStyles.basicText,
  },
});
