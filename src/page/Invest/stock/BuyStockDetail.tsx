import {Image, StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import {fontStyle} from '../../../assets/styles/fontStyles';
import Graph from '../../../components/common/graph/Graph';
import {colorStyles} from '../../../assets/styles/color';
import BottomNav from '../../../components/common/BottomNav';
import Button from '../../../components/common/buttons/Button';

const BuyStockDetail = () => {
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

      <Graph />

      <Button
        text={'매수하기'}
        marginTop={screenSize.getVH(13.5)}
        size={'mid'}
        onPress={function (): void {
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
    marginBottom: screenSize.getVH(7),
    fontSize: screenSize.getVH(2),
    lineHeight: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  highlightedText: {
    color: colorStyles.mainColor,
  },
});

export default BuyStockDetail;
