import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import InvestHomeContainer from '../../../components/Invest/InvestHomeContainer';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import Graph from '../../../components/common/graph/Graph';
import Button from '../../../components/common/buttons/Button';

const GoldHome = () => {
  const onClick = () => {};

  return (
    <InvestHomeContainer disableScrollView>
      <Text style={styles.topDescription}>
        {'한국 공공 데이터 포털 기준의 금 시세입니다.\n' +
          '한국 데이터 포털 특성상 변동 데이터가 누락되는 날도\n' +
          '있는 점 양해 부탁드립니다.'}
      </Text>
      <Graph />
      <Text
        style={styles.basicText}>{`기준가격 (원/g) : ${'135,473.01'}`}</Text>
      <Text style={styles.basicText}>{`시가 (원/g) : ${'136,827.74'}`}</Text>
      <Text style={styles.basicText}>
        어제보다 <Text style={styles.redHighlight}>약 1.3% 상승</Text> 했어요
      </Text>
      <Button
        text={'금 사고팔러 가기'}
        marginTop={screenSize.getVH(14.4)}
        size={'mid'}
        onPress={onClick}
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
    marginBottom: screenSize.getVH(1.6),
  },
  graphContainer: {
    marginRight: screenSize.getVW(20),
    width: screenSize.getVW(83.3),
    height: screenSize.getVH(20),
  },
  basicText: {
    color: colorStyles.basicText,
    fontFamily: fontStyle.SUIT.Medium,
    fontSize: screenSize.getVH(1.65),
    lineHeight: screenSize.getVH(2.2),
    marginTop: screenSize.getVH(1.1),
  },
  redHighlight: {
    color: colorStyles.defaultRed,
  },
});

export default GoldHome;
