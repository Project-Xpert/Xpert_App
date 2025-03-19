import {Image, StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import {fontStyle} from '../../../assets/styles/fontStyles';
import Graph from '../../../components/common/graph/Graph';
import {colorStyles} from '../../../assets/styles/color';
import TwoBtns from '../../../components/common/buttons/TwoBtns';
import BottomNav from '../../../components/common/BottomNav';

const StockDetail = () => {
  return (
    <BasicContainer paddingTop={screenSize.getVH(9.2)}>
      <BasicHeader text={'주식 상세'} />
      <View style={styles.stockInfoContainer}>
        <Image
          style={styles.logo}
          src={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUSA49zzU6Xh1gUBZdrOVKb6wL0A_Y1zrlmw&s'
          }
        />
        <Text style={styles.stockName}>월마트</Text>
      </View>
      <Text style={styles.headLine1}>
        현재 1주당 <Text style={styles.highlightedText}>100,000원</Text>
      </Text>
      <Text style={styles.headLine2}>
        어제보다 <Text style={{color: colorStyles.defaultBlue}}>-0.92%</Text>{' '}
        변동했어요
      </Text>

      <View style={styles.bodyContainer}>
        <Text style={styles.body}>현재 3주 가지고 있어요</Text>
        <Text style={styles.body}>
          평균 30,000원에 구매했어요{' '}
          <Text style={{color: colorStyles.defaultRed}}>(+10.6%)</Text>
        </Text>
      </View>

      <Graph />

      <TwoBtns
        marginTop={screenSize.getVH(8.5)}
        leftBtnText={'주식 매도'}
        rightBtnText={'추가 매수'}
        leftBtnOnPress={function (): void {
          throw new Error('Function not implemented.');
        }}
        rightBtnOnPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />

      <BottomNav pageName={'Invest'} />
    </BasicContainer>
  );
};

const styles = StyleSheet.create({
  stockInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: screenSize.getVH(5.5),
    height: screenSize.getVH(5.5),
    borderRadius: screenSize.getVH(2.2),
  },
  stockName: {
    marginLeft: screenSize.getVW(3.3),
    fontSize: screenSize.getVH(2.7),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  headLine1: {
    marginTop: screenSize.getVH(2.7),
    fontSize: screenSize.getVH(2.7),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  headLine2: {
    marginTop: screenSize.getVH(1.6),
    fontSize: screenSize.getVH(2),
    lineHeight: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  bodyContainer: {
    marginTop: screenSize.getVH(2.7),
    marginBottom: screenSize.getVH(4.7),
    height: screenSize.getVH(5),
    justifyContent: 'space-between',
  },
  body: {
    width: screenSize.getVW(80),
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.SemiBold,
    color: colorStyles.basicText,
  },
  highlightedText: {
    color: colorStyles.mainColor,
  },
});

export default StockDetail;
