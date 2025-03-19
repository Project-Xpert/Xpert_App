import {StyleSheet, Text, View} from 'react-native';
import {colorStyles} from './color';
import {screenSize} from './screenSize';
import {fontStyle} from './fontStyles';

interface data {
  xLabelValue: string;
  value: number;
}

const getLinChartConfigAndStyle = (
  maxValue: number,
  minValue: number,
  step: number,
  data: data[],
) => {
  const customYAxisLabels = Array.from(
    {length: Math.ceil((maxValue - minValue) / step) + 3},
    (_, i) => (minValue - step + i * step).toString(),
  );

  const getGraphData = (minVaule: number, stepValue: number) => {
    const result = data.map(v => ({
      value: v.value - minVaule + stepValue,
      xLabelValue: v.xLabelValue,
    }));

    return result;
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
      const index = data.findIndex(
        item => item.xLabelValue === items[0].xLabelValue,
      );

      return (
        <View
          style={{
            ...styles.graphLabel,
            marginLeft: screenSize.getVW(index < data.length / 2 ? 4.5 : -22.5),
          }}>
          <Text style={styles.basicText}>{items[0].xLabelValue}</Text>
          <Text style={styles.basicText}>{'$' + price + '.0'}</Text>
        </View>
      );
    },
  };

  const chartConfig = {
    areaChart: true,
    disableScroll: true,
    pointerConfig: pointerConfig,
    data: getGraphData(minValue, step),
    width: screenSize.getVW(70),
    height: screenSize.getVH(20),
    thickness: screenSize.getVH(0.2),
    color: '#FF8808',
    startFillColor: '#FFC799',
    endFillColor1: '#FFF7EF',
    startOpacity1: 0.7,
    endOpacity: 0.8,
    hideDataPoints: true,
    rulesType: 'solid',
    yAxisTextStyle: {
      fontSize: screenSize.getVH(1.2),
      color: colorStyles.descriptionGray,
    },
    yAxisColor: colorStyles.defaultWhite,
    yAxisLabelTexts: customYAxisLabels,
    xAxisColor: colorStyles.descriptionGray,
    initialSpacing: 0,
    endSpacing: 0,
    stepValue: step,
    maxValue: maxValue - minValue + step * 2,
    spacing: screenSize.getVW(69.5) / (data.length - 1),
  };

  return chartConfig;
};

export const ChartStyle = {getLinChartConfigAndStyle};

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
