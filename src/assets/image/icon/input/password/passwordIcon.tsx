import {StyleProp, ViewStyle} from 'react-native';
import ActiveIcon from './passwordIconActive.svg';
import DisabledIcon from './passwordIconDisabled.svg';
import {screenSize} from '../../../../styles/screenSize';

interface IconProps {
  isActivated: boolean;
  style?: StyleProp<ViewStyle>;
}

const PasswordIcon = (props: IconProps) => {
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

export default PasswordIcon;
