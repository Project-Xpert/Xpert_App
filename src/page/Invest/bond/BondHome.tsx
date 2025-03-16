import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import InvestHomeContainer from '../../../components/Invest/InvestHomeContainer';

const BondHome = () => {
  return (
    <InvestHomeContainer>
      <Text>채권 투자 홈입니다</Text>
    </InvestHomeContainer>
  );
};

const styles = StyleSheet.create({});

export default BondHome;
