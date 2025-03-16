import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import InvestHomeContainer from '../../../components/Invest/InvestHomeContainer';

const FXHome = () => {
  return (
    <InvestHomeContainer>
      <Text>외화 투자 홈입니다</Text>
    </InvestHomeContainer>
  );
};

const styles = StyleSheet.create({});

export default FXHome;
