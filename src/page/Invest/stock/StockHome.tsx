import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import InvestHomeContainer from '../../../components/Invest/InvestHomeContainer';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import CoinBagImg from '../../../assets/image/common/coinbag.svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import StockListItem from '../../../components/Invest/stock/StockListItem';
import SeeMoreBtn from '../../../components/Invest/stock/SeeMoreBtn';
import CategoryListItem from '../../../components/Invest/stock/CategoryListItem';
import StockMenu from '../../../components/Invest/stock/StockMenu';
import {useState} from 'react';

interface StocksData {
  stockId: string;
  stockName: string;
  money: number;
  fluRate: number;
  isBookmarked: boolean;
}
interface CategoryData {
  categoryId: string;
  categoryName: string;
  totalStockCnt: number;
  increaseStockCnt: number;
  fluRate: number;
}

const stockMockData: StocksData[] = [
  {
    stockId: 'AAPL',
    stockName: '애플',
    money: 10000,
    fluRate: -2.4,
    isBookmarked: true,
  },
  {
    stockId: 'AMKR',
    stockName: '앰코 테크놀로지',
    money: 1000,
    fluRate: 2.4,
    isBookmarked: true,
  },
  {
    stockId: 'AMZN',
    stockName: '아마존',
    money: 100,
    fluRate: 0.0,
    isBookmarked: true,
  },
  {
    stockId: 'MS',
    stockName: '모건스텐리',
    money: 10,
    fluRate: -1.4,
    isBookmarked: true,
  },
  {
    stockId: 'MCD',
    stockName: '맥도날드',
    money: 1,
    fluRate: -1.2,
    isBookmarked: false,
  },
  {
    stockId: 'V',
    stockName: '비자',
    money: 1000,
    fluRate: -1.2,
    isBookmarked: false,
  },
  {
    stockId: 'NVDA',
    stockName: '엔비디아',
    money: 100,
    fluRate: 1.2,
    isBookmarked: false,
  },
  {
    stockId: 'SNAP',
    stockName: '스냅쳇',
    money: 100,
    fluRate: 1.2,
    isBookmarked: true,
  },
  {
    stockId: 'IBM',
    stockName: 'IBM',
    money: 100,
    fluRate: 1.2,
    isBookmarked: false,
  },
  {
    stockId: 'LMT',
    stockName: '록히드 마틴',
    money: 100,
    fluRate: 0.2,
    isBookmarked: true,
  },
  {
    stockId: 'NFLX',
    stockName: '넷플릭스',
    money: 100,
    fluRate: 0.0,
    isBookmarked: false,
  },
];

const categoryMockData: CategoryData[] = [
  {
    categoryId: 'Arms',
    categoryName: '방산 및 군수',
    totalStockCnt: 10,
    increaseStockCnt: 8,
    fluRate: 2.4,
  },
  {
    categoryId: 'Oil',
    categoryName: '석유 시추 및 정제',
    totalStockCnt: 10,
    increaseStockCnt: 8,
    fluRate: -2.2,
  },
  {
    categoryId: 'IT',
    categoryName: 'IT 솔루션 개발',
    totalStockCnt: 10,
    increaseStockCnt: 8,
    fluRate: 2.0,
  },
  {
    categoryId: 'Bio',
    categoryName: '바이오 & 의료',
    totalStockCnt: 10,
    increaseStockCnt: 8,
    fluRate: -1.4,
  },
  {
    categoryId: 'Distribution',
    categoryName: '소매 및 유통',
    totalStockCnt: 10,
    increaseStockCnt: 8,
    fluRate: 0.0,
  },
];

