import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import InvestHomeContainer from '../../../components/Invest/InvestHomeContainer';

const AccountHome = () => {
  return (
    <InvestHomeContainer>
      <Text>예적금 홈입니다</Text>
    </InvestHomeContainer>
  );
};

const styles = StyleSheet.create({});

export default AccountHome;
