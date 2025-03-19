import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import InvestHomeContainer from '../../../components/Invest/InvestHomeContainer';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import CoinBagImg from '../../../assets/image/common/coinbag.svg';
import StockDetailBtn from '../../../components/Invest/stock/StockDetailBtn';
import Button from '../../../components/common/buttons/Button';

const StockHome = () => {
  const onPress = () => {};

  return (
    <InvestHomeContainer>
      <Text style={styles.topDescription}>
        주식의 배당금 시스템은 구현되어 있지 않습니다.
      </Text>
      <View style={styles.topInfoBoxContainer}>
        <CoinBagImg
          width={screenSize.getVH(7.7)}
          height={screenSize.getVH(7.7)}
        />
        <View style={styles.topInfoTextBox}>
          <Text style={styles.topInfoText}>현재 사용 가능한 시드머니</Text>
          <Text style={styles.topInfoText}>100,000,000원</Text>
        </View>
      </View>

      <Text style={styles.title}>현재 가진 해외 주식</Text>
      <View>
        <StockDetailBtn />
        <StockDetailBtn />
      </View>

      <Text style={styles.title}>현재 가진 국내 주식</Text>
      <View>
        <StockDetailBtn />
      </View>

      <Button
        text={'새로운 주식 사러가기'}
        marginTop={screenSize.getVH(5.5)}
        size={'mid'}
        onPress={onPress}
      />
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
  topInfoBoxContainer: {
    width: '100%',
    height: screenSize.getVH(11.1),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenSize.getVH(2.2),
    borderRadius: 15,
    paddingHorizontal: screenSize.getVW(6),
    backgroundColor: colorStyles.lightGrayBackGround,
  },
  topInfoTextBox: {
    marginLeft: screenSize.getVW(2.3),
    height: screenSize.getVH(4.5),
    justifyContent: 'space-between',
  },
  topInfoText: {
    fontSize: screenSize.getVH(1.6),
    color: colorStyles.basicText,
    fontFamily: fontStyle.SUIT.Medium,
  },
  title: {
    width: screenSize.getVW(80),
    marginTop: screenSize.getVH(3.3),
    fontSize: screenSize.getVH(1.6),
    lineHeight: screenSize.getVH(1.6),
    color: colorStyles.basicText,
    fontFamily: fontStyle.SUIT.Medium,
  },
});

export default StockHome;
