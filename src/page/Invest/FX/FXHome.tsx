import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import InvestHomeContainer from '../../../components/Invest/InvestHomeContainer';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';

const FXHome = () => {
  return (
    <InvestHomeContainer>
      <Text style={styles.topDescription}>외화 시스템은 구현 예정입니다</Text>
    </InvestHomeContainer>
  );
};

const styles = StyleSheet.create({
  topDescription: {
    width: screenSize.getVW(80),
    fontSize: screenSize.getVH(1.6),
    lineHeight: screenSize.getVH(2.7),
    color: colorStyles.descriptionGray,
    fontFamily: fontStyle.SUIT.Medium,
  },
});

export default FXHome;
