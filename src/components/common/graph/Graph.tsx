import {StyleSheet, Text, View} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {screenSize} from '../../../assets/styles/screenSize';
import {LineChart} from 'react-native-gifted-charts';
import {fontStyle} from '../../../assets/styles/fontStyles';

interface data {
  xLabelValue: string;
  value: number;
}

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
  const {maxValue, minValue} = getMaxMinVaule();
  const step = Math.ceil((maxValue - minValue) / 4);

  const customYAxisLabels = Array.from(
    {length: Math.ceil((maxValue - minValue) / step) + 3},
    (_, i) => (minValue - step + i * step).toString(),
  );

  const getGraphData = (minVaule: number, stepValue: number) => {
    const data = mockGoldPriceData.data.map(v => ({
      value: v.value - minVaule + stepValue,
      xLabelValue: v.xLabelValue,
    }));

    return data;
  };

  const pointerConfig = {
    pointerStripColor: 'lightgray',
    pointerStripWidth: screenSize.getVW(0.4),
    pointerColor: 'lightgray',
    radius: screenSize.getVH(0.5),
    pointerLabelWidth: screenSize.getVW(42),
    pointerLabelHeight: screenSize.getVH(9.9),
    activatePointersOnLongPress: true,
    autoAdjustPointerLabelPosition: false,
    pointerLabelComponent: (items: data[]) => {
      const price = items[0].value + minValue - step;
      const index = mockGoldPriceData.data.findIndex(
        item => item.xLabelValue === items[0].xLabelValue,
      );

      return (
        <View
          style={{
            ...styles.graphLabel,
            marginLeft: screenSize.getVW(
              index < mockGoldPriceData.data.length / 2 ? 4.5 : -22.5,
            ),
          }}>
          <Text style={styles.basicText}>{items[0].xLabelValue}</Text>
          <Text style={styles.basicText}>{'$' + price + '.0'}</Text>
        </View>
      );
    },
  };

  return (
    <View style={styles.graphContainer}>
      <LineChart
        areaChart
        disableScroll
        pointerConfig={pointerConfig}
        data={getGraphData(minValue, step)}
        width={screenSize.getVW(70)}
        height={screenSize.getVH(20)}
        thickness={screenSize.getVH(0.2)}
        color="#FF8808"
        startFillColor="#FFC799"
        endFillColor1="#FFF7EF"
        startOpacity1={0.7}
        endOpacity={0.8}
        hideDataPoints
        rulesType="solid"
        yAxisTextStyle={{
          fontSize: screenSize.getVH(1.2),
          color: colorStyles.descriptionGray,
        }}
        yAxisColor={colorStyles.defaultWhite}
        yAxisLabelTexts={customYAxisLabels}
        xAxisColor={colorStyles.descriptionGray}
        initialSpacing={0}
        endSpacing={0}
        stepValue={step}
        maxValue={maxValue - minValue + step * 2}
        spacing={screenSize.getVW(69.5) / (mockGoldPriceData.data.length - 1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  graphContainer: {
    marginRight: screenSize.getVW(20),
    width: screenSize.getVW(83.3),
    height: screenSize.getVH(22.5),
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
