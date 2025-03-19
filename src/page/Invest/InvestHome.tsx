import {Animated, StyleSheet, View} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import BasicContainer from '../../components/common/BasicContainer';
import BottomNav from '../../components/common/BottomNav';
import BasicHeader from '../../components/common/headers/BasicHeader';
import InvestNav from '../../components/Invest/InvestNav';
import {useEffect, useRef, useState} from 'react';
import AccountHome from './account/AccountHome';
import StockHome from './stock/StockHome';
import BondHome from './bond/BondHome';
import GoldHome from './gold/GoldHome';
import FXHome from './FX/FXHome';
import useInvestNavData from '../../data/investNavData';

const getPage = (pageName: 'account' | 'stock' | 'bond' | 'FX' | 'gold') => {
  if (pageName === 'account') {
    return <AccountHome />;
  } else if (pageName === 'stock') {
    return <StockHome />;
  } else if (pageName === 'bond') {
    return <BondHome />;
  } else if (pageName === 'FX') {
    return <FXHome />;
  } else if (pageName === 'gold') {
    return <GoldHome />;
  }
};

const InvestHome = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const nextPageTranslateX = useRef(new Animated.Value(0)).current;
  const nextPageOpacity = useRef(new Animated.Value(-1)).current;
  const {lastPage, setData} = useInvestNavData();

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<
    'account' | 'stock' | 'bond' | 'FX' | 'gold'
  >(lastPage);
  const [nextPage, setNextPage] = useState<
    'account' | 'stock' | 'bond' | 'FX' | 'gold'
  >(lastPage);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
      return;
    }

    setData({lastPage: nextPage});
    const pages = ['account', 'stock', 'bond', 'FX', 'gold'];
    const isLeftOfCurrentPage =
      pages.indexOf(nextPage) < pages.indexOf(currentPage);

    nextPageTranslateX.setValue(isLeftOfCurrentPage ? -400 : 400);
    nextPageOpacity.setValue(1);

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 400 * (isLeftOfCurrentPage ? 1 : -1),
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(nextPageTranslateX, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentPage(nextPage);
      setTimeout(() => {
        translateX.setValue(0);
        nextPageOpacity.setValue(0);
        nextPageTranslateX.setValue(400);
      }, 0);
    });
  }, [nextPage]);

  const onPress = (moveTo: 'account' | 'stock' | 'bond' | 'FX' | 'gold') => {
    setNextPage(moveTo);
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.3)}>
      <BasicHeader text={'투자하기'} hideArrowBtn />
      <InvestNav currentPage={nextPage} onPress={onPress} />
      <View style={{width: screenSize.width - screenSize.getVW(9 * 2)}}>
        <Animated.View style={{transform: [{translateX}], ...styles.container}}>
          {getPage(currentPage)}
        </Animated.View>
        <Animated.View
          style={{
            transform: [{translateX: nextPageTranslateX}],
            opacity: nextPageOpacity,
            ...styles.container,
          }}>
          {getPage(nextPage)}
        </Animated.View>
      </View>
      <BottomNav pageName={'Invest'} />
    </BasicContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    width: screenSize.width - screenSize.getVW(9 * 2),
    height: screenSize.getVH(65),
  },
});

export default InvestHome;
