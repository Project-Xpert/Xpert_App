import {StyleSheet, View} from 'react-native';
import UnderBarBtn from '../common/buttons/UnderBarBtn';
import {screenSize} from '../../assets/styles/screenSize';
import {colorStyles} from '../../assets/styles/color';

interface NavProps {
  currentPage: 'account' | 'stock' | 'bond' | 'FX' | 'gold';
  onPress: (pageName: 'account' | 'stock' | 'bond' | 'FX' | 'gold') => void;
}

const InvestNav = (props: NavProps) => {
  const {currentPage, onPress} = props;

  return (
    <View style={styles.topNavigatorConatiner}>
      <UnderBarBtn
        text={'예금/적금'}
        disable={currentPage !== 'account'}
        onPress={() => onPress('account')}
      />
      <UnderBarBtn
        text={'주식'}
        disable={currentPage !== 'stock'}
        onPress={() => onPress('stock')}
      />
      <UnderBarBtn
        text={'채권'}
        disable={currentPage !== 'bond'}
        onPress={() => onPress('bond')}
      />
      <UnderBarBtn
        text={'외화'}
        disable={currentPage !== 'FX'}
        onPress={() => onPress('FX')}
      />
      <UnderBarBtn
        text={'금'}
        disable={currentPage !== 'gold'}
        onPress={() => onPress('gold')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topNavigatorConatiner: {
    marginBottom: screenSize.getVH(2.2),
    width: screenSize.getVW(70),
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    justifyContent: 'space-between',
    backgroundColor: colorStyles.defaultWhite,
  },
});

export default InvestNav;
