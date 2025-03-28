import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import InvestHomeContainer from '../../../components/Invest/InvestHomeContainer';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import Button from '../../../components/common/buttons/Button';
import {useEffect, useState} from 'react';
import {GoldAPI} from '../../../api/gold';
import Graph from '../../../components/common/graph/Graph';
import moneyFormatter from '../../../util/moneyFormatter';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface goldDatum {
  mkp: string;
  basDt: string;
}

interface HomeProp {
  disableAction?: boolean;
}

const GoldHome = (prop: HomeProp) => {
  const navigator = useNavigation<NavigationProp<any>>();
  const [goldData, setGoldData] = useState<goldDatum[]>([
    {mkp: '0', basDt: ''},
    {mkp: '0', basDt: ''},
  ]);
  const [flRate, setFlRate] = useState('0');

  const calFlRate = () => {
    let prevPriceNum = parseInt(goldData[1].mkp);
    let currentPriceNum = parseInt(goldData[0].mkp);

    setFlRate(
      (((currentPriceNum - prevPriceNum) / prevPriceNum) * 100).toFixed(3),
    );
  };

  useEffect(() => {
    if (!prop.disableAction) {
      GoldAPI.getGoldPriceData()
        .then(response => {
          setGoldData(response.data.goldPrices);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, []);

  useEffect(() => {
    calFlRate();
  }, [goldData]);

  const onClick = () => {
    navigator.navigate('TradeGold');
  };

  return (
    <InvestHomeContainer>
      <Text style={styles.topDescription}>
        {'한국 공공 데이터 포털 기준의 금 시세입니다.\n' +
          '한국 데이터 포털 특성상 변동 데이터가 누락되는 날도\n' +
          '있는 점 양해 부탁드립니다.'}
      </Text>

      <Graph
        data={goldData.map(element => ({
          value: parseInt(element.mkp),
          xLabelValue:
            element.basDt.substring(0, 4) +
            '년 ' +
            element.basDt.substring(4, 6) +
            '월 ' +
            element.basDt.substring(6, 8) +
            '일',
        }))}
      />

      <Text style={styles.basicText}>
        {`어제의 시장가 (원/g) : ${moneyFormatter(goldData[1].mkp)}`}
      </Text>
      <Text style={styles.basicText}>
        {`오늘의 시장가 (원/g) : ${moneyFormatter(goldData[0].mkp)}`}
      </Text>
      <Text style={styles.basicText}>
        {Number.isNaN(parseInt(flRate)) || flRate === '0' ? (
          '어제 이후로 금 값이 변하지 않았어요.'
        ) : (
          <Text>
            어제보다{' '}
            <Text
              style={
                parseInt(flRate) < 0
                  ? styles.blueHighlight
                  : styles.redHighlight
              }>
              약 {flRate}% {parseInt(flRate) < 0 ? '하락' : '상승'}
            </Text>{' '}
            했어요
          </Text>
        )}
      </Text>

      <Button
        text={'금 사고팔러 가기'}
        marginTop={screenSize.getVH(11.25)}
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
  blueHighlight: {
    color: colorStyles.defaultBlue,
  },
});

export default GoldHome;
