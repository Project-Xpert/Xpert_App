import {Text} from 'react-native';
import {fontStyle} from '../../assets/styles/fontStyles';

interface BasicTextProps {
  text: string;
  size: number;
  color: string;
  weight:
    | 'Bold'
    | 'ExtraBold'
    | 'ExtraLight'
    | 'Heavy'
    | 'Light'
    | 'Medium'
    | 'Regular'
    | 'SemiBold'
    | 'Thin';
}

const BasicText = (props: BasicTextProps) => {
  const getStyle = () => {
    return {
      color: props.color,
      fontFamily: fontStyle.SUIT[props.weight],
      fontSize: props.size,
    };
  };

  return <Text style={getStyle()}>{props.text}</Text>;
};

export default BasicText;
