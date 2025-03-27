import {StyleSheet, Text, View} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {colorStyles} from '../../../assets/styles/color';

interface InfoProps {
  description: string;
  mainTextPrefix: string;
  highlighted: string;
  mainTextEnd: string;
}

const BottomInfo = (props: InfoProps) => {
  return (
    <View style={bottomDescriptionStyles.container}>
      <Text style={bottomDescriptionStyles.descriptionText}>
        {props.description}
      </Text>
      <Text style={bottomDescriptionStyles.mainText}>
        {props.mainTextPrefix}{' '}
        <Text style={highlightedStyles.text}>{props.highlighted} </Text>
        {props.mainTextEnd}
      </Text>
    </View>
  );
};

const bottomDescriptionStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(1.1),
    width: screenSize.getVW(81),
  },
  descriptionText: {
    color: colorStyles.descriptionGray,
    fontSize: screenSize.getVH(1.6),
  },
  mainText: {
    color: colorStyles.basicText,
    fontSize: screenSize.getVH(1.6),
  },
});

const highlightedStyles = StyleSheet.create({
  text: {
    color: colorStyles.mainColor,
  },
});

export default BottomInfo;
