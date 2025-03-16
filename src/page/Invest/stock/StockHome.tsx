import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import InvestHomeContainer from '../../../components/Invest/InvestHomeContainer';

const StockHome = () => {
  return (
    <InvestHomeContainer>
      <Text>주식 투자 홈입니다</Text>
    </InvestHomeContainer>
  );
};

const styles = StyleSheet.create({});

export default StockHome;
