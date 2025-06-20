import {
  Image,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import SmallBtn from '../../../components/common/buttons/SmallBtn';
import SelectionInput from '../../../components/common/inputs/SelectionInput';
import {useEffect, useState} from 'react';
import UnitInput from '../../../components/common/inputs/UnitInput';
import Button from '../../../components/common/buttons/Button';
import moneyFormatter from '../../../util/moneyFormatter';
import {UserAPI} from '../../../api/user';
import getStockIcon from '../../../assets/image/icon/stockLogo/StockLogo';

const dropdownMenus = ['시장가 기준으로 판매', '지정가 가격으로 판매'];

const mockData: StockData = {
  stockName: '애플',
  priceKR: 14000,
  priceUS: 10,
};

const userOwnStockMockData: UserOwnStockData = {
  ownCnt: 10,
};

interface StockData {
  stockName: String;
  priceKR: number;
  priceUS: number;
}

interface UserOwnStockData {
  ownCnt: number;
}

const BuyStock = ({route}: any) => {
  const stockId = route.params.stockId;
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const [tradeMode, setTradeMode] = useState(-1);
  const [stockCnt, setStockCnt] = useState(0);
  const [stockPrice, setStockPrice] = useState(0);
  const [userMoney, setUserMoney] = useState(0);
  const [stockData, setStockData] = useState<StockData>(mockData);
  const [userOwnStockData, setUserOwnStockData] =
    useState<UserOwnStockData>(userOwnStockMockData);

  useEffect(() => {
    UserAPI.GetUserData()
      .then(response => {
        if (response.data) {
          setUserMoney(response.data.money);
        }
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  const changeModeHandler = (newMode: 'buy' | 'sell') => {
    setMode(newMode);
  };

  const onChangeHandler = (
    type: 'cnt' | 'price',
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    if (type === 'cnt') {
      setStockCnt(
        parseInt(e.nativeEvent.text) ? parseInt(e.nativeEvent.text) : 0,
      );
    } else if (type === 'price') {
      setStockPrice(
        parseInt(e.nativeEvent.text) ? parseInt(e.nativeEvent.text) : 0,
      );
    }
  };

  const onChange = (menu: string) => {
    setTradeMode(dropdownMenus.indexOf(menu));
  };

  const buyStockHandler = () => {};

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.2)}>
      <BasicHeader text={'거래하기'} />
      <Text style={textStyles.description}>
        모의 주식 특성상, 시장가 주문은 즉시 체결되며,{'\n'}
        지정가 주문은 설정한 가격에 도달해야 체결됩니다.
      </Text>

      {!stockData && (
        <Text style={textStyles.description}>
          주식 정보를 불러오고 있어요...
        </Text>
      )}
      {stockData && (
        <View style={containerStyles.bodyContainer}>
          <View style={containerStyles.topContainer}>
            <Image
              style={imageStyles.companyIcon}
              src={getStockIcon(stockId)}
            />
            <View style={containerStyles.textContainer}>
              <Text style={textStyles.title}>{stockData.stockName}</Text>
              <Text style={textStyles.subTitle}>{stockId}</Text>
            </View>
          </View>

          <View style={containerStyles.topContainer}>
            <Text style={textStyles.krPrice}>
              {moneyFormatter(mockData.priceKR)}원
            </Text>
            <Text style={textStyles.usPrice}>
              ${moneyFormatter(mockData.priceUS)}
            </Text>
          </View>

          <View style={containerStyles.smallBtnContainer}>
            <SmallBtn
              text={'매수'}
              selected={mode === 'buy'}
              onClick={() => changeModeHandler('buy')}
            />
            <SmallBtn
              text={'매도'}
              selected={mode === 'sell'}
              onClick={() => changeModeHandler('sell')}
            />
          </View>

          <SelectionInput
            dropdownMenus={dropdownMenus}
            marginTop={screenSize.getVH(2.7)}
            value={dropdownMenus[tradeMode]}
            onChange={onChange}
            placeholder={'어떤 방식으로 거래할까요?'}
          />

          {tradeMode === 1 && (
            <UnitInput
              marginTop={screenSize.getVH(2.2)}
              placeholder={'얼마에 거래할까요?'}
              unit={'원'}
              value={stockPrice === 0 ? '' : String(stockPrice)}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                onChangeHandler('price', e);
              }}
            />
          )}

          <UnitInput
            marginTop={screenSize.getVH(2.2)}
            placeholder={'몇 주를 거래할까요?'}
            unit={'주'}
            value={stockCnt === 0 ? '' : String(stockCnt)}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
              onChangeHandler('cnt', e);
            }}
          />

          {mode === 'buy' && (
            <View style={containerStyles.bodyTextContainer}>
              <View>
                <Text style={textStyles.body}>투자 가능 금액</Text>
                <Text style={textStyles.body}>총 주문 금액</Text>
              </View>
              <View style={{marginLeft: screenSize.getVW(5.8)}}>
                <Text style={textStyles.body}>
                  {moneyFormatter(userMoney)}원
                </Text>
                <Text style={textStyles.body}>
                  {moneyFormatter(stockCnt * stockData.priceKR)}원
                </Text>
              </View>
            </View>
          )}
          {mode === 'sell' && (
            <View style={containerStyles.bodyTextContainer}>
              <View>
                <Text style={textStyles.body}>매도 가능 개수</Text>
                <Text style={textStyles.body}>총 매도 개수</Text>
              </View>
              <View style={{marginLeft: screenSize.getVW(5.8)}}>
                <Text style={textStyles.body}>
                  {moneyFormatter(userOwnStockData.ownCnt)}주
                </Text>
                <Text style={textStyles.body}>
                  {moneyFormatter(stockCnt)}주
                </Text>
              </View>
            </View>
          )}
        </View>
      )}

      <View style={containerStyles.btnContainer}>
        <Button
          text={'주식 거래 주문하기'}
          size={'large'}
          marginTop={screenSize.getVH(0)}
          onPress={buyStockHandler}
          disable={
            stockCnt === 0 ||
            tradeMode === -1 ||
            (mode === 'buy' && stockCnt * stockData.priceKR > userMoney) ||
            (mode === 'sell' && stockCnt > userOwnStockData.ownCnt) ||
            (tradeMode === 1 && stockPrice === 0)
          }
        />
      </View>
    </BasicContainer>
  );
};

