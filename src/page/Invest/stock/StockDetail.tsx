import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {colorStyles} from '../../../assets/styles/color';
import {useState} from 'react';
import DisabledBookmark from '../../../assets/image/icon/button/bookmarkDisabled.svg';
import EnabledBookmark from '../../../assets/image/icon/button/bookmarkEnabled.svg';
import moneyFormatter from '../../../util/moneyFormatter';
import AnalystGraph from '../../../components/Invest/stock/AnalystGraph';
import Button from '../../../components/common/buttons/Button';
import BottomNav from '../../../components/common/BottomNav';
import {ScrollView} from 'react-native-gesture-handler';

const mockData: StockData = {
  stockName: '넷플릭스',
  priceKR: 10000,
  priceUS: 320,
  isBookmarked: true,
  fluAmount: -120000,
  fluRate: -72.3,
  summary: 'OTT 시장을 선도하고 개적하는 기업',
  marketCapital: '712조 7,503억원',
  companyValue: '594조 7,277억원',
  listedDate: '2002년 5월 23일',
  sharedStockCnt: '425,571,266주',
  analystOpinion: [0, 5, 2, 5, 3],
  analystPredict:
    '애널리스트들이 1년 후 넷플릭스의 목표 주가가 1,618,482원으로 지금보다 -3.0% 하락 할 것으로 예상했어요',
};

interface StockData {
  stockName: String;
  priceKR: number;
  priceUS: number;
  isBookmarked: boolean;
  fluAmount: number;
  fluRate: number;
  summary: string;
  marketCapital: string;
  companyValue: string;
  listedDate: string;
  sharedStockCnt: string;
  analystOpinion: number[];
  analystPredict: string;
}

const analystOpinionMap = {
  sell: '판매 의견',
  buy: '구매 의견',
  neutral: '중립의견',
};

