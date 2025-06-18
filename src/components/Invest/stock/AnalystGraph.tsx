import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';

interface graphProps {
  totalCnt: number;
  value: number;
  name: string;
  isFocused: boolean;
}

const AnalystGraph = (props: graphProps) => {
  const getGraphValueStyle = {
    ...graphStyles.graphValue,
    backgroundColor: props.isFocused
      ? colorStyles.defaultRed
      : colorStyles.disableGray,
    height: screenSize.getVH((props.value / props.totalCnt) * 5.5),
  };

  return (
    <View style={graphStyles.container}>
      <Text style={graphStyles.text}>{props.value}명</Text>
      <View style={graphStyles.graphContainer}>
        <View style={getGraphValueStyle} />
      </View>
      <Text style={graphStyles.text}>{props.name}</Text>
    </View>
  );
};

const graphStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: screenSize.getVW(1),
  },
  graphContainer: {
    height: screenSize.getVH(5.5),
    width: screenSize.getVW(6),
    borderRadius: screenSize.getVH(0.5),
    backgroundColor: colorStyles.graphBackground,
    marginVertical: screenSize.getVH(0.5),
    justifyContent: 'flex-end',
  },
  graphValue: {
    width: screenSize.getVW(6),
    borderRadius: screenSize.getVH(0.5),
  },
  text: {
    width: screenSize.getVW(14),
    fontSize: screenSize.getVH(1.4),
    fontFamily: fontStyle.SUIT.SemiBold,
    textAlign: 'center',
  },
});

export default AnalystGraph;
