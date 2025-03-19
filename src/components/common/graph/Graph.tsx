import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {screenSize} from '../../../assets/styles/screenSize';
import {LineChart} from 'react-native-gifted-charts';
import {fontStyle} from '../../../assets/styles/fontStyles';
import GraphPeriodBtn from './GraphPeriodBtn';
import {useState} from 'react';
import {ChartStyle} from '../../../assets/styles/chartStyle';

const mockGoldPriceData = {
  data: [
    {value: 1000, xLabelValue: '2023.01'},
    {value: 1200, xLabelValue: '2023.02'},
    {value: 1210, xLabelValue: '2023.03'},
    {value: 1320, xLabelValue: '2023.04'},
    {value: 1310, xLabelValue: '2023.05'},
    {value: 1200, xLabelValue: '2023.06'},
    {value: 1210, xLabelValue: '2023.07'},
    {value: 1210, xLabelValue: '2023.08'},
    {value: 1320, xLabelValue: '2023.09'},
    {value: 1310, xLabelValue: '2023.10'},
    {value: 1200, xLabelValue: '2023.11'},
    {value: 1210, xLabelValue: '2023.12'},
    {value: 3200, xLabelValue: '2024.01'},
    {value: 3100, xLabelValue: '2024.02'},
    {value: 1210, xLabelValue: '2024.03'},
    {value: 1320, xLabelValue: '2024.04'},
    {value: 1310, xLabelValue: '2024.05'},
    {value: 1200, xLabelValue: '2024.06'},
    {value: 1210, xLabelValue: '2024.07'},
    {value: 1210, xLabelValue: '2024.08'},
    {value: 1320, xLabelValue: '2024.09'},
    {value: 1310, xLabelValue: '2024.10'},
    {value: 1200, xLabelValue: '2024.11'},
    {value: 2000, xLabelValue: '2024.12'},
    {value: 3000, xLabelValue: '2025.01'},
    {value: 1000, xLabelValue: '2025.02'},
  ],
};

const getMaxMinVaule = () => {
  const vaules = mockGoldPriceData.data.map(v => v.value);
  const minValue = Math.min(...vaules);
  const maxValue = Math.max(...vaules);

  return {maxValue, minValue};
};

const Graph = () => {
  const [period, setPeriod] = useState<1 | 6 | 12 | 36>(1);
  const {maxValue, minValue} = getMaxMinVaule();
  const step = Math.ceil((maxValue - minValue) / 4);

  const onPeriodBtnPress = (newPeriod: 1 | 6 | 12 | 36) => {
    setPeriod(newPeriod);
  };

  return (
    <View style={styles.graphContainer}>
      <View style={styles.graphBtnContainer}>
        <GraphPeriodBtn
          disable={period !== 36}
          period={'3년'}
          onPress={() => onPeriodBtnPress(36)}
        />
        <GraphPeriodBtn
          disable={period !== 12}
          period={'1년'}
          onPress={() => onPeriodBtnPress(12)}
        />
        <GraphPeriodBtn
          disable={period !== 6}
          period={'6개월'}
          onPress={() => onPeriodBtnPress(6)}
        />
        <GraphPeriodBtn
          disable={period !== 1}
          period={'1개월'}
          onPress={() => onPeriodBtnPress(1)}
        />
      </View>
      <LineChart
        {...ChartStyle.getLinChartConfigAndStyle(
          maxValue,
          minValue,
          step,
          mockGoldPriceData.data,
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  graphContainer: {
    width: screenSize.getVW(83.3),
  },
  graphBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: screenSize.getVW(3),
    width: screenSize.getVW(83.3),
    marginBottom: screenSize.getVH(1.5),
  },
  graphLabel: {
    height: screenSize.getVH(5.5),
    width: screenSize.getVW(23.8),
    justifyContent: 'center',
    marginTop: screenSize.getVH(13.3),
    paddingHorizontal: screenSize.getVW(3.3),
    borderRadius: screenSize.getVH(1.6),
    borderWidth: screenSize.getVH(0.1),
    backgroundColor: colorStyles.defaultWhite,
    borderColor: colorStyles.defaultBlack,
  },
  basicText: {
    color: colorStyles.basicText,
    fontFamily: fontStyle.SUIT.Medium,
    fontSize: screenSize.getVH(1.3),
  },
});

export default Graph;
