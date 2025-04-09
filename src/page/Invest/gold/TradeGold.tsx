import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import UnitInput from '../../../components/common/inputs/UnitInput';
import SmallBtn from '../../../components/common/buttons/SmallBtn';
import Button from '../../../components/common/buttons/Button';
import SelectionInput from '../../../components/common/inputs/SelectionInput';
import {useEffect, useState} from 'react';
import moneyFormatter from '../../../util/moneyFormatter';
import QuestionBtn from '../../../components/common/buttons/QuestionBtn';
import BottomInfo from '../../../components/Invest/gold/BottomInfo';
import PriceInfo from '../../../components/Invest/gold/PriceInfo';
import {UserAPI} from '../../../api/user';
import {GoldAPI} from '../../../api/gold';

const dropdownMenus = [
  '24k 금 1돈 (3.75g)',
  '22k 금 1돈 (3.75g)',
  '20k 금 1돈 (3.75g)',
  '18k 금 1돈 (3.75g)',
  '16k 금 1돈 (3.75g)',
];

const goldPurity: Record<string, {purity: number; sellDiscount: number}> = {
  '24k': {purity: 99.9, sellDiscount: 97.5},
  '22k': {purity: 91.6, sellDiscount: 96.25},
  '20k': {purity: 75.0, sellDiscount: 95},
  '18k': {purity: 66.7, sellDiscount: 93.75},
  '16k': {purity: 58.3, sellDiscount: 92.5},
};

interface DisplayData {
  price: number;
  userMoney: number;
  ownGolds: Record<string, number>;
}

interface FormData {
  goldType: string;
  cnt: number | null;
}

const defaultData = {
  price: 0,
  userMoney: 0,
  ownGolds: {
    '24k': 0,
    '22k': 0,
    '20k': 0,
    '18k': 0,
    '16k': 0,
  },
};

const TradeGold = ({route}: any) => {
  const [displayData, setDisplayData] = useState<DisplayData>(defaultData);
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const [sellPrice, setSellPrice] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [data, setData] = useState<FormData>({
    goldType: '',
    cnt: null,
  });

  useEffect(() => {
    GoldAPI.getGoldOwnData()
      .then(response => {
        const {userMoney, ownGolds} = response.data;

        const goldData: Record<string, number> = {};
        ownGolds.map((gold: FormData) => {
          if (gold.cnt != null) {
            goldData[gold.goldType] = gold.cnt;
          }
        });

        setDisplayData(() => ({
          userMoney,
          ownGolds: goldData,
          price: route.params.price,
        }));
      })
      .catch(e => {
        console.log(e.response);
      });
  }, []);

  const itemCnt = Number(data.cnt) || 0;
  const totalBuyPrice = buyPrice * itemCnt;
  const totalSellPrice = sellPrice * itemCnt;
  const isFormFilled = data.goldType != '' && data.cnt;
  const ownedGoldCnt = displayData.ownGolds[data.goldType.toUpperCase()] || 0;

  const handleModeChange = (mode: 'buy' | 'sell') => {
    setMode(mode);
  };

  const handleDataChange = (name: string, value: string) => {
    if (name == 'goldType') {
      setData({...data, [name]: value});
    } else {
      setData({...data, [name]: parseInt(value)});
    }
  };

  const handleTradeRequest = () => {};

  // calculate price data when goldType changed
  useEffect(() => {
    const defaultData = {purity: 0, sellDiscount: 0};
    const {purity, sellDiscount} = goldPurity[data.goldType] || defaultData;
    const basicPrice = displayData.price * (purity / 99.9);

    setBuyPrice(Math.round((basicPrice * 102.5 * 3.75) / 100));
    setSellPrice(Math.round((basicPrice * sellDiscount * 3.75) / 100));
  }, [data.goldType]);

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.2)}>
      <BasicHeader text={'금 거래소'} />

      <View style={topQuestionStyles.container}>
        <QuestionBtn text={'금 매매가 계산 기준'} />
        <QuestionBtn text={'금의 순도의 개념과 가격 계산 기준'} />
      </View>

      <PriceInfo buyPrice={buyPrice} sellPrice={sellPrice} />

      <View style={topBarStyles.container}>
        <View style={topBarStyles.innerContainer}>
          <SmallBtn
            text={'매입'}
            selected={mode === 'buy'}
            onClick={() => handleModeChange('buy')}
          />
          <SmallBtn
            text={'매도'}
            selected={mode === 'sell'}
            onClick={() => handleModeChange('sell')}
          />
        </View>
      </View>

      <SelectionInput
        dropdownMenus={dropdownMenus}
        marginTop={screenSize.getVH(1.6)}
        onChange={(value: string) =>
          handleDataChange('goldType', value.split(' ')[0])
        }
        value={data.goldType + ' 금 1돈 (3.75g)'}
      />
      <UnitInput
        marginTop={screenSize.getVH(1.1)}
        placeholder={'수량을 입력해주세요'}
        onChange={e => handleDataChange('cnt', e.nativeEvent.text)}
        value={String(data.cnt || '')}
        unit={'개'}
      />

      {(mode === 'buy' && (
        <BottomInfo
          description={`현재 사용가능한 시드머니 ${moneyFormatter(
            displayData.userMoney,
          )}원에서`}
          mainTextPrefix="총"
          mainTextEnd="을 쓸게요"
          highlighted={`${moneyFormatter(totalBuyPrice)}원`}
        />
      )) || (
        <BottomInfo
          description={`현재 가지고 있는 해당 상품 ${ownedGoldCnt}개 중에서`}
          mainTextPrefix="총"
          mainTextEnd="를 팔게요"
          highlighted={`${itemCnt}개 (${moneyFormatter(
            totalSellPrice,
          )}원 어치)`}
        />
      )}

      <Button
        size={'large'}
        text={`${mode === 'buy' ? '매입' : '매도'}하기`}
        disable={
          (totalBuyPrice > displayData.userMoney && mode === 'buy') ||
          (itemCnt > ownedGoldCnt && mode === 'sell') ||
          !isFormFilled
        }
        marginTop={screenSize.getVH(32.5)}
        onPress={handleTradeRequest}
      />
    </BasicContainer>
  );
};

const topQuestionStyles = StyleSheet.create({
  container: {
    width: screenSize.getVW(81),
  },
});

const topBarStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(2.2),
    width: screenSize.getVW(82),
    alignItems: 'flex-start',
  },
  innerContainer: {
    flexDirection: 'row',
    width: screenSize.getVW(40),
    justifyContent: 'space-between',
  },
});

export default TradeGold;
