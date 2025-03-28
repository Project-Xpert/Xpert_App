import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {screenSize} from '../../../assets/styles/screenSize';
import {LineChart} from 'react-native-gifted-charts';
import {fontStyle} from '../../../assets/styles/fontStyles';
import GraphPeriodBtn from './GraphPeriodBtn';
import {useEffect, useState} from 'react';
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
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<data[]>(props.data);
  const [displayData, setDisplayData] = useState<data[]>(props.data);
  const onPeriodBtnPress = (newPeriod: 1 | 6 | 12 | 36) => {
    setPeriod(newPeriod);
  };

  const calculateStartDate = () => {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() - (period % 12));
    targetDate.setFullYear(targetDate.getFullYear() - Math.floor(period / 12));
    return [
      targetDate.getFullYear(),
      targetDate.getMonth() + 1,
      targetDate.getDate(),
    ];
  };

  const isDatumDateIsBigger = (date: string) => {
    const targetDate = calculateStartDate();
    const datumDate = date.split(' ').map(element => {
      return parseInt(element);
    });

    const yearIsBigger = targetDate[0] < datumDate[0];
    const monthIsBigger =
      targetDate[0] == datumDate[0] && targetDate[1] < datumDate[1];
    const dateIsBigger =
      targetDate[0] == datumDate[0] &&
      targetDate[1] == datumDate[1] &&
      targetDate[2] <= datumDate[2];

    return yearIsBigger || monthIsBigger || dateIsBigger;
  };

  const getMaxMinValue = (data: data[]) => {
    if (data.length <= 0) {
      return {maxValue: 0, minValue: 0};
    }

    const values = data.map(v => v.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    return {maxValue, minValue};
  };

  useEffect(() => {
    if (JSON.stringify(data) != JSON.stringify(props.data)) {
      setData(props.data);
    }
  }, [props.data]);

  useEffect(() => {
    const newDisplayData = data
      .filter(datum => isDatumDateIsBigger(datum.xLabelValue))
      .reverse();

    setDisplayData(newDisplayData);

    const {maxValue, minValue} = getMaxMinValue(newDisplayData);
    setMaxValue(maxValue);
    setMinValue(minValue);
    setStep(Math.ceil((maxValue - minValue) / 4));
  }, [data, period]);

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
          displayData,
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