const StockDetail = ({route}: any) => {
  const stockId = route.params.stockId;
  const [stockData, setStockData] = useState(mockData);

  const analystTotalCnt = stockData.analystOpinion?.reduce((a, b) => a + b);

  const analystCnt = {
    sell: stockData.analystOpinion[0] + stockData.analystOpinion[1],
    buy: stockData.analystOpinion[3] + stockData.analystOpinion[4],
    neutral: stockData.analystOpinion[2],
  };

  const analystOpinion =
    analystCnt.buy > analystCnt.sell && analystCnt.buy > analystCnt.neutral
      ? 'buy'
      : analystCnt.sell > analystCnt.neutral
      ? 'sell'
      : 'neutral';

  const getAnalystHighlightStyle = {
    fontFamily: fontStyle.SUIT.Bold,
    color:
      analystOpinion === 'sell'
        ? colorStyles.defaultBlue
        : analystOpinion === 'buy'
        ? colorStyles.defaultRed
        : colorStyles.basicText,
  };

  const getFluRateStyle = {
    color:
      stockData.fluAmount < 0
        ? colorStyles.defaultBlue
        : stockData.fluAmount > 0
        ? colorStyles.defaultRed
        : colorStyles.basicText,
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.2)}>
      <BasicHeader text={'투자하기'} />

      <View style={scrollViewStyles.scrollViewContainer}>
        <ScrollView>
          <View style={scrollViewStyles.outerContainer}>
            <View style={scrollViewStyles.innerContainer}>
              <View style={containerStyles.rowTextContainer}>
                <Text style={textStyles.title2}>{stockData.stockName}</Text>
                <Text style={textStyles.subTitle2}>{stockId}</Text>
                <TouchableOpacity style={btnStyles.bookmarkBtn}>
                  {stockData.isBookmarked ? (
                    <EnabledBookmark
                      width={screenSize.getVH(2.2)}
                      height={screenSize.getVH(2.2)}
                    />
                  ) : (
                    <DisabledBookmark
                      width={screenSize.getVH(2.2)}
                      height={screenSize.getVH(2.2)}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <View style={containerStyles.rowTextContainer}>
                <Text style={textStyles.title1}>
                  {moneyFormatter(stockData.priceKR)}원
                </Text>
                <Text style={textStyles.subTitle1}>
                  ${moneyFormatter(stockData.priceUS)}
                </Text>
              </View>

              <Text style={textStyles.fluData}>
                어제보다{' '}
                <Text style={getFluRateStyle}>
                  {moneyFormatter(stockData.fluAmount)}원
                  {`(${Math.abs(stockData.fluRate).toFixed(1)}%)`}
                </Text>{' '}
                변동했어요
              </Text>

              <Text style={textStyles.partTitle}>종목 정보</Text>
              <View style={containerStyles.companyInfoContainer}>
                <Image
                  src={`https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/${stockId}.png`}
                  style={imageStyles.companyLogo}
                />
                <Text style={textStyles.title2}>{stockData.stockName}</Text>
                <Text style={textStyles.subTitle2}>{stockId}</Text>
              </View>

              <View style={containerStyles.summaryContainer}>
                <Text style={textStyles.summary}>{stockData.summary}</Text>
              </View>
              <View style={containerStyles.bodyContainer}>
                <View>
                  <Text style={textStyles.body}>시가총액</Text>
                  <Text style={textStyles.body}>실제 기업 가치</Text>
                  <Text style={textStyles.body}>상장일</Text>
                  <Text style={textStyles.body}>발행 주식수</Text>
                </View>
                <View style={{marginLeft: screenSize.getVW(5.8)}}>
                  <Text style={textStyles.body}>{stockData.marketCapital}</Text>
                  <Text style={textStyles.body}>{stockData.companyValue}</Text>
                  <Text style={textStyles.body}>{stockData.listedDate}</Text>
                  <Text style={textStyles.body}>
                    {stockData.sharedStockCnt}
                  </Text>
                </View>
              </View>

              <Text style={textStyles.partTitle}>애널리스트 의견</Text>
              <View style={containerStyles.summaryContainer}>
                {analystTotalCnt <= 0 && (
                  <Text>이 주식에 대한 애널리스트들의 평가가 없어요.</Text>
                )}
                {analystTotalCnt > 0 && (
                  <Text>
                    애널리스트 {analystTotalCnt}명 중{' '}
                    {analystCnt[analystOpinion]}
                    명이{' '}
                    <Text style={getAnalystHighlightStyle}>
                      {analystOpinionMap[analystOpinion]}
                    </Text>
                    을 냈어요.
                  </Text>
                )}
              </View>

              {analystTotalCnt > 0 && (
                <View>
                  <View style={containerStyles.graphContainer}>
                    {['적극 판매', '판매', '중립', '구매', '적극 구매'].map(
                      (name, idx) => {
                        return (
                          <AnalystGraph
                            key={name}
                            name={name}
                            totalCnt={analystTotalCnt}
                            value={stockData.analystOpinion[idx]}
                            isFocused={
                              (analystOpinion === 'buy' && idx > 2) ||
                              (analystOpinion === 'sell' && idx < 2) ||
                              (analystOpinion === 'neutral' && idx === 2)
                            }
                          />
                        );
                      },
                    )}
                  </View>

                  {stockData.analystPredict && (
                    <Text style={textStyles.body}>
                      {stockData.analystPredict}
                    </Text>
                  )}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={containerStyles.btnContainer}>
        <Button
          size={'mid'}
          text={'주식 주문하러 가기'}
          onPress={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </View>

      <BottomNav pageName={'Invest'} />
    </BasicContainer>
  );
};

const scrollViewStyles = StyleSheet.create({
  scrollViewContainer: {
    height: screenSize.getVH(63),
    width: screenSize.width,
  },
  outerContainer: {
    alignItems: 'center',
    marginBottom: screenSize.getVH(2.2),
  },
  innerContainer: {
    width: screenSize.getVW(84),
  },
});

const containerStyles = StyleSheet.create({
  companyInfoContainer: {
    marginTop: screenSize.getVH(2.2),
    width: screenSize.getVW(84),
    height: screenSize.getVH(3.3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTextContainer: {
    width: screenSize.getVW(84),
    marginBottom: screenSize.getVH(1.1),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  summaryContainer: {
    marginTop: screenSize.getVH(1.6),
    width: screenSize.getVW(84),
    paddingVertical: screenSize.getVH(1.6),
    paddingHorizontal: screenSize.getVW(3.5),
    backgroundColor: colorStyles.lightGrayBackGround,
    borderRadius: screenSize.getVH(1.1),
  },
  bodyContainer: {
    width: screenSize.getVW(84),
    flexDirection: 'row',
  },
  graphContainer: {
    width: screenSize.getVW(84),
    marginTop: screenSize.getVH(2.2),
    flexDirection: 'row',
  },
  btnContainer: {
    position: 'absolute',
    bottom: screenSize.getVH(9.9),
  },
});

const textStyles = StyleSheet.create({
  title1: {
    fontSize: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.ExtraBold,
    color: colorStyles.basicText,
  },
  title2: {
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  subTitle1: {
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.descriptionGray,
    marginLeft: screenSize.getVW(1.2),
  },
  subTitle2: {
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.descriptionGray,
    marginLeft: screenSize.getVW(1.2),
  },
  partTitle: {
    width: screenSize.getVW(84),
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
    marginTop: screenSize.getVH(3.8),
  },
  fluData: {
    width: screenSize.getVW(84),
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  summary: {
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  body: {
    marginTop: screenSize.getVH(1.6),
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.basicText,
  },
});

const btnStyles = StyleSheet.create({
  bookmarkBtn: {
    marginLeft: screenSize.getVW(1.2),
  },
});

const imageStyles = StyleSheet.create({
  companyLogo: {
    marginRight: screenSize.getVW(2.3),
    width: screenSize.getVH(3.3),
    height: screenSize.getVH(3.3),
    borderRadius: screenSize.getVH(1.1),
  },
});

export default StockDetail;
