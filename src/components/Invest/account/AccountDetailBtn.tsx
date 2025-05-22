import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import RightArrowBtn from '../../../assets/image/icon/button/rightArrowBtn.svg';
import BankLogo from '../../../assets/image/icon/bankLogo/BankLogo';

interface BtnProps {
  name: string;
  companyName: string;
  subDescription: string;
  onPress: () => void;
}

const AccountDetailBtn = (props: BtnProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.imgContainer}>
        <BankLogo
          bank={props.companyName}
          style={styles.logo}
          width={screenSize.getVH(5)}
          height={screenSize.getVH(5)}
        />
      </View>
      <View style={styles.stockInfoTextBox}>
        <Text style={styles.stockName} ellipsizeMode="tail" numberOfLines={1}>
          {props.name.replace('주식회사', '').trim()}
        </Text>
        <Text style={styles.stockPrice}>
          {props.subDescription.replace('주식회사', '').trim()}
        </Text>
      </View>

      <RightArrowBtn
        style={{
          position: 'absolute',
          right: 20,
        }}
        width={screenSize.getVW(2.85)}
        height={screenSize.getVH(2.6)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(1.1),
    width: screenSize.getVW(82),
    height: screenSize.getVH(8.3),
    borderRadius: screenSize.getVH(1.7),
    backgroundColor: colorStyles.lightGrayBackGround,
    paddingHorizontal: screenSize.getVW(3.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgContainer: {
    borderRadius: screenSize.getVH(2.2),
    backgroundColor: colorStyles.defaultWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: screenSize.getVH(3.3),
    height: screenSize.getVH(3.3),
    borderRadius: 100,
  },
  stockInfoTextBox: {
    marginLeft: screenSize.getVW(3),
    height: screenSize.getVH(4.1),
    justifyContent: 'space-between',
  },
  stockName: {
    width: screenSize.getVW(40),
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.SemiBold,
    color: colorStyles.basicText,
  },
  stockPrice: {
    width: screenSize.getVW(45),
    fontSize: screenSize.getVH(1.3),
    fontFamily: fontStyle.SUIT.SemiBold,
    color: colorStyles.descriptionGray,
  },
});

export default AccountDetailBtn;
