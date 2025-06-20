import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {colorStyles} from '../../../assets/styles/color';
import {useEffect, useState} from 'react';
import DisabledBookmark from '../../../assets/image/icon/button/bookmarkDisabled.svg';
import EnabledBookmark from '../../../assets/image/icon/button/bookmarkEnabled.svg';
import moneyFormatter from '../../../util/moneyFormatter';
import AnalystGraph from '../../../components/Invest/stock/AnalystGraph';
import Button from '../../../components/common/buttons/Button';
import BottomNav from '../../../components/common/BottomNav';
import {ScrollView} from 'react-native-gesture-handler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import getStockIcon from '../../../assets/image/icon/stockLogo/StockLogo';
import {StockAPI} from '../../../api/stock';

const basicStockData: StockData = {
  stockName: '',
  priceKR: 0,
  priceUS: 0,
  isBookmarked: false,
  fluAmount: 0,
  fluRate: 0,
  summary: '',
  companyDetail: {
    mcp: 0,
    shareOutstanding: 0,
    ipo: '',
    companyFullName: '',
  },
  analystOpinion: [0, 0, 0, 0, 0],
};

interface StockData {
  stockName: String;
  priceKR: number;
  priceUS: number;
  isBookmarked: boolean;
  fluAmount: number;
  fluRate: number;
  summary: string;
  companyDetail: CompanyDetailData;
  analystOpinion: number[];
}

interface CompanyDetailData {
  mcp: number;
  shareOutstanding: number;
  ipo: string;
  companyFullName: string;
}

const analystOpinionMap = {
  sell: '판매 의견',
  buy: '구매 의견',
  neutral: '중립의견',
};

const StockDetail = ({route}: any) => {
  const stockId = route.params.stockId;
  const navigation = useNavigation<NavigationProp<any>>();
  const [stockData, setStockData] = useState<StockData>(basicStockData);

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

  useEffect(() => {
    StockAPI.getStockDetail(stockId)
      .then(response => {
        if (response.data) {
          setStockData(response.data);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const orderStockHandler = () => {
    navigation.navigate('BuyStock', {stockId});
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
                  src={getStockIcon(stockId)}
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
                  <Text style={textStyles.body}>법인 등록명</Text>
                  <Text style={textStyles.body}>시가총액</Text>
                  <Text style={textStyles.body}>상장일</Text>
                  <Text style={textStyles.body}>발행 주식수</Text>
                </View>
                <View style={{marginLeft: screenSize.getVW(5.8)}}>
                  <Text style={textStyles.body}>
                    {stockData.companyDetail.companyFullName}
                  </Text>
                  <Text style={textStyles.body}>
                    ${moneyFormatter(stockData.companyDetail.mcp)}
                  </Text>
                  <Text style={textStyles.body}>
                    {stockData.companyDetail.ipo}
                  </Text>
                  <Text style={textStyles.body}>
                    {moneyFormatter(stockData.companyDetail.shareOutstanding)}
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
          onPress={orderStockHandler}
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