const StockHome = () => {
  const navigator = useNavigation<NavigationProp<any>>();

  const [ownStockData, setOwnStockData] = useState<StocksData[]>(stockMockData);
  const [liveStockData, setLiveStockData] =
    useState<StocksData[]>(stockMockData);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [interestStockData, setInterestStockData] =
    useState<StocksData[]>(stockMockData);

  const stockDetailHandler = (stockId: string) => {
    navigator.navigate('StockDetail', {stockId});
  };

  return (
    <InvestHomeContainer>
      <View style={topInfoBoxStyles.container}>
        <CoinBagImg
          width={screenSize.getVH(7.7)}
          height={screenSize.getVH(7.7)}
        />
        <View style={topInfoBoxStyles.textContainer}>
          <Text style={topInfoBoxStyles.text}>현재 사용 가능한 시드머니</Text>
          <Text style={topInfoBoxStyles.text}>100,000,000원</Text>
        </View>
      </View>

      {/* 소유한 주식 */}
      {ownStockData.length > 0 && (
        <View>
          <Text style={textStyles.title}>현재 가지고 있는 주식</Text>

          <StockMenu />

          {ownStockData.slice(0, 5).map((datum, idx) => (
            <StockListItem
              ranking={idx + 1}
              key={`owned_stock_${datum.stockId}`}
              stockName={datum.stockName}
              stockId={datum.stockId}
              money={datum.money}
              fluRate={datum.fluRate}
              isBookmarked={datum.isBookmarked}
              onPress={() => stockDetailHandler(datum.stockId)}
            />
          ))}

          {ownStockData.length > 5 && <SeeMoreBtn text={'더보기'} />}
        </View>
      )}

      {/* 실시간 차트 */}
      <Text style={textStyles.title}>실시간 차트</Text>

      <StockMenu />

      {liveStockData.slice(0, 10).map((datum, idx) => (
        <StockListItem
          ranking={idx + 1}
          key={`live_stock_${datum.stockId}`}
          stockName={datum.stockName}
          stockId={datum.stockId}
          money={datum.money}
          fluRate={datum.fluRate}
          isBookmarked={datum.isBookmarked}
          onPress={() => stockDetailHandler(datum.stockId)}
        />
      ))}

      <SeeMoreBtn text={'더보기'} />

      {/* 카테고리 차트 */}
      <Text style={textStyles.title}>카테고리별로 종목 보기</Text>

      <StockMenu />

      {categoryMockData.map((datum, idx) => (
        <CategoryListItem
          key={`category_${datum.categoryId}`}
          ranking={idx + 1}
          categoryId={datum.categoryId}
          categoryName={datum.categoryName}
          totalStockCnt={datum.totalStockCnt}
          increaseStockCnt={datum.increaseStockCnt}
          fluRate={datum.fluRate}
        />
      ))}

      <SeeMoreBtn text={'더보기'} />

      {/* 관심종목 모아보기 */}
      <Text style={textStyles.title}>관심종목 모아보기</Text>

      {interestStockData.length <= 0 && (
        <Text style={textStyles.description}>
          관심 종목 리스트가 비어있네요!
        </Text>
      )}
      {interestStockData.length > 0 && <StockMenu />}

      {interestStockData.slice(0, 3).map((datum, idx) => (
        <StockListItem
          ranking={idx + 1}
          key={`interest_stock_${datum.stockId}`}
          stockName={datum.stockName}
          stockId={datum.stockId}
          money={datum.money}
          fluRate={datum.fluRate}
          isBookmarked={datum.isBookmarked}
          onPress={() => stockDetailHandler(datum.stockId)}
        />
      ))}

      {interestStockData.length > 3 && (
        <SeeMoreBtn text={'관심종목 모두 보러가기'} />
      )}
    </InvestHomeContainer>
  );
};

const topInfoBoxStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: screenSize.getVH(3.8),
    height: screenSize.getVH(11.1),
    paddingHorizontal: screenSize.getVW(6),
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: colorStyles.lightGrayBackGround,
  },
  textContainer: {
    marginLeft: screenSize.getVW(2.3),
    height: screenSize.getVH(4.5),
    justifyContent: 'space-between',
  },
  text: {
    fontSize: screenSize.getVH(1.6),
    color: colorStyles.basicText,
    fontFamily: fontStyle.SUIT.Medium,
  },
});

const textStyles = StyleSheet.create({
  title: {
    marginTop: screenSize.getVH(3.3),
    fontFamily: fontStyle.SUIT.ExtraBold,
    fontSize: screenSize.getVH(2.2),
    color: colorStyles.basicText,
  },
  description: {
    marginTop: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Medium,
    fontSize: screenSize.getVH(1.6),
    color: colorStyles.descriptionGray,
  },
});

export default StockHome;
