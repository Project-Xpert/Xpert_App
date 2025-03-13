import {StyleProp, ViewStyle} from 'react-native';
import ActiveIcon from './loginIdActive.svg';
import DisabledIcon from './loginIdDisabled.svg';
import {screenSize} from '../../../../styles/screenSize';

interface IconProps {
  isActivated: boolean;
  style?: StyleProp<ViewStyle>;
}

const LoginIdIcon = (props: IconProps) => {
  return props.isActivated ? (
    <ActiveIcon
      width={screenSize.getVW(5.7)}
      height={screenSize.getVH(2.6)}
      style={props.style}
    />
  ) : (
    <DisabledIcon
      width={screenSize.getVW(5.7)}
      height={screenSize.getVH(2.6)}
      style={props.style}
    />
  );
};

export default LoginIdIcon;
