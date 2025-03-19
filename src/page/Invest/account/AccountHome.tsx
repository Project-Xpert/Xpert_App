import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import InvestHomeContainer from '../../../components/Invest/InvestHomeContainer';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import CoinBagImg from '../../../assets/image/common/coinbag.svg';
import StockDetailBtn from '../../../components/Invest/stock/StockDetailBtn';
import Button from '../../../components/common/buttons/Button';

const AccountHome = () => {
  const onPress = () => {};

  return (
    <InvestHomeContainer>
      <Text style={styles.topDescription}>
        {
          '모의투자 특성상 연이자를 월이자로 변경하였으며,\n적금과 이자는 매월 1일에 정산됩니다.'
        }
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
      <Text style={styles.title}>예금 통장</Text>
      <View>
        <StockDetailBtn />
        <StockDetailBtn />
      </View>
      <Text style={styles.title}>적금 통장</Text>
      <View>
        <StockDetailBtn />
      </View>
      <Button
        text={'새로운 예적금 통장 만들러 가기'}
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

export default AccountHome;
