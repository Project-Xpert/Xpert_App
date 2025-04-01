import USA from './usa.svg';
import EU from './EU.svg';
import UK from './UK.svg';
import China from './china.svg';
import Japan from './japan.svg';
import Swiss from './swiss.svg';
import {StyleProp, ViewStyle} from 'react-native';

interface IconProps {
  country: string;
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
}

const CountryIcon = (props: IconProps) => {
  if (props.country === '미국') {
    return (
      <USA style={props.style} width={props.width} height={props.height} />
    );
  } else if (props.country === '유럽') {
    return <EU style={props.style} width={props.width} height={props.height} />;
  } else if (props.country === '영국') {
    return <UK style={props.style} width={props.width} height={props.height} />;
  } else if (props.country === '중국') {
    return (
      <China style={props.style} width={props.width} height={props.height} />
    );
  } else if (props.country === '일본') {
    return (
      <Japan style={props.style} width={props.width} height={props.height} />
    );
  } else if (props.country === '스위스') {
    return (
      <Swiss style={props.style} width={props.width} height={props.height} />
    );
  }
};

export default CountryIcon;
