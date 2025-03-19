import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import RightArrowBtn from '../../../assets/image/icon/button/rightArrowBtn.svg';

const StockDetailBtn = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.logo}
          src={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUSA49zzU6Xh1gUBZdrOVKb6wL0A_Y1zrlmw&s'
          }
        />
      </View>
      <View style={styles.stockInfoTextBox}>
        <Text style={styles.stockName}>월마트</Text>
        <Text style={styles.stockPrice}>1주당 500,000,000원</Text>
      </View>
      <Text style={styles.changePercent}>{'(+350%)'}</Text>
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
    width: screenSize.getVH(5),
    height: screenSize.getVH(5),
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
    width: screenSize.getVW(40),
    fontSize: screenSize.getVH(1.3),
    fontFamily: fontStyle.SUIT.SemiBold,
    color: colorStyles.descriptionGray,
  },
  changePercent: {
    marginTop: screenSize.getVH(2),
    width: screenSize.getVW(15),
    fontSize: screenSize.getVH(1.3),
    fontFamily: fontStyle.SUIT.SemiBold,
    color: colorStyles.defaultRed,
    textAlign: 'right',
  },
});

export default StockDetailBtn;
