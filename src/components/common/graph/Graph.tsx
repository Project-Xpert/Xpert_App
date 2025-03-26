import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {screenSize} from '../../../assets/styles/screenSize';
import {LineChart} from 'react-native-gifted-charts';
import {fontStyle} from '../../../assets/styles/fontStyles';
import GraphPeriodBtn from './GraphPeriodBtn';
import {useState} from 'react';
import {ChartStyle} from '../../../assets/styles/chartStyle';

interface data {
  xLabelValue: string;
  value: number;
}

interface graphProps {
  data: data[];
}

const Graph = (props: graphProps) => {
  const [period, setPeriod] = useState<1 | 6 | 12 | 36>(1);

  const onPeriodBtnPress = (newPeriod: 1 | 6 | 12 | 36) => {
    setPeriod(newPeriod);
  };

  const getMaxMinVaule = () => {
    const vaules = props.data.map(v => v.value);
    const minValue = Math.min(...vaules);
    const maxValue = Math.max(...vaules);

    return {maxValue, minValue};
  };

  const {maxValue, minValue} = getMaxMinVaule();
  const step = Math.ceil((maxValue - minValue) / 4);

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
          props.data.slice(0, period * 30).reverse(),
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  graphContainer: {
    width: screenSize.getVW(83.3),
    height: screenSize.getVH(27.5),
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