const containerStyles = StyleSheet.create({
  bodyContainer: {
    width: screenSize.getVW(84),
  },
  smallBtnContainer: {
    marginTop: screenSize.getVH(2.2),
    width: screenSize.getVW(38.8),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btnContainer: {
    position: 'absolute',
    bottom: screenSize.getVH(3.3),
  },
  topContainer: {
    marginTop: screenSize.getVH(1.1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bodyTextContainer: {
    paddingLeft: screenSize.getVW(1.1),
    marginTop: screenSize.getVH(2.2),
    flexDirection: 'row',
    width: screenSize.getVW(84),
  },
});

const textStyles = StyleSheet.create({
  description: {
    marginTop: screenSize.getVH(2.2),
    width: screenSize.getVW(84),
    color: colorStyles.descriptionGray,
    fontFamily: fontStyle.SUIT.Medium,
    fontSize: screenSize.getVH(1.6),
    marginBottom: screenSize.getVH(1.1),
  },
  title: {
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
    marginLeft: screenSize.getVW(2.4),
  },
  subTitle: {
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.descriptionGray,
    marginLeft: screenSize.getVW(1.2),
  },
  krPrice: {
    fontSize: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.ExtraBold,
    color: colorStyles.basicText,
  },
  usPrice: {
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.descriptionGray,
    marginLeft: screenSize.getVW(1.2),
  },
  body: {
    marginTop: screenSize.getVH(1.1),
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.basicText,
  },
});

const imageStyles = StyleSheet.create({
  companyIcon: {
    width: screenSize.getVH(3.3),
    height: screenSize.getVH(3.3),
    borderRadius: screenSize.getVH(1.1),
  },
});

export default BuyStock;
