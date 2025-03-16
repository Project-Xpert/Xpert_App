import {ScrollView, StyleSheet, View} from 'react-native';
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
import Swiper from 'react-native-swiper';

const InvestHome = () => {
  const swiperRef = useRef<ScrollView>(null);

  const [currentPage, setCurrentPage] = useState<
    'account' | 'stock' | 'bond' | 'FX' | 'gold'
  >('account');

  useEffect(() => {
    const pages = ['account', 'stock', 'bond', 'FX', 'gold'];

    console.log(pages.indexOf(currentPage));
    if (swiperRef.current) {
      swiperRef.current.scrollTo({
        x:
          pages.indexOf(currentPage) *
          (screenSize.width - screenSize.getVW(9.3 * 2)),
        animated: true,
      });
    }
  }, [currentPage]);

  const onPress = (moveTo: 'account' | 'stock' | 'bond' | 'FX' | 'gold') => {
    setCurrentPage(moveTo);
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.3)}>
      <BasicHeader text={'투자하기'} />
      <InvestNav currentPage={currentPage} onPress={onPress} />
      <ScrollView
        ref={swiperRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}>
        <AccountHome />
        <StockHome />
        <BondHome />
        <FXHome />
        <GoldHome />
      </ScrollView>
      <BottomNav pageName={'Invest'} />
    </BasicContainer>
  );
};

const styles = StyleSheet.create({});

export default InvestHome;
