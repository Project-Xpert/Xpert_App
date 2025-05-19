import WooriBank from './WooriBank.svg';
import SCBank from './SCBank.svg';
import IMBank from './ImBank.svg';
import BNK from './BNK.svg';
import JejuBank from './JejuBank.svg';
import IBKBank from './IBKBank.svg';
import KDBBank from './KDBBank.svg';
import KookminBank from './KookminBank.svg';
import ShinhanBank from './ShinhanBank.svg';
import NHBank from './NHBank.svg';
import HanaBank from './HanaBank.svg';
import KBank from './KBank.svg';
import SHBank from './SHBank.svg';
import KakaoBank from './KakaoBank.svg';
import TossBank from './TossBank.svg';
import JB from './JB.svg';
import AcuonBank from './AcuonBank.svg';
import OSBBank from './OSBBank.svg';
import DBBank from './DBBank.svg';
import SkyBank from './SkyBank.svg';
import MinkukBank from './MinkukBank.svg';
import PRBank from './PRBank.svg';
import HBBank from './HBBank.svg';
import KioomYesBank from './KiwoomYesBank.svg';
import TheKBank from './TheKBank.svg';
import CHOBank from './CHOBank.svg';
import SBIBank from './SBIBank.svg';
import BAROBank from './BAROBank.svg';
import DAOLBank from './DAOLBank.svg';
import GoryoBank from './GoryoBank.svg';
import MyAssetBank from './MyAssetBank.svg';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {screenSize} from '../../../styles/screenSize';

interface IconProps {
  bank: string;
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
}

const bankComponentMap: Record<string, React.FC<any>> = {
  우리은행: WooriBank,
  SC제일은행: SCBank,
  아이엠뱅크: IMBank,
  부산은행: BNK,
  경남은행: BNK,
  광주은행: JB,
  전북은행: JB,
  제주은행: JejuBank,
  중소기업은행: IBKBank,
  한국산업은행: KDBBank,
  국민은행: KookminBank,
  신한은행: ShinhanBank,
  농협은행주식회사: NHBank,
  하나은행: HanaBank,
  '주식회사 케이뱅크': KBank,
  수협은행: SHBank,
  '주식회사 카카오뱅크': KakaoBank,
  '토스뱅크 주식회사': TossBank,
  애큐온저축은행: AcuonBank,
  OSB저축은행: OSBBank,
  디비저축은행: DBBank,
  스카이저축은행: SkyBank,
  민국저축은행: MinkukBank,
  푸른저축은행: PRBank,
  HB저축은행: HBBank,
  키움예스저축은행: KioomYesBank,
  더케이저축은행: TheKBank,
  조은저축은행: CHOBank,
  SBI저축은행: SBIBank,
  바로저축은행: BAROBank,
  다올저축은행: DAOLBank,
  유안타저축은행: MyAssetBank,
  고려저축은행: GoryoBank,
};

const BankLogo = ({bank, style, width, height}: IconProps) => {
  const BankComponent = bankComponentMap[bank];

  if (!BankComponent) return null;
  return (
    <View style={{width, height, ...containerStyle.container}}>
      <BankComponent style={style} width={width} height={height} />
    </View>
  );
};

const containerStyle = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: screenSize.getVH(2.2),
  },
});

export default BankLogo;
