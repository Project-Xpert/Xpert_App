import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import Button from '../../../components/common/buttons/Button';
import BasicHeader from '../../../components/common/headers/BasicHeader';
import {View, Image, Text, StyleSheet} from 'react-native';

const AccountDetail = () => {
  return (
    <BasicContainer paddingTop={screenSize.getVH(9.3)}>
      <BasicHeader text={'통장 정보'} />

      <View style={styles.topDescription}>
        <Image
          style={styles.icon}
          src="https://www.shinhancard.com/pconts/company/images/contents/shc_symbol_ci.png"
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.header1}>신한은행 예금통장</Text>
          <Text style={styles.header2}>예금액 - 101,200원</Text>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <Text style={styles.body}>금리: 고정금리</Text>
        <Text style={styles.body}>연 이자 : 4.5%</Text>
        <Text style={styles.body}>단리/복리 종류 : 단리 예금</Text>
      </View>

      <Button
        text={'입금하기'}
        marginTop={screenSize.getVH(35.5)}
        size={'mid'}
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Button
        text={'출금하기'}
        marginTop={screenSize.getVH(1.6)}
        size={'mid'}
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Button
        text={'통장 해지'}
        marginTop={screenSize.getVH(1.6)}
        size={'mid'}
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </BasicContainer>
  );
};

const styles = StyleSheet.create({
  topDescription: {
    width: screenSize.getVW(78.5),
    height: screenSize.getVH(8.3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: screenSize.getVH(8.3),
    height: screenSize.getVH(8.3),
    borderRadius: screenSize.getVH(2.2),
  },
  headerTextContainer: {
    height: screenSize.getVH(5.7),
    justifyContent: 'space-between',
    marginLeft: screenSize.getVW(2.25),
  },
  header1: {
    fontSize: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  header2: {
    fontSize: screenSize.getVH(2),
    fontFamily: fontStyle.SUIT.SemiBold,
    color: colorStyles.basicText,
  },
  bodyContainer: {
    marginTop: screenSize.getVH(1.7),
  },
  body: {
    marginTop: screenSize.getVH(1.1),
    width: screenSize.getVW(75),
    fontSize: screenSize.getVH(1.6),
    lineHeight: screenSize.getVH(2.2),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.basicText,
  },
});

export default AccountDetail;
