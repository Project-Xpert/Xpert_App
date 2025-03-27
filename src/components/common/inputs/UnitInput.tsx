import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {colorStyles} from '../../../assets/styles/color';

interface inputProp {
  marginTop: number;
  placeholder: string;
  unit: string;
  value: string;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

const UnitInput = (props: inputProp) => {
  const containerStyle = {
    ...containerStyles.container,
    marginTop: props.marginTop,
  };

  return (
    <View style={containerStyle}>
      <TextInput
        style={inputStyles.input}
        placeholder={props.placeholder}
        onChange={props.onChange}
        keyboardType="numeric"
        value={props.value}
      />
      <View style={unitStyle.unit}>
        <Text style={unitStyle.unitText}>{props.unit}</Text>
      </View>
    </View>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

const inputStyles = StyleSheet.create({
  input: {
    width: screenSize.getVW(84),
    height: screenSize.getVH(5.5),
    fontFamily: fontStyle.SUIT.Medium,
    fontSize: screenSize.getVH(1.6),
    borderWidth: screenSize.getVH(0.075),
    borderRadius: 15,
    paddingLeft: screenSize.getVW(5.9),
  },
});

const unitStyle = StyleSheet.create({
  unit: {
    position: 'absolute',
    top: screenSize.getVH(1.9),
    right: screenSize.getVW(5.9),
  },
  unitText: {
    fontSize: screenSize.getVH(1.6),
    color: colorStyles.basicText,
    fontFamily: fontStyle.SUIT.Medium,
  },
});

export default UnitInput;
